var express = require("express");
var app = express();
// import body parser
var bodyParser = require("body-parser");
// adding mongoose
var mongoose = require("mongoose");
// var Schema = mongoose.Schema
var Campground = require("./models/campground");
var  seedDB = require("./seeds");
var  Comment = require("./models/comment");

seedDB();
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", function (req, res) {
  res.render("landing");
});

//INDEX - show all campgrounds
// app.get("/campgrounds", function(req, res){
//     res.render("campgrounds",{campgrounds:campgrounds});
// });

app.get("/campgrounds", function (req, res) {
  //get all campground from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function (req, res) {
  // get data from form and add to array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
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
app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});

//SHow - show more info about one campground
app.get("/campgrounds/:id", function (req, res) {
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

//======================
//COMMENTS ROUTE
//======================

app.get("/campgrounds/:id/comments/new", function(req, res){
  //find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log('err');
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res){
  //Lookup campround using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
       //CREATE NEW COMMENT
      Comment.create(req.body.comment, function(err, comment){
        if (err){
          console.log('');
        } else {
          campground.comments.push(comment);
          campground.save();
          //REDIRECT TO SHOW PAGE
          res.redirect('/campgrounds/' + campground._id)
        }
      })
      
    }
  })
})


app.listen(4000, function () {
  console.log("Yelp camp server");
});