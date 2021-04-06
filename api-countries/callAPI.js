const request = require('request');

request.get('http://localhost:8000/countries', (err, res, body) => {
    const countriesArray = JSON.parse(body);
   
    countriesArray.reverse();

    console.log(countriesArray);
});