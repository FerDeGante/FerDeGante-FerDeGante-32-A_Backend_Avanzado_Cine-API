import mongoose from 'mongoose'
/**
 * 1.- Crear un schema (esqueleto) ✅
 * 2.- Crear modelo, asignando un nombre ✅
 * 3.- Exportar el modelo ✅
 */
const directorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: String,
  birthDate: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timeStamps: true }) // Agregar tomeStraps createdAt updatedAt a cada documento

const Director = mongoose.model('Director', directorSchema)

export default Director
