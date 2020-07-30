var request = require('request');

function all(successHandler, errorHandler) {
  request('https://pokeapi.co/api/v2/pokemon', function(error, response, body){
    if(error){
      errorHandler(error);
    } else {
      if (response.statusCode == 200) {
        successHandler(response, body);
      }
    }
  });
}

exports.all = all;

if (require.main === module) {
  let onSuccess = (_response, body) => console.log(body);
  let onError = error => {
    console.error('Something went wrong');
    console.error(error);
  }
  all(onSuccess, onError);
}
