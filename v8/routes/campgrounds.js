var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
var Comment = require("../models/comment")

//INDEX - show all campgrounds

  router.get("/", function (req, res) {
    //get all campground from DB
    Campground.find({}, function (err, allCampgrounds) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/index", { campgrounds: allCampgrounds });
      }
    });
  });

  //CREATE NEW CAMPGROUND TO DB
  
  router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    //SAVE DATA INTO NEW CAMPGROUND
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampground = { name: name, image: image, description: desc, author:author };
    //create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        //redirect back to campground page
        res.redirect("/campgrounds");
      }
    });
  });
  
  //NEW - show form to create a new campground
  router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
  });
  
  //SHow - show more info about one campground
  router.get("/:id", function (req, res) {
    //find the campground with the provided ID
    Campground.findById(req.params.id)
      .populate("comments")
      .exec(function (err, foundCampground) {
        if (err) {
          console.log(err);
        } else {
          //render show template with that campground
          res.render("campgrounds/show", { campground: foundCampground });
        }
      });
  });
  
  //==================================
  //EDIT CAMPGROUND ROUTE
  
  router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      res.render("campgrounds/edit", { campground: foundCampground });
    });
  });
  //UPDATE CAMPGROUND ROUTE
  router.put("/:id", function (req, res) {
    //find and update the correct campground
    console.log(req.params, req.body);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
      err,
      updatedCAmpground
    ) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  });
  
  //===============================
  //DESTROY CAMPGROUND ROUTE
  router.delete("/:id", middleware.isLoggedIn, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds");
      }
    });
  });

  
  module.exports = router;