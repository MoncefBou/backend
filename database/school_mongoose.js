const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/school_mongoose", (err) => {
    if (err) {
        console.error("Error !", err)
    } else {
        console.log("I'm connected to the database");
    }
})


const languagesSchema = mongoose.Schema({
    name: String,
    created: { type: Date, default: Date.now }
})

const Languages = mongoose.model("Languages", languagesSchema)

const studentsSchema = mongoose.Schema({
    name: String,
    city: String,
    favorites: Object,
    languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Languages' }],
    created: { type: Date, default: Date.now }
})

const Students = mongoose.model("Students", studentsSchema)


async function addAllLanguages() {
    try {
        await Languages.insertMany([
            { name: "French" },
            { name: "English" },
            { name: "German" },
            { name: "Spanish" },
            { name: "Mandarin" }
        ])
    } catch (error) {
        console.error("Error !!!", error);
    }
}


async function addAllStudents() {
    try {
        await Students.insertMany([
            {
                name: "Véronique",
                city: "Paris",
                favorites: {
                    class: "Arts",
                    sport: "Boxing"
                },
                languages: [
                    "60bf74b5c0d0eb7828ff811e",
                    "60bf74b5c0d0eb7828ff811f"
                ]
            },
            {
                name: "Steeven",
                city: "Lyon",
                favorites: {
                    class: "Maths",
                    sport: "Cricket"
                },
                languages: [
                    "60bf74b5c0d0eb7828ff811e",
                    "60bf74b5c0d0eb7828ff8120"
                ]
            },
            {
                name: "Marc",
                city: "Marseille",
                favorites: {
                    class: "Literature",
                    sport: "Tennis"
                },
                languages:  ["60bf74b5c0d0eb7828ff811e"]
            
            },
            {
                name: "Nour",
                city: "Lyon",
                favorites: {
                    class: "Arts",
                    sport: "Baseball"
                },
                languages: [
                    "60bf74b5c0d0eb7828ff811e",
                    "60bf74b5c0d0eb7828ff811f",
                    "60bf74b5c0d0eb7828ff8121",
                    "60bf74b5c0d0eb7828ff8122"
                ]
            },
            {
                name: "Romain",
                city: "Paris",
                favorites: {
                    class: "Computer science",
                    sport: "Tennis"
                },
                languages: [
                    "60bf74b5c0d0eb7828ff811e",
                    "60bf74b5c0d0eb7828ff8122"
                ]
            },
            {
                name: "Sophie",
                city: "Paris",
                favorites: {
                    class: "Music",
                    sport: "Hip-hop"
                },
                languages: [
                    "60bf74b5c0d0eb7828ff811e",
                    "60bf74b5c0d0eb7828ff811f",
                    "60bf74b5c0d0eb7828ff8120"
                ]
            }
        ])

    } catch (error) {
        console.error("Error !!!", error);
    }
}


// ******************************************** RAPPORT LVL 1 **************************************************

// 1. Récupérer toutes les colonnes de l’étudiant.e avec l’ID 3

async function searchId3() {
    try {

        const studentById3 = await Students.findById("60bf7f88c89c6578bc4f3649")
        console.log(studentById3);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 2. Récupérer toutes les colonnes l’étudiant.e avec l’ID 6

async function searchId6() {
    try {
        const studentById6 = await Students.findById("60bf7f88c89c6578bc4f364c")
        console.log(studentById6);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 3. Récupérer le nom et la ville de l’étudiant.e avec l’ID 1

async function searchId1() {
    try {
        const studentById1 = await Students.findById("60bf7f88c89c6578bc4f3647", "name city -_id")
        console.log(studentById1);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 4. Récupérer le nom de l’étudiant.e avec l’ID 2

async function searchId2() {
    try {
        const studentById2 = await Students.findById("60bf7f88c89c6578bc4f3648", "name -_id")
        console.log(studentById2);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 5. Récupérer toutes les colonnes des étudiant.e.s de la ville de Paris

async function searchStudentFromParis() {
    try {
        const studentFromParis = await Students.find({ city: "Paris" })
        console.log(studentFromParis);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 6. Récupérer les noms des étudiant.es de la ville de Lyon

async function searchNameFromLyon() {
    try {
        const nameStudentFromLyon = await Students.find({ city: "Lyon" }, 'name -_id')
        console.log(nameStudentFromLyon);
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// ******************************************** RAPPORT LVL 2 **************************************************

// 1. Pour l’étudiant.e d’ID 5, récupérer toutes les colonnes sur l’étudiant.e et ses activités favorites

async function searchId5() {
    try {
        const studentById5 = await Students.findById("60bf7f88c89c6578bc4f364b", "-languages -_id")
        console.log(studentById5);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 2. Pour l’étudiant.e d’ID 4, récupérer son nom et son sport préféré

async function searchId4() {
    try {
        const studentById4 = await Students.findById("60bf7f88c89c6578bc4f364a", "name favorites.sport -_id")
        console.log(studentById4);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 3. Pour l’étudiant.e d’ID 1, récupérer son nom et sa matière préférée

async function searchId1Bis() {
    try {
        const studentById1 = await Students.findById("60bf7f88c89c6578bc4f3647", "name favorites.class -_id")
        console.log(studentById1);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 4. Récupérer toutes les colonnes de l’étudiant.e qui aime la musique

async function searchStudentsLikeMusic() {
    try {
        const studentsLikeMusic = await Students.find({ "favorites.class": "Music" })
        console.log(studentsLikeMusic);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 5. Récupérer le nom des étudiant.e.s qui aime le tennis

async function searchStudentsLikeTennis() {
    try {
        const studentsLikeTennis = await Students.find({ "favorites.sport": "Tennis" }, 'name -_id')
        console.log(studentsLikeTennis);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 6. Récupérer le nom des étudiant.e.s qui aime les matières artistiques

async function searchStudentsLikeArts() {
    try {
        const studentsLikeArts = await Students.find({ "favorites.class": "Arts" }, 'name -_id')
        console.log(studentsLikeArts);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 7. Récupérer le nombre d’étudiant.e.s de la ville de Paris

async function countStudentsFromParis() {
    try {
        const studentsFromParis = await Students.countDocuments({ city: "Paris" },)
        console.log(studentsFromParis);
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// ******************************************** RAPPORT LVL 3 **************************************************

// 1. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 1

async function searchLanguagesId1() {
    try {
        const languagesAndOtherId1 = await Students.findOne({ _id: "60c0b1b533aa348488a18749" })
            .populate('languages')
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log(students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 2. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 4

async function searchLanguagesId4() {
    try {
        const languagesAndOtherId4 = await Students.findOne({ _id: "60c0b1b533aa348488a1874c" })
            .populate('languages')
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log(students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// 3. Récupérer la colonne langue et le nom de l’étudiant.e d’ID 5

async function searchLanguagesId5() {
    try {
        const languagesAndOtherId5 = await Students.findOne({ _id: "60c0b1b533aa348488a1874d" }, 'name -_id')
            .populate('languages', 'name -_id')
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log(students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// searchLanguagesId5()

// 4. Pour chaque étudiant.e.s (6), faîtes une requêtes pour récupérer 
//  le nombre de langues parlées par cet étudiant.e.s avec leurs noms et le nombres de langues

async function searchAndCountAllLanguages() {
    try {
        const countAllLanguages = await Students.find({}, 'name -_id')
            .populate('languages', 'name -_id')
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log(students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}

async function searchAndCountAllLanguagesAggregate() {
    try {
        const countAllLanguages = await Students.aggregate([
            {
                $lookup:
                {
                    from: 'languages',
                    localField: 'languages',
                    foreignField: '_id',
                    as: 'languages'
                }
            },
            { $project: { "_id": 0, "name": 1, "languages.name": 1, "number_of_languages": { $size: "$languages" } } }
        ])
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log('%j', students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// ************************************************ BONUS *********************************************************

// 1. Récupérer les étudiant.e.s qui ont un “e” dans leur prénom

async function namesWithE() {
    try {
        const nameWithE = await Students.find({ "name": { $regex: /e/ } })
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log(students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// 2. Récupérer le sport préférés des étudiant.e.s qui ont un “e” dans leur prénom

async function sportNamesWithE() {
    try {
        const sportNameWithE = await Students.find({ "name": { $regex: /e/ } }, "favorites.sport -_id")
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log(students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// 3. Récupérer la classe préférées des étudiant.e.s qui ont un “i” dans le nom de leur ville

async function classStudentCityWithI() {
    try {
        const classStudentCityWithI = await Students.find({ "city": { $regex: /i/ } }, "favorites.class -_id")
            .exec(
                function (err, students) {
                    if (err) {
                        console.error('ERROR !!!', err);
                    } else {
                        console.log(students);
                    }
                }
            )
    } catch (error) {
        console.error("Error !!!", error);
    }
}

