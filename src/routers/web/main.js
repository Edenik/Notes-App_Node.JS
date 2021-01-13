const express = require('express');
const router = express.Router();

/* GET all notes - index route */
/* GET /?completed=false */
/* GET /?sortBy=createdAt:desc */
router.get('/', (req, res) => {
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

    res.render('index', {
        title,
        query
    })
})


router.get('/addNote', (req, res) => {
    res.render('addEditNote', {
        title: 'New Note',
    })
})

router.get('/editNote/:id', (req, res) => {
    res.render('addEditNote', {
        title: 'Edit Note',
        noteID: req.params.id
    })
})

router.get('/search', (req, res) => {
    res.render('search', {
        title: 'Search Note',
    })
})




module.exports = router;
