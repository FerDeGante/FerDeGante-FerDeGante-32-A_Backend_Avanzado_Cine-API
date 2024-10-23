import express from 'express'
import { createTicket, getTickets } from '../controllers/ticketController.js'
import isCustomer from '../middlewares/isCustomer.js' // Importación correcta

const router = express.Router()

// Ruta para crear un ticket (solo clientes autenticados pueden hacerlo)
router.post('/', isCustomer, createTicket)

// Ruta para obtener el historial de tickets del cliente autenticado
router.get('/', isCustomer, getTickets)

export default router
