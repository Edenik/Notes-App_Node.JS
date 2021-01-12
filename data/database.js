const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notes-app', {useUnifiedTopology:true, useNewUrlParser:true});