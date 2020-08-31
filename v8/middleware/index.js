var Campground = require("../models/campground");
var Comment =require("../models/comment");
//all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        
        Campground.findById(req.params.id, function(err, campground){
            
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                //does user own campground
                if(campground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "you dont have permission to do that")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        
        Comment.findById(req.params.comment_id, function(err, foundComment){
            
            if(err){
                res.redirect("back");
            }else{
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "Its not your comment");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "Please log in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;
