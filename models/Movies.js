import mongoose from 'mongoose'
/**
 * 1.- Crear un schema (esqueleto) ✅
 * 2.- Crear modelo, asignando un nombre ✅
 * 3.- Exportar el modelo ✅
 */
// Para poder registrar una película en el sistema se deberán ingresar los
// siguientes datos:
// ○ Título
// ○ Director
// ○ Fecha de lanzamiento
// ○ Calificación
// ○ Duración
// ○ Género
// ○ Descripción

// Se podrán consultar las películas existentes y se podrán filtrar por:
// ○ Título
// ○ Fecha de lanzamiento
// ○ Calificación
// ○ Género

const genreEnum = ['Fiction', 'Adult', 'Non-Fiction', 'Action', 'Adventure', 'Mystery', 'Horror', 'Romance', 'Fantasy', 'Science Fiction', 'Thriller', 'Drama', 'Comedy', 'Animation', 'Documentary', 'Family', 'Music', 'Crime', 'War', 'History', 'Western', 'TV Movie']
// Crée un array con los géneros de películas como en la clase

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true }], // Utilicé objectId para referenciar a Director como lo enseñado en la clase
  releaseDate: { type: Date, required: true }, // YYYY-MM-DD
  rating: { type: Number, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true, enum: genreEnum }, // Utilicé enum para limitar los géneros a los que se pueden asignar
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true }) // Agregar timeStraps createdAt updatedAt a cada documento
const Movie = mongoose.model('Movie', movieSchema)
export default Movie
