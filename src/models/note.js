const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length < 6) throw new Error('Title must be at least 6 chars');
        }
    },
    body: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length < 6) throw new Error('Body must be at least 6 chars');
        }
    },
    owner: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length < 3) throw new Error('Owner must be at least 3 chars');
        }
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, })

module.exports = mongoose.model('notes', notesSchema);