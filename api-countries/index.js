const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())

const arrayOfCountries = ['USA', 'Morocco', 'Argentina', 'Mali', 'Ukraine'];

app.get('/countries', (req, res) => res.send(arrayOfCountries))

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))