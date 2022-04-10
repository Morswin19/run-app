const mongoose = require('mongoose')

const runSchema = mongoose.Schema({
    length: {
        type: Number,
        required: [true, 'Please add your run length']
    },
    date: {
        type: Date,
        required: [true, 'Please add the date of your run']
    },
    user: {
        type: String,
        required: [true, 'I know who you are :D']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Run', runSchema)