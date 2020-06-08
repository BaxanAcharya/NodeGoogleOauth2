const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

//mongo db id not google id
//convert id into token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//convert token to user
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

//configuration for passport
passport.use(
  new googleStrategy(
    {
      //id, secret and callback url
      clientID: keys.googleCilentId,
      clientSecret: keys.googleCilentSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    //thingsthat we need
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser);
    }
  )
);
