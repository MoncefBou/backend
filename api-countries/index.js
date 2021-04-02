var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

var arrayOfCountries = ['France', 'Spain', 'Argentina', 'Senegal', 'Tunisia'];

app.get('/countries', function (req, res) {
    res.send(arrayOfCountries);
})

// SERVER
var port = 8000;
app.listen(port, function () {
    console.log('Server', port);
})