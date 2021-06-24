const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    seat: Number,
    isVIP: Boolean
})

const Table = mongoose.model('Table', tableSchema)

module.exports = Table