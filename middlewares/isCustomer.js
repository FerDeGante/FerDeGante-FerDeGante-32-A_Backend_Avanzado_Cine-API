import jwt from 'jwt-simple'
import User from '../models/User.js' // Asegúrate de ajustar la ruta según tu estructura

const isCustomer = async (req, res, next) => {
  const userHeader = req.headers.authorization
  console.log('Authorization Header:', userHeader)

  if (!userHeader) {
    return res.status(401).json({ message: 'Authorization Header is required' })
  }

  const [bearer, token] = userHeader.split(' ')
  console.log('Bearer:', bearer)
  console.log('Token:', token)

  if (bearer !== 'Bearer') {
    return res.status(400).json({ message: 'Invalid Authorization Header' })
  }

  if (!token) {
    return res.status(400).json({ message: 'Token is required' })
  }

  try {
    const payload = jwt.decode(token, process.env.SECRET)
    console.log('Decoded Payload:', payload)

    // Busca el usuario en la base de datos usando el ID del payload
    const user = await User.findById(payload.userId) // Asegúrate de usar el campo correcto del payload

    // Verifica si el usuario fue encontrado
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Asignar el rol y el ID de usuario al request
    req.role = user.role // Asegúrate de que `role` existe en tu modelo
    req.userId = user._id // Asignar el ID del usuario al request

    // Continúa al siguiente middleware
    next()
  } catch (error) {
    console.error('Token error:', error)
    return res.status(403).json({ message: 'Token error', error: error.message })
  }
}

export default isCustomer
