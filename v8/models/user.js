var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    min: 5
  },
  email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      minlength: [10, "Email can't be shorter than 10 characters"],
      maxlength: [50, "Email can't be longer than 50 characters"],
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
