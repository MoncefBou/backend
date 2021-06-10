const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics")

const tableSchema = mongoose.Schema({
    seat: Number,
    isVIP: Boolean
})

const Table = mongoose.model('Table', tableSchema)

module.exports = Table