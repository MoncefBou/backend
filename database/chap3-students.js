// Créer la BDD

"show dbs"
"use school"

// Créer les collections

db.languages.insert({ name: "language" }) // A faire pour chaque langue

db.students.insert({ name: "name",
 city: "city", 
 favorites: {class: "subject", sport: "sport"}, 
 languages : ["id_langue_1", "id_langue_2" ]  }) // A faire pour chaque élève


// ******************************************* RAPPORT LVL 1 *****************************************************

// 1. Récupérer toutes les colonnes de l’étudiant.e avec l’ID 3

db.students.find({ _id: ObjectId("60ba1fbfeddc658f45af3d70") })

// 2. Récupérer toutes les colonnes l’étudiant.e avec l’ID 6

db.students.find({ _id: ObjectId("60ba1feaeddc658f45af3d73") })

// 3. Récupérer le nom et la ville de l’étudiant.e avec l’ID 1

db.students.find({ _id: ObjectId("60ba1edceddc658f45af3d6e") }, { "name": 1, "city": 1, "_id": 0 })

// 4. Récupérer le nom de l’étudiant.e avec l’ID 2

db.students.find({ _id: ObjectId("60ba1fb6eddc658f45af3d6f") }, { "name": 1, "_id": 0 })

// 5. Récupérer toutes les colonnes des étudiant.e.s de la ville de Paris

db.students.find({ "city": "Paris" })

// 6. Récupérer les noms des étudiant.es de la ville de Lyon

db.students.find({ "city": "Lyon" }, { "name": 1 })



// ******************************************* RAPPORT LVL 2 *****************************************************

// 1. Pour l’étudiant.e d’ID 5, récupérer toutes les colonnes sur l’étudiant.e et ses activités favorites

db.students.find({ _id: ObjectId("60ba1fe0eddc658f45af3d72") }, { name: 1, city: 1, favorites: 1 })

// 2. Pour l’étudiant.e d’ID 4, récupérer son nom et son sport préféré

db.students.find({ _id: ObjectId("60ba1fcdeddc658f45af3d71") }, { _id: 0, name: 1, favorites: { sport: 1 } })

// 3. Pour l’étudiant.e d’ID 1, récupérer son nom et sa matière préférée

db.students.find({ _id: ObjectId("60ba1edceddc658f45af3d6e") }, { _id: 0, name: 1, favorites: { class: 1 } })

// 4. Récupérer toutes les colonnes de l’étudiant.e qui aime la musique

db.students.find({ "favorites.class": "Music" })

// 5. Récupérer le nom des étudiant.e.s qui aime le tennis

db.students.find({ "favorites.sport": "Tennis" })

// 6. Récupérer le nom des étudiant.e.s qui aime les matières artistiques

db.students.find({ "favorites.class": "Arts" })

// 7. Récupérer le nombre d’étudiant.e.s de la ville de Paris

db.students.aggregate([
    { $match: { "city": "Paris" } },
    { $group: { _id: "$city", number_of_students: { $sum: { $toInt: 1 } } } }
])


// ******************************************* RAPPORT LVL 3 *****************************************************

// 1. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 1

db.students.aggregate([
    { $match: { _id: ObjectId("60ba1edceddc658f45af3d6e") } },
    {
        $lookup:
        {
            from: 'languages',
            localField: 'languages',
            foreignField: '_id',
            as: 'languages'
        }
    }
])

// 2. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 4

db.students.aggregate([
    { $match: { _id: ObjectId("60ba1fcdeddc658f45af3d71") } },
    {
        $lookup:
        {
            from: 'languages',
            localField: 'languages',
            foreignField: '_id',
            as: 'languages'
        }
    }
])

// 3. Récupérer la colonne langue et le nom de l’étudiant.e d’ID 5

db.students.aggregate([
    { $match: { _id: ObjectId("60ba1fe0eddc658f45af3d72") } },
    {
        $lookup:
        {
            from: 'languages',
            localField: 'languages',
            foreignField: '_id',
            as: 'languages'
        }
    },
    { $project: { "_id": 0, "languages": 1, "name": 1 } }
])

// 4. Pour chaque étudiant.e.s (6), 
// faîtes une requêtes pour récupérer le nombre de langues parlées par cet étudiant.e.s 
// avec leurs noms et le nombres de langues

db.students.aggregate([
    {
        $lookup:
        {
            from: 'languages',
            localField: 'languages',
            foreignField: '_id',
            as: 'languages'
        }
    },
    { $project: { "_id": 0, "name": 1, "languages": 1, "number_of_languages": { $size: "$languages" } } }
])


// ************************************************ BONUS *********************************************************

// 1. Récupérer les étudiant.e.s qui ont un “e” dans leur prénom

db.students.find({ "name": { $regex: /e/ } })

// 2. Récupérer le sport préférés des étudiant.e.s qui ont un “e” dans leur prénom

db.students.find({ "name": { $regex: /e/ } }, { _id: 0, "favorites.sport": 1 })

// 3. Récupérer la classe préférées des étudiant.e.s qui ont un “i” dans le nom de leur ville

db.students.find({ "city": { $regex: /i/ } }, { _id: 0, "favorites.class": 1 })

