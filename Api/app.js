var express = require("express");
var app = express();
var request = require("request");

app.get("/results", function(request, response){
    request("https://pokeapi.co/api/v2/pokemon", function(error, response, body){
        if(!error && response.statusCode == 200){
            res.send(body);
        }

    });
});






app.listen(3000, function() {
    console.log("pokemon Api server is running");
});
