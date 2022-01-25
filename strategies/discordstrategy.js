const DiscordStrategy = require('passport-discord').Strategy;
const refresh = require('passport-oauth2-refresh');

const passport = require('passport');
// const DiscordUser = require('../models/discordUser');
const { discordModel } = require('../models/user.model');

let profileDiscord = {
    refreshToken: "",
    accessToken: "",
};

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.discordId);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    const user = await discordModel.findOne({ discordId: id })
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

    profileDiscord.refreshToken = refreshToken;
    profileDiscord.accessToken = accessToken;
    try {
        const user = await discordModel.findOne({ discordId: profile.id });
        if (user) {
            // console.log("DEJA LA");
            done(null, user);
        } else {
            // console.log("création user");
            const newUser = await discordModel.create({
                discordId: profile.id,
                username: profile.username,
                email: profile.email,
                avatar: profile.avatar
            });
            // console.log(newUser);
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
    profileDiscord.refreshToken,
    function (err, accessToken, refreshToken) {
        if (!err) {
            console.log("ON REFRESH");
            console.log("new refreshToken : ", refreshToken);
            console.log("new accessToken : ", accessToken);
            profileDiscord.refreshToken = refreshToken;
            profileDiscord.accessToken = accessToken;
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
