const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const { userModel } = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.discordId);
});

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ discordId: id })
    if (user) done(null, user);
});

var discordStrat = new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    console.log("use Discord");
    console.log("profile : ", profile);

    try {
        let user = await userModel.findOne({ discordId: profile.id });
        if (user) {
            const update = { avatar: profile.avatar };
            const newUser = await userModel.findOneAndUpdate({ discordId: profile.id }, update);
            done(null, newUser);
        } else {
            const newUser = await userModel.create({
                discordId: profile.id,
                username: profile.username,
                email: profile.email,
                avatar: profile.avatar
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null);
    }
});

passport.use(discordStrat);