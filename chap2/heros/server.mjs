import express from 'express';
const app = express();
import cors from 'cors';

app.use(express.json())
app.use(cors())

const debug = (req, res, next) => {
    console.log("Server request")
    next()
}

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))

// --experimental-json-modules