const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    budgetName: {
        type: String,
        trim: true,
        required: true,
    },
    budgetSpent: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        trim: true,
        required: true,
    }
}, { collection: 'expense'})

module.exports = mongoose.model('expense', expenseSchema)