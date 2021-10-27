const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
// const DiscordUser = require('../models/discordUser');
const { discordModel } = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.discordId);
});

passport.deserializeUser(async (id, done) => {
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
    try {
        const user = await discordModel.findOne({ discordId: profile.id });
        if (user) {
            done(null, user);
        }
        else {
            const newUser = await discordModel.create({
                discordId: profile.id,
                username: profile.username,
                email: profile.email,
                avatar: profile.avatar
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    }
    catch (err) {
        console.log(err);
        done(err, null);
    }
}));