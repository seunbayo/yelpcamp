var mongoose = require("mongoose");


//setting up schema
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
