const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const validator = require('validator')


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid')
        }
    },
    password: {
        validate(value) {
            // Passwords must be:
            // - At least 8 characters long, max length 12
            // - Include at least 1 lowercase letter
            // - 1 capital letter
            // - 1 number
            // - 1 special character => !@#$%^&*

            const passRegex = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,12}$/);
            if (!passRegex.test(value)) {
                throw new Error('Password must be at least 8 characthers, with at least 1 lowercase char, 1 uppercase char and 1 number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);
