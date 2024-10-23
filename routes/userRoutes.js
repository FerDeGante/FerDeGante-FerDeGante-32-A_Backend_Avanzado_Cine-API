import express from 'express'
import { register, login, getCustomers } from '../controllers/userController.js'
import auth from '../middlewares/auth.js' // Importa el middleware de autenticación
import isEmployee from '../middlewares/isEmployee.js'

const userRoutes = express.Router()

// Rutas de autenticación
userRoutes.post('/register', register)
userRoutes.post('/login', login)

// Ruta protegida para consultar clientes, solo accesible por empleados y admin
userRoutes.get('/customers', auth, isEmployee, getCustomers) // Primero auth, luego isEmployee

export default userRoutes
