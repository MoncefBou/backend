// Créer la BDD

show dbs
use school

// Créer la collection students

db.students.insert({ name: "name", city: "city"}) // A faire pour chaque élève


// Créer la collection languages

db.languages.insert({ name: "language"}) // A faire pour chaque langue


// Créer la collection favorites

db.favorites.insert({ 
    class:"Arts", sport:"Baseball", 
    student_id:ObjectId("60ba1fcdeddc658f45af3d71") 
}) // Exemple à faire


// Créer la collection students_languages

db.students_languages.insert({ 
    student_id:ObjectId("60ba1feaeddc658f45af3d73"), 
    language_id:ObjectId("60ba208eeddc658f45af3d76") 
}) // Exemple à faire

// ******************************************* RAPPORT LVL 1 *****************************************************

// 1. Récupérer toutes les colonnes de l’étudiant.e avec l’ID 3

db.students.find({_id:ObjectId("60ba1fbfeddc658f45af3d70")})

// 2. Récupérer toutes les colonnes l’étudiant.e avec l’ID 6

db.students.find({_id:ObjectId("60ba1feaeddc658f45af3d73")})

// 3. Récupérer le nom et la ville de l’étudiant.e avec l’ID 1

db.students.find({_id:ObjectId("60ba1edceddc658f45af3d6e")}, {"name":1, "city":1, "_id":0})

// 4. Récupérer le nom de l’étudiant.e avec l’ID 2

db.students.find({_id:ObjectId("60ba1fb6eddc658f45af3d6f")}, {"name":1, "_id":0})

// 5. Récupérer toutes les colonnes des étudiant.e.s de la ville de Paris

db.students.find({"city":"Paris"})

// 6. Récupérer les noms des étudiant.es de la ville de Lyon

db.students.find({"city":"Lyon"}, {"name":1})



// ******************************************* RAPPORT LVL 2 *****************************************************

//1. Pour l’étudiant.e d’ID 5, récupérer toutes les colonnes sur l’étudiant.e et ses activités favorites

