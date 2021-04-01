var request = require('request');

request.get('http://localhost:8000/countries', function (err, res, body) {
    var countriesArray = JSON.parse(body);
    var reverseArray = [];
    for ( i = 0; i < countriesArray.length; i++) {
        reverseArray.unshift(countriesArray[i]);
    }

    console.log(reverseArray);
})