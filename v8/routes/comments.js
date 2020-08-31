var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//=========================
//COMMENTS ROUTE

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function (
  req,
  res
) {
  //find campground by id
  console.log('cmpground id', req.params.id);

  Campground.findById(req.params.id).exec(function(err, foundCampground) {
    if (err) {
      console.log("err");
    } else {
      
      console.log("looking for what campground is", foundCampground);
      
      res.render("comments/new", { campground: foundCampground });
    }
  });
});


//Comments Create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function (
  req,
  res
) {
  //Lookup campround using ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      req.flash("error", "something went wrong");
      res.redirect("/campgrounds");
    } else {
      //CREATE NEW COMMENT
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("sucess", "successfully created comment");
          //REDIRECT TO SHOW PAGE
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//EDIT COMMENT  ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      }else{
          res.render("comments/edit",{campground_id: req.params._id, foundComment});
      }
  });
});




router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      }else{
          res.redirect("/campgrounds/" + req.params.id);
      }
  });
});



//DESTROY COMMENTS ROUTE
router.delete(
  "/campgrounds/:id/comments/:comment_id",
  middleware.checkCommentOwnership,
  function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
      if (err) {
        res.redirect("back");
      } else {
        req.flash("success", "Comment Deleted");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  }
);

module.exports = router;
