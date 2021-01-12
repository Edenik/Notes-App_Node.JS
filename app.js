// const express = require('express');
const path = require('path')
const express = require('express')
const hbs = require('hbs')
// require('dotenv').config()

const port = process.env.PORT || 3000





const notesRouter = require('./routes/notes');
const cors = require('cors');
const { totalmem } = require('os');
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/public')
const viewPath = path.join(__dirname, '/public/templates/views');
const partialsPath = path.join(__dirname, '/public/templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use('/api/notes', notesRouter);




/* GET all notes */
/* GET /allNotes?completed=false */
/* GET /allNotes?limit=10&skip=0 */
/* GET /allNotes?sortBy=createdAt:desc */
app.get('/allNotes', (req, res) => {
    let completed;
    let query = '';
    let title = 'All Notes'
    if (req.query.completed) {
        completed = req.query.completed === 'true';
        completed ? title = 'Completed' : title = 'Uncompleted'
        query += `?completed=${completed}`
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        if (query === '') {
            query += `?sortBy=${parts[0]}:${parts[1]}`
        }
        else {
            query += `&sortBy=${parts[0]}:${parts[1]}`
        }
    }

    res.render(title === 'All Notes' ? 'index' : 'index', {
        title,
        query
    })
})


app.get('/addNote', (req, res) => {
    res.render('addEditNote', {
        title: 'New Note',
    })
})

app.get('/editNote/:id', (req, res) => {
    res.render('addEditNote', {
        title: 'Edit Note',
        noteID: req.params.id
    })
})



app.get('/search', (req, res) => {
    // let query = '';

    // if (req.query.owner) {
    //     if (query === '') {
    //         query += `?owner=${req.query.owner}`;
    //     }
    //     else {
    //         query += `&owner=${req.query.owner}`;
    //     }
    // }

    // if (req.query.title) {
    //     if (query === '') {
    //         query += `?title=${req.query.title}`;
    //     }
    //     else {
    //         query += `&title=${req.query.title}`;
    //     }
    // }

    // if (req.query.body) {
    //     if (query === '') {
    //         query += `?body=${req.query.body}`;
    //     }
    //     else {
    //         query += `&body=${req.query.body}`;
    //     }
    // }

    res.render('search', {
        title: 'Search Note',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404'
    })
})



app.listen(port, () => console.log(`server now running on port: ${port}`));

