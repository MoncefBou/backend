const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/garage", (err) => {
    if (err) {
        console.error("Error !", err)
    } else {
        console.log("I'm connected to the database");
    }
})

const carsSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    create: { type: Date, default: Date.now }
})

const Car = mongoose.model("Car", carsSchema)


async function firstCarFunc() {

    try {
        const theCar = new Car({
            brand: "Renault",
            model: "Espace",
            year: 1999
        })

        const carSaved = await theCar.save()

        console.log("Car added !");

    } catch (error) {
        console.error("Error !!!", error)
    }
}

async function secondCarFunc() {

    try {
        const theCar = new Car({
            brand: "Renault",
            model: "Scenic",
            year: 2004
        })

        const carSaved = await theCar.save()

        console.log("Car added !");

    } catch (error) {
        console.error("Error !!!", error)
    }
}

async function thirdCarFunc() {

    try {
        const theCar = new Car({
            brand: "Peugeot",
            model: "308",
            year: 2017
        })

        const carSaved = await theCar.save()

        console.log("Car added !");

    } catch (error) {
        console.error("Error !!!", error)
    }
}

async function searchFunc() {
    try {

        const findCar = await Car.findById("60be0cd7773c1f6a8ed99269")
        console.log(findCar);

    } catch (error) {
        console.error("Error !!!", error)
    }
}

async function updateFunc() {
    try {
        const updateCar = await Car.updateOne({ model: "Espace" }, { $set: { year: 2000 } })
    } catch (error) {
        console.error("Error !!!", error)
    }
}

async function deleteFunc() {
    try {
        const deleteCar = await Car.deleteMany({ brand: "Renault" })
    } catch (error) {
        console.error("Error !!!", error)
    }
}

async function insertManyFunc() {
    try {
        const insertCar = await Car.insertMany([
            { brand: "Aston Martin", model: "DB9", year: 2010 },
            { brand: "Range Rover", model: "Discovery Sport", year: 2017 }])
    } catch (error) {
        console.error("Error !!!", error)
    }
}

