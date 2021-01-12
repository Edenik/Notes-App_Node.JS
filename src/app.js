const path = require('path')
const express = require('express')
const hbs = require('hbs')
// require('dotenv').config()
const cors = require('cors');
const notesRouter = require('./routers/api/notes');
const usersRouter = require('./routers/api/users');
const webRouter = require('./routers/web/web');
const authRouter = require('./routers/web/auth');

const port = process.env.PORT || 3000
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
hbs.registerPartials(partialsPath);


app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/', webRouter);
app.use('/auth/', authRouter);


app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404'
    })
})

app.listen(port, () => console.log(`server now running on port: ${port}`));

