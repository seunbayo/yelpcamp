var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//AUTH ROUTES
router.get("/", function (req, res) {
  res.render("landing");
});

//Show register form
router.get("/register", function (req, res) {
    res.render("register", {user: new User(), errors: {} });
  })

//Handle signup Logic
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, newUser) {
    if (err) {
      let errors = err.errors || {};
      if (err.name === "UserExistsError"){
        errors.username = {message: "This username is already registered" };
      }
      return res.render("register", {user: newUser, errors});
    }
    
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to CampHouse");

      res.redirect("/campgrounds");
    });
  });
});

//Show Login form
router.get("/login", function (req, res) {
  res.render("login");
});

//Handling Login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//LogOut route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

//MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login first");
  res.redirect("/login");
}

module.exports = router;
