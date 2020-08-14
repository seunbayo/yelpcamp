var express = require("express");
var app = express();
// import body parser
var bodyParser = require("body-parser"); 
    // adding mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost/yelp_camp",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//setting up schema
var campgroundSchema = new mongoose.Schema({
    name:String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Solomon creek",
        image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log('newly created campground: ');
            console.log(campground);
        }
    });

var campgrounds = [
    {name: "Solomon greek", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Abuja Connect", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Abuja Connect", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Abuja Connect", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Abuja Connect", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Abuja Connect", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Abuja Connect", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    
    
]
app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds:campgrounds});
});
    

app.post("/campgrounds", function(req, res){
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image:image}
    campgrounds.push(newCampground); 
    // redirect back to campground page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(3000, function() {
    console.log("Yelp camp server");
});
