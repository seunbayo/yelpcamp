var mongoose = require('mongoose');
var Schema = mongoose.schema;
//to connect mongoose to a database
mongoose.connect('mongodb://localhost/dogApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//creating a schema
var dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//creating a model
var Dog = mongoose.model("Dog", dogSchema);
//ading a new dog to the database
var george = new Dog({
    name: "jack",
    age: 5,
    temperament: "Maluu"
});

george.save(function(err, cat){
    if(err){
        console.log('something went wrong');
    } else {
        console.log('we just save a dog to the db');
        console.log('dog');
    }
});

// retrieve all cats from the database and console.log each