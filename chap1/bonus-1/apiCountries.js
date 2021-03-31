// IL MANQUE L'ARRAY arrayOfCountries AVEC LES INFOS. SUPP CAR TROP LOURD.

  var express = require('express');
  var app = express();

  app.get('/countries/all', function (req, res) {
      res.json(arrayOfCountries);
  })

  app.get('/countries/name', function (req, res) { 
    var countriesNames = arrayOfCountries.map(function(element) {
        return element.name;
    })

    res.json(countriesNames.join(" - "));
  })

 
// RUN SERVER 
var port = 8001;
app.listen(port, function () {
    console.log('Server is', port);
})