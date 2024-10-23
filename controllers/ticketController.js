import User from '../models/User.js'
import Ticket from '../models/Ticket.js'

// CREATE - Solo los usuarios con rol de CUSTOMER pueden comprar boletos
const createTicket = async (req, res) => {
  console.log('Request Body:', req.body) // Log del cuerpo de la solicitud
  console.log('User ID from Token:', req.userId) // Log del ID del usuario
  const { movieId, quantity, ticketValue, showTime, showDate, seats, room } = req.body
  const customerId = req.userId // Obtén el ID del usuario autenticado desde el middleware

  try {
    // Verifica si el usuario existe y si es CUSTOMER
    const user = await User.findById(customerId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.role !== 'CUSTOMER') {
      return res.status(403).json({ message: 'Only customers can buy tickets' })
    }

    // Calcular el valor total del ticket
    const totalValue = quantity * ticketValue

    // Validar y convertir showTime y showDate a objetos Date válidos
    const parsedShowTime = new Date(`1970-01-01T${showTime}:00`) // Añade una fecha ficticia para el tiempo
    const parsedShowDate = new Date(showDate) // Convierte el string showDate a objeto Date

    // Verificar si las conversiones de fechas son válidas
    if (isNaN(parsedShowTime.getTime())) {
      return res.status(400).json({ message: 'Invalid showTime format' })
    }
    if (isNaN(parsedShowDate.getTime())) {
      return res.status(400).json({ message: 'Invalid showDate format. It should be in YYYY-MM-DD format.' })
    }

    // Crear el ticket
    const newTicket = new Ticket({
      customer: customerId,
      movie: movieId,
      quantity,
      ticketValue,
      totalValue, // Valor total calculado
      ticketFolio: `TKT-${Date.now()}`, // Generar un folio único
      showTime: parsedShowTime,
      showDate: parsedShowDate,
      seats,
      room
    })

    const savedTicket = await newTicket.save()
    res.status(201).json(savedTicket)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ - Consultar historial de boletos comprados por el cliente autenticado
const getTickets = async (req, res) => {
  const customerId = req.userId // ID del usuario autenticado obtenido del token

  try {
    // Buscar todos los tickets del cliente autenticado
    const tickets = await Ticket.find({ customer: customerId })
      .populate('customer', 'names') // Mostrar los nombres del cliente
      .populate('movie', 'title') // Mostrar el título de la película

    res.status(200).json(tickets)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { createTicket, getTickets }
