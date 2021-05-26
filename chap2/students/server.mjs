import express from 'express';
const app = express();
import cors from 'cors';

app.use(express.json())
app.use(cors())


const students = [{id:1, name: "Moncef"}, {id:2, name: "Moncef2"}];

app.get("/students", (req, res) => {
    res.json(students)
})

app.post("/students", (req,res) => {
    const newStudents = req.body

    students.push(newStudents)

    res.json(students)
})

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))

// --experimental-json-modules