import mongoose from 'mongoose'
/**
 * 1.- Crear un schema (esqueleto) ✅
 * 2.- Crear modelo ✅
 * 3.- Exportar el modelo ✅
 */
// ● Existen 3 roles en el sistema: ADMIN, EMPLOYEE, CUSTOMER.
// ● Para poder registrar a un usuario en el sistema se deberán ingresar los
// siguientes datos:
// ○ DNI
// ○ Nombres
// ○ Apellidos
// ○ Fecha de nacimiento
// ○ Rol
// ○ Teléfono
// ○ Correo
// ○ Contraseña
// ○ Username
// ○ isActive
// ○ createdAt
// ○ updatedAt
// ○ lastLogin

const userSchema = new mongoose.Schema({
  dni: { type: String, required: true },
  names: { type: String, required: true },
  lastNames: { type: String, required: true },
  birthdate: { type: Date, required: true }, // YYYY-MM-DD
  role: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'],
    default: 'CUSTOMER',
    required: true
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: null }
}, { timestamps: true })
const User = mongoose.model('User', userSchema)

export default User
