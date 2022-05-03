const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Please add your goal amount']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'I know who you are :D'],
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)