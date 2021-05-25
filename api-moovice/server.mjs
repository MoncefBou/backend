import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors())
import axios from 'axios';
import moment from 'moment';



app.get("/popularmovies",(req, res) => {
    
     axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bf01af8f5d704591a09edcc0c2f5e084")
    .then(response => {
         res.send(response.data)
    })
    .catch(error => {
        console.log("error", error)
    })
})

app.get("/latestmovies",(req, res) => {
    let TODAY = moment().format("YYYY-MM-DD");
    let LAST_WEEK = moment().subtract(7, 'days').format("YYYY-MM-DD");
    
    axios.get(`http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${LAST_WEEK}&primary_release_date.lte=${TODAY}&api_key=bf01af8f5d704591a09edcc0c2f5e084`)
   .then(response => {
        res.send(response.data)
   })
   .catch(error => {
       console.log("error", error)
   })
})

app.get("/movie/:id",(req, res) => {

    let id = req.params.id

    axios.get(`http://api.themoviedb.org/3/movie/${id}?api_key=bf01af8f5d704591a09edcc0c2f5e084`)
   .then(response => {
        res.send(response.data)
   })
   .catch(error => {
       console.log("error", error)
   })
})


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))

// --experimental-json-modules