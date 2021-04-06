const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())

const arrayOfCountries = ['France', 'Spain', 'Argentina', 'Senegal', 'Tunisia'];

app.get('/countries', (req, res) => res.send(arrayOfCountries))

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))