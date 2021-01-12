const path = require('path')
const express = require('express')
const hbs = require('hbs')
// require('dotenv').config()
const cors = require('cors');
const RandExp = require('randexp');
const notesRouter = require('./routers/api/notes');
const webRouter = require('./routers/web');

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
app.use('/', webRouter);



app.get("/randomPassword", (req, res) => {

    /*
 * Passwords must be 
 * - At least 8 characters long, max length 12
 * - Include at least 1 lowercase letter
 * - 1 capital letter
 * - 1 number
 * - 1 special character => !@#$%^&*
    */

    let passRegex = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,12}$/);
    let random = new RandExp(passRegex).gen();

    res.send({ random, length: random.length })
});


app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404'
    })
})

app.listen(port, () => console.log(`server now running on port: ${port}`));

