const mongoose = require("mongoose")

const configureSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    budgetName: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    },
    budget: {
        type: Number,
        required: true,
    }
}, { collection: 'configure'})

module.exports = mongoose.model('configure', configureSchema)