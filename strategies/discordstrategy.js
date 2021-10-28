const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
// const DiscordUser = require('../models/discordUser');
const { discordModel } = require('../models/user');

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.discordId);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    const user = await discordModel.findOne({ discordId: id })
    if (user)
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    console.log("use Discord");
    try {
        const user = await discordModel.findOne({ discordId: profile.id });
        console.log(user);
        
        if (user) {
            done(null, user);
        }
        else {
            console.log("création user");
            const newUser = await discordModel.create({
                discordId: profile.id,
                username: profile.username,
                email: profile.email,
                avatar: profile.avatar
            });
            console.log(newUser);
            const savedUser = await newUser.save();
            done(null, savedUser);

            // const newUser = new discordModel({
            //     discordId: profile.id,
            //     username: profile.username,
            //     email: profile.email,
            //     avatar: profile.avatar
            // });
            // console.log(newUser);
            // newUser.save()
            //     .then(() => res.status(201).json({ message: 'create user' }))
            //     .catch(error => console.log(error))
            // const savedUser = await newUser.save();
            // done(null, savedUser);
        }
    }
    catch (err) {
        console.log(err);
        done(err, null);
    }
}));