# **# 32-A_Backend_avanzado_cine_API**

## api/v1/movies/

* POST Create movie

BODY:

{

  "title": "El Señor de los
Anillos: Los Anillos de Poder, Temporada 2",

  "director": [

    {

    "firstName":
"Charlotte",

    "lastName":
"Brändström",

    "bio": "Directora sueca
con un enfoque en la narración visual, ha trabajado en diversas series de
fantasía y dramas.",

    "birthDate":
"1972-03-24",

    "isActive": true

    },

    {

    "firstName": "J.A.",

    "lastName": "Bayona",

    "bio": "Director español
conocido por su trabajo en cine y televisión, famoso por su estilo visual único
y su narrativa emocional.",

    "birthDate":
"1975-05-09",

    "isActive": true

    }

  ],

  "releaseDate":
"2024-09-01",

  "rating": 9.0,

  "duration": 60,

  "genre": "Fantasy",

  "description": "La
continuación de la épica aventura en la Tierra Media, con nuevos desafíos y
héroes que deben enfrentarse a la oscuridad creciente.",

  "isActive": true

}

·
GET getMovies

·
GET getMovieByIdOrTitle

HTTP:

api/v1/movies/The
Lord of the Rings: The Fellowship of the Ring

·
PUT updateMovieById

HTTP:

api/v1/movies/66ff1d1212d51b1a9e837975

·
DEL deleteMovieById

HTTP:

api/v1/movies/6711884e1a21ff6987bbe208

## api/v1/movies/releaseDate/

·GET getMoviesByReleaseDate

HTTP:

api/v1/movies/releaseDate/2001-12-19T00:00:00.000Z

## api/v1/movies/rating/

·GET getMoviesByRating

HTTP:

/api/v1/movies/rating/8.8

## api/v1/movies/genre/

·GET getMoviesByGenre

HTTP:

api/v1/movies/genre/Fantasy

## **api/v1/users/register**

·POST register

BODY:

{

  "dni": "123456789",

  "names": "Fernando",

  "lastNames": "De Gante",

  "birthdate":
"1990-07-31",

  "role": "ADMIN",

  "phone":
"+1-555-555-1234",

  "email":
"admin2@example.com",

  "password": "admin123",

  "username":
"admin_Fer-De-Gante",

  "isActive": true,

  "lastLogin": null

}

## api/v1/users/login

·POST login

BODY:

{

    "email":
"admin2@example.com",

    "password":
"admin123"

}

## api/v1/tickets

BODY:

{

  "customerId":
"671294e3c3c7374a0d1cf2f9",

  "movieId":
"67117c1906b969956ca8a763",

  "quantity": 4,

  "ticketValue": 200,

  "showTime": "18:30",

  "showDate": "2024-10-20",

  "seats": "A12, A13",

  "room": "Sala 3"

}

HEADERS:

Authorization
Bearer
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NzEyOTRlM2MzYzczNzRhMGQxY2YyZjkiLCJyb2xlIjoiQ1VTVE9NRVIiLCJlbWFpbCI6ImZlcm5hbmRvLnNvdGVsb0BjdXN0b21lci5jb20iLCJpYXQiOjE3MjkyNzI5MTMsImV4cCI6MTcyOTg3NzcxM30._xQe_2-sDR8Vmrk08sm_4xLCTWEILNUJVX1TKnxFNyo

## api/v1/customers

·GET getTickets

AUTH

TOKEN:
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NzEyOTRlM2MzYzczNzRhMGQxY2YyZjkiLCJyb2xlIjoiQ1VTVE9NRVIiLCJlbWFpbCI6ImZlcm5hbmRvLnNvdGVsb0BjdXN0b21lci5jb20iLCJpYXQiOjE3MjkyODY3MjQsImV4cCI6MTcyOTg5MTUyNH0.JuSrX4c9F6jAd0HcRoBvxZwBzOjNaxiQAoaVyy_ctW8

PREFIX: Bearer

## api/v1/users/customers

·GET getCustomers

AUTH

TOKEN:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE5MWE0ZGI0ZTBlOGJlMjVlMTRjMmYiLCJyb2xlIjoiQURNSU4iLCJlbWFpbCI6ImFkbWluMkBleGFtcGxlLmNvbSIsImlhdCI6MTcyOTY5ODc5MiwiZXhwIjoxNzMwMzAzNTkyfQ.jK1MiiOzCBMEDpNEj3qqMjbWTkyva_5q08IZkFR6kWA

HEADERS

Authorization
Bearer
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE5MWE0ZGI0ZTBlOGJlMjVlMTRjMmYiLCJyb2xlIjoiQURNSU4iLCJlbWFpbCI6ImFkbWluMkBleGFtcGxlLmNvbSIsImlhdCI6MTcyOTY5ODc5MiwiZXhwIjoxNzMwMzAzNTkyfQ.jK1MiiOzCBMEDpNEj3qqMjbWTkyva_5q08IZkFR6kWA
