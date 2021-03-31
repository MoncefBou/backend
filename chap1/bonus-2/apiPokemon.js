// IL MANQUE L'ARRAY pokemon AVEC LES INFOS. SUPP CAR TROP LOURD.

var express = require('express');
var app = express();

app.get('/pokemon/id/:id', function (req, res) {
    var idChoose = req.params.id;

    var pokemonChoose = pokemon.filter(function (num) {
        return num.id == idChoose;
    })

    res.json({'id': pokemonChoose[0].id ,'name': pokemonChoose[0].name});
})

// RUN SERVER 
var port = 8002;
app.listen(port, function () {
    console.log('Server is', port);
})