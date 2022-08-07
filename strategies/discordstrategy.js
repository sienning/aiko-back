const DiscordStrategy = require('passport-discord').Strategy;
const refresh = require('passport-oauth2-refresh');
const passport = require('passport');
const { userModel } = require('../models/user.model');

global.profileDiscord = {
    refreshToken: "",
    accessToken: "",
};

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.discordId);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
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

    global.profileDiscord.refreshToken = refreshToken;
    global.profileDiscord.accessToken = accessToken;
    try {
        console.log(profile.id);
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
    }
    catch (err) {
        console.log(err);
        done(err, null);
    }
});
refresh.requestNewAccessToken(
    'discord',
    global.profileDiscord.refreshToken,
    function (err, accessToken, refreshToken) {
        if (!err) {
            console.log("ON REFRESH");
            console.log("new refreshToken : ", refreshToken);
            console.log("new accessToken : ", accessToken);
            global.profileDiscord.refreshToken = refreshToken;
            global.profileDiscord.accessToken = accessToken;
        }
        // You have a new access token, store it in the user object,
        // or use it to make a new request.
        // `refreshToken` may or may not exist, depending on the strategy you are using.
        // You probably don't need it anyway, as according to the OAuth 2.0 spec,
        // it should be the same as the initial refresh token.
    },
);

passport.use(discordStrat);
refresh.use(discordStrat);
