var express = require('express');
var app = express();



// EX 2
var arrayOfAuthors = ['Larwrence Nowell, UK', 'William Shakespeare, UK', 'Charles Dickens, US', 'Oscar Wilde, UK'];

app.get('/authors/:id', function (req, res) {
    var number = req.params.id - 1
    
    if (arrayOfAuthors[number] === undefined) {
        res.send('No authors here, sorry...');
    } else {
        res.send(arrayOfAuthors[number]);
    }
})

// EX 3
var arrayBooks = ['Beowulf', 'Hamlet, Othello, Romeo and Juliet, MacBeth', 'Oliver Twist, A Christmas Carol', 'The Picture of Dorian Gray, The Importance of Being Earnest'];

app.get('/authors/:id/books', function (req, res) {
    var number = req.params.id - 1

    if (arrayOfAuthors[number] === undefined) {
        res.send('No authors here, sorry...');
    } else {
        res.send(arrayBooks[number]);
    }
})

// EX 4
var arrayOfAuthorsLite = ['Larwrence Nowell', 'William Shakespeare', 'Charles Dickens', 'Oscar Wilde'];

app.get('/json/authors/:id', function (req, res) {
    var number = req.params.id - 1
    var nation = "";

    if ( arrayOfAuthorsLite[number] === undefined) {
        res.send ('No authors here, sorry...');
    } else {
        if ( number == 2) {
            nation = "US";
        }  else {
            nation = "UK";
        }

        res.json({
            name: arrayOfAuthorsLite[number],
            nationality: nation
        })
    }
})

app.get('/json/authors/:id/books', function (req, res) {
    var number = req.params.id - 1

    if ( arrayBooks[number] === undefined) {
        res.send ('No books here, sorry...');
    } else {
        res.json ({
            books: arrayBooks[number].split(",")
        })
    }
})


// RUN SERVER 
var port = 8000;
app.listen(port, function () {
    console.log('Server is', port);
})