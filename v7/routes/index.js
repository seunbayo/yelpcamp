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
    res.render("register");
  });

  //Handle signup Logic
  router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/campgrounds");
      });
    });
  });
  
  //Show Login form
  router.get("/login", function (req, res) {
    res.render("login");
  });
  //Login logic
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
    res.redirect("/campgrounds");
  });
  
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  
  /* function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
          res.redirect("back");
        } else {
          //does the user own the campground?
          console.log(foundCampground.author.id)
          console.log(req.user.id);
          
          if (foundCampground.author.id(req.user._id)) {
            next();
          } else {
            res.redirect("back");
          }
        }
      });
    } else {
      res.redirect("back");
    }
  } */


  module.exports = router;