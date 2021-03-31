var request = require('request');

request.get("http://localhost:8001/countries/name", function (err, res, body) {
    console.log(body);
})