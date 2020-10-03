
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//SCHEMA
var CampgroundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be added"],
        unique: true,
        min: 8
    },
    price: {
        type: String,
        required: [true, "Please add a price"],
        unique: true,
    },
    image: {
        type: String,
        required: [true, "please include image link"]
    },
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }, 
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", CampgroundSchema);

