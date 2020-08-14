var mongoose = require("mongoose");
var Campground = require("./models/campground");
var comment    = require("./models/comment");

var data = [
  {
    name: "Olive mountain ",
    image:
      "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "hulabalolsoskdcdinficsedsdf",
  },
  {
    name: "Oliverr superb",
    image:
      "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "hulabalolsoskdcdinficsedsdf",
  },
  {
    name: "Obudu resortee",
    image:
      "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "hulabalolsoskdcdinficsedsdf",
  },
];

function seedDB() {
  //remove campground
  Campground.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campground");
    //add a few campgrounds
    data.forEach(function (seed) {
        Campground.create(seed, function (err, campground) {
            if (err) {
                console.log(err);
            }  else {
                console.log("added a campground");
                //create a comment
                comment.create(
                {
                    text: "This is a fantastic place to be",
                    author: "Homeboy"
                },  function(err, comment){
                        if(err){
                            console.log(err);
                        }   else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('created new comment ');
                        }
                })  }
            });
        });
    })
}

module.exports = seedDB;
