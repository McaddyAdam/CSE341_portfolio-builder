const passport = require("passport");

const route = require("express").Router();

route.get("/google", passport.authenticate("google", { scope: ["profile"] }));
route.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/account-google");
});
route.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = route;
