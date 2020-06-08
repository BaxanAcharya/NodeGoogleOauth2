const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/user");
require("./services/passport");

mongoose
  .connect(keys.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log("Successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(
  cookieSession({
    //30 days valid
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App is running at 5000 port");
});
