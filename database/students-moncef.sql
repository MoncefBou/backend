

-- *********************************** BDD -> Chap 2 -> Students ***************************************************

-- Créer une table students avec la colonne id (clé primaire unique),name (une chaîne de 30 caractères maximum) 
-- et city (une chaîne de 30 caractères maximum)

CREATE table if not EXISTS students (
	id int unsigned not null PRIMARY key AUTO_INCREMENT,
	name varchar(30),
	city varchar(30)
);

-- Avec les données suivantes :

insert into students (name, city)
VALUES ("Véronique", "Paris");

insert into students (name, city)
VALUES ("Steeven", "Lyon");

insert into students (name, city)
VALUES ("Marc", "Marseille");

insert into students (name, city)
VALUES ("Nour", "Lyon");

insert into students (name, city)
VALUES ("Romain", "Paris");

insert into students (name, city)
VALUES ("Sophie", "Paris");


-- 1. Créer une table `languages` avec la colonne `id` (clé primaire unique) 
-- et `name` (une chaîne de 30 caractères maximum)

CREATE table if not EXISTS languages (
	id int unsigned not null PRIMARY key AUTO_INCREMENT,
	name varchar(30)
);

-- 2. Avec les données suivantes :

insert into languages (name)
VALUE ("French");

insert into languages (name)
VALUE ("English");

insert into languages (name)
VALUE ("German");

insert into languages (name)
VALUE ("Spanish");

insert into languages (name)
VALUE ("Mandarin");


-- Créer une table favorites avec la colonne id (un chiffre et clé primaire unique), 
-- class (une chaîne de 30 caractères maximum), sport (une chaîne de 30 caractères maximum) 
-- et student_id (un chiffre)

CREATE table if not EXISTS favorites (
	id int unsigned not null PRIMARY key AUTO_INCREMENT,
	class varchar(30),
	sport varchar(30),
  	student_id int unsigned not null
);

-- 2. Avec les données suivantes :

insert into favorites (class, sport, student_id)
VALUES ("Maths", "Cricket", 2);

insert into favorites (class, sport, student_id)
VALUES ("Music", "Hip-hop", 6);

insert into favorites (class, sport, student_id)
VALUES ("Arts", "Boxing", 1);

insert into favorites (class, sport, student_id)
VALUES ("Literature", "Tennis", 3);

insert into favorites (class, sport, student_id)
VALUES ("Computer science", "Tennis", 5);

insert into favorites (class, sport, student_id)
VALUES ("Arts", "Baseball", 4);


-- Créer une table students_languages avec la colonne id (un chiffre et clé primaire unique), 
-- student_id (un chiffre) et language_id (un chiffre)

CREATE table if not EXISTS students_languages (
	id int unsigned not null PRIMARY key AUTO_INCREMENT,
  	student_id int unsigned not null,
   	language_id int unsigned not null
);

-- 2. Avec les données suivantes :

insert into students_languages (student_id, language_id)
VALUES (1, 1);

insert into students_languages (student_id, language_id)
VALUES (1, 2);

insert into students_languages (student_id, language_id)
VALUES (2, 1);

insert into students_languages (student_id, language_id)
VALUES (2, 3);

insert into students_languages (student_id, language_id)
VALUES (3, 1);

insert into students_languages (student_id, language_id)
VALUES (4, 1);

insert into students_languages (student_id, language_id)
VALUES (4, 2);

insert into students_languages (student_id, language_id)
VALUES (4, 4);

insert into students_languages (student_id, language_id)
VALUES (4, 5);

insert into students_languages (student_id, language_id)
VALUES (5, 1);

insert into students_languages (student_id, language_id)
VALUES (5, 5);

insert into students_languages (student_id, language_id)
VALUES (6, 1);

insert into students_languages (student_id, language_id)
VALUES (6, 2);

insert into students_languages (student_id, language_id)
VALUES (6, 3);


-- ****************************************** RAPPORT LVL 1 *********************************************************

-- 1. Récupérer toutes les colonnes de l’étudiant.e avec l’ID 3

select *
from students s
inner join favorites f on s.id = f.student_id
INNER join students_languages sl on f.student_id = sl.student_id
inner join languages l on sl.language_id = l.id
where s.id = 3

-- 2. Récupérer toutes les colonnes l’étudiant.e avec l’ID 6

select *
from students s
inner join favorites f on s.id = f.student_id
INNER join students_languages sl on f.student_id = sl.student_id
inner join languages l on sl.language_id = l.id
where s.id = 6

-- 3. Récupérer le nom et la ville de l’étudiant.e avec l’ID 1

select s.name, s.city
from students s
where s.id = 1

-- 4. Récupérer le nom de l’étudiant.e avec l’ID 2

select s.name
from students s
where s.id = 2

-- 5. Récupérer toutes les colonnes des étudiant.e.s de la ville de Paris

select *
from students s
inner join favorites f on s.id = f.student_id
INNER join students_languages sl on f.student_id = sl.student_id
inner join languages l on sl.language_id = l.id
where s.city = "Paris"
GROUP by s.name

-- 6. Récupérer les noms des étudiant.es de la ville de Lyon

select s.name
from students s
where s.city = "Lyon"


-- ***************************************** RAPPORT LVL 2 **********************************************************

-- 1. Pour l’étudiant.e d’ID 5, récupérer toutes les colonnes sur l’étudiant.e et ses activités favorites

select *
from students s
inner join favorites f on s.id = f.student_id
where s.id = 5

-- 2. Pour l’étudiant.e d’ID 4, récupérer son nom et son sport préféré

select s.name, f.sport
from students s
inner join favorites f on s.id = f.student_id
where s.id = 4

-- 3. Pour l’étudiant.e d’ID 1, récupérer son nom et sa matière préférée

select s.name, f.class
from students s
inner join favorites f on s.id = f.student_id
where s.id = 3

-- 4. Récupérer toutes les colonnes de l’étudiant.e qui aime la musique

select *
from students s
inner join favorites f on s.id = f.student_id
where f.class = "Music"

-- 5. Récupérer le nom des étudiant.e.s qui aime le tennis

select s.name
from students s
inner join favorites f on s.id = f.student_id
where f.sport = "Baseball"

-- 6. Récupérer le nom des étudiant.e.s qui aime les matières artistiques

select s.name
from students s
inner join favorites f on s.id = f.student_id
where f.class = "Arts"

-- 7. Récupérer le nombre d’étudiant.e.s de la ville de Paris

select s.city, COUNT(*)
from students s
where s.city = "Paris"

-- ***************************************** RAPPORT LVL 3 **********************************************************

-- 1. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 1

select s.id, s.name, s.city, l.name
from students s
inner join favorites f on s.id = f.student_id
INNER join students_languages sl on f.student_id = sl.student_id
inner join languages l on sl.language_id = l.id
where s.id = 1

-- 2. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 4

select s.id, s.name, s.city, l.name
from students s
inner join favorites f on s.id = f.student_id
INNER join students_languages sl on f.student_id = sl.student_id
inner join languages l on sl.language_id = l.id
where s.id = 4

-- 3. Récupérer la colonne langue et le nom de l’étudiant.e d’ID 5

select s.name, l.name
from students s
inner join favorites f on s.id = f.student_id
INNER join students_languages sl on f.student_id = sl.student_id
inner join languages l on sl.language_id = l.id
where s.id = 5

-- 4. Pour chaque étudiant.e.s (6), 
-- faîtes une requêtes pour récupérer le nombre de langues parlées par cet étudiant.e.s 
-- avec leurs noms et le nombres de langues

select s.name, COUNT (sl.student_id) "Nombre de langue parlée" 
from students s
inner join favorites f on s.id = f.student_id
INNER join students_languages sl on f.student_id = sl.student_id
inner join languages l on sl.language_id = l.id
group by s.name


-- ********************************************** BONUS *************************************************************

-- 1. Récupérer les étudiant.e.s qui ont un “e” dans leur prénom

select s.name
from students s
where s.name like "%e%"

-- 2. Récupérer le sport préférés des étudiant.e.s qui ont un “e” dans leur prénom

select s.name, f.sport
from students s
inner join favorites f on s.id = f.student_id
where s.name like "%e%"

-- 3. Récupérer la classe préférées des étudiant.e.s qui ont un “i” dans le nom de leur ville

select s.name, s.city, f.class
from students s
inner join favorites f on s.id = f.student_id
where s.city like "%i%"