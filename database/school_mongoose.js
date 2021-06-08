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
    languages: Array,
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
                    "60ba207deddc658f45af3d74",
                    "60ba2088eddc658f45af3d75"
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
                    "60ba207deddc658f45af3d74",
                    "60ba208eeddc658f45af3d76"
                ]
            },
            {
                name: "Marc",
                city: "Marseille",
                favorites: {
                    class: "Literature",
                    sport: "Tennis"
                },
                languages: [
                    "60ba207deddc658f45af3d74"
                ]
            },
            {
                name: "Nour",
                city: "Lyon",
                favorites: {
                    class: "Arts",
                    sport: "Baseball"
                },
                languages: [
                    "60ba207deddc658f45af3d74",
                    "60ba2088eddc658f45af3d75",
                    "60ba2096eddc658f45af3d77",
                    "60ba209ceddc658f45af3d78"
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
                    "60ba207deddc658f45af3d74",
                    "60ba209ceddc658f45af3d78"
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
                    "60ba207deddc658f45af3d74",
                    "60ba2088eddc658f45af3d75",
                    "60ba208eeddc658f45af3d76"
                ]
            }
        ])

    } catch (error) {
        console.error("Error !!!", error);
    }
}

// ******************************************** RAPPORT LVL 1 **************************************************

// 1. Récupérer toutes les colonnes de l’étudiant.e avec l’ID 3

async function searchId3 () {
    try {
        
        const studentById3 = await Students.findById("60bf7f88c89c6578bc4f3649") 
        console.log(studentById3);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 2. Récupérer toutes les colonnes l’étudiant.e avec l’ID 6

async function searchId6 () {
    try {
        const studentById6 = await Students.findById("60bf7f88c89c6578bc4f364c") 
        console.log(studentById6);
    } catch (error) {
        console.error("Error !!!", error);
    }   
}

// 3. Récupérer le nom et la ville de l’étudiant.e avec l’ID 1

async function searchId1 () {
    try {
        const studentById1 = await Students.findById("60bf7f88c89c6578bc4f3647", "name city -_id") 
        console.log(studentById1);  
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 4. Récupérer le nom de l’étudiant.e avec l’ID 2

async function searchId2 () {
    try {
        const studentById2 = await Students.findById("60bf7f88c89c6578bc4f3648", "name -_id") 
        console.log(studentById2);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 5. Récupérer toutes les colonnes des étudiant.e.s de la ville de Paris

async function searchStudentFromParis () {
    try { 
        const studentFromParis = await Students.find({ city: "Paris"}) 
        console.log(studentFromParis);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 6. Récupérer les noms des étudiant.es de la ville de Lyon

async function searchNameFromLyon () {
    try { 
        const nameStudentFromLyon = await Students.find({ city: "Lyon"}, 'name -_id') 
        console.log(nameStudentFromLyon);
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// ******************************************** RAPPORT LVL 2 **************************************************

// 1. Pour l’étudiant.e d’ID 5, récupérer toutes les colonnes sur l’étudiant.e et ses activités favorites

async function searchId5 () {
    try {
        const studentById5 = await Students.findById("60bf7f88c89c6578bc4f364b", "-languages -_id") 
        console.log(studentById5);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 2. Pour l’étudiant.e d’ID 4, récupérer son nom et son sport préféré

async function searchId4 () {
    try {
        const studentById4 = await Students.findById("60bf7f88c89c6578bc4f364a", "name favorites.sport -_id") 
        console.log(studentById4);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 3. Pour l’étudiant.e d’ID 1, récupérer son nom et sa matière préférée

async function searchId1Bis () {
    try {
        const studentById1 = await Students.findById("60bf7f88c89c6578bc4f3647", "name favorites.class -_id") 
        console.log(studentById1);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 4. Récupérer toutes les colonnes de l’étudiant.e qui aime la musique

async function searchStudentsLikeMusic () {
    try { 
        const studentsLikeMusic = await Students.find({ "favorites.class": "Music"}) 
        console.log(studentsLikeMusic);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 5. Récupérer le nom des étudiant.e.s qui aime le tennis

async function searchStudentsLikeTennis () {
    try { 
        const studentsLikeTennis = await Students.find({ "favorites.sport": "Tennis"}, 'name -_id') 
        console.log(studentsLikeTennis);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 6. Récupérer le nom des étudiant.e.s qui aime les matières artistiques

async function searchStudentsLikeArts () {
    try { 
        const studentsLikeArts = await Students.find({ "favorites.class": "Arts"}, 'name -_id') 
        console.log(studentsLikeArts);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

// 7. Récupérer le nombre d’étudiant.e.s de la ville de Paris

async function countStudentsFromParis () {
    try { 
        const studentsFromParis = await Students.countDocuments({ city: "Paris"},) 
        console.log(studentsFromParis);
    } catch (error) {
        console.error("Error !!!", error);
    }
}


// ******************************************** RAPPORT LVL 3 **************************************************

// 1. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 1

async function searchLanguagesId1 () {
    try { 
        const languagesAndOtherId1 = await Students.findById("60bf7f88c89c6578bc4f3647").populate("languages", "name -_id")
        console.log(languagesAndOtherId1);
    } catch (error) {
        console.error("Error !!!", error);
    }
}

searchLanguagesId1()

// 2. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 4
// 3. Récupérer la colonne langue et le nom de l’étudiant.e d’ID 5
// 4. Pour chaque étudiant.e.s (6), faîtes une requêtes pour récupérer 
//  le nombre de langues parlées par cet étudiant.e.s avec leurs noms et le nombres de langues