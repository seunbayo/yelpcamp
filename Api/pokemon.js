var request = require('request');

function all(successHandler, errorHandler) {
  request('https://pokeapi.co/api/v2/pokemon', function(error, response, body){
    if(error){
      errorHandler(error);
    } else {
      if (response.statusCode == 200) {
        let data = JSON.parse(body);
        successHandler(response, data);
      }
    }
  });
}

function find(pokemon_name, successHandler, errorHandler) {
  request('https://pokeapi.co/api/v2/pokemon/' + pokemon_name, function(error, response, body){
    if(error){
      errorHandler(error);
    } else {
      if (response.statusCode == 200) {
        let data = JSON.parse(body);
        successHandler(response, data);
      }
    }
  });
}

exports.all = all;
exports.find = find;

if (require.main === module) {
  let onSuccess = (_response, data) => {
    let output = JSON.stringify(data, null, 2);
    console.log(output);
  };
  let onError = error => {
    console.error('Something went wrong');
    console.error(error);
  }
  // all(onSuccess, onError);
  find('bulbasaur', onSuccess, onError)
}

