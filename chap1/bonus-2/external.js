var request = require('request');

request.get("http://localhost:8002/pokemon/id/1", function (err, res, body) {
    var json = JSON.parse(body)

    console.log('id:', json.id);
    console.log('name:', json.name);
})