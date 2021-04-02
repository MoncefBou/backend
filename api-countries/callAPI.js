var request = require('request');

request.get('http://localhost:8000/countries', function (err, res, body) {
    var countriesArray = JSON.parse(body);
   
    countriesArray.reverse();

    console.log(countriesArray);
});