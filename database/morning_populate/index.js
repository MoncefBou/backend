const mongoose = require('mongoose')
const Student = require('./models/student');
const Address = require('./models/address');

mongoose.connect("mongodb://localhost:27017/morning_populate", (err) => {
    if (err) {
        console.error('Error !!!', err);
    } else {
        console.log('Connected !');
    }
})


async function addAddress() {
    try {
        await Address.insertMany([
            {
                streetName: "Debussy",
                streetNumber: "24",
                postCode: "93300",
                city: "Paris"
            },
            {
                streetName: "Claude",
                streetNumber: "2",
                postCode: "32001",
                city: "Lyon"
            }])
    
        console.log('fait');
        
    } catch (error) {
        console.error(error);
    }


}

async function addStudent() {
    try {
        await Student.insertMany([
            {
                firstName: "Moncef",
                surname: "Bou",
                address: ["60c2279cb6623d99c62e9806", "60c2279cb6623d99c62e9807"]
            },
            {
                firstName: "Prenom",
                surname: "Nom",
                address: ["60c2279cb6623d99c62e9807"]
            }])
    
        console.log('fait');
        
    } catch (error) {
        console.error(error);
    }
    
}

async function showStudent() {
    try {

        const studentFound = await Student.findById("60c22913770a0e9a4fd74238").populate('address')
        console.log('studentFound', studentFound);

        
    } catch (error) {
        console.error(error);
    }
}

showStudent()