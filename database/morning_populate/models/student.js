const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/morning_populate")


const studentSchema = mongoose.Schema({
    firstName: String,
    surname: String,
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }]
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student