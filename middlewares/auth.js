import jwt from 'jsonwebtoken'
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization // Obtén el encabezado 'Authorization'

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' }) // Error si no hay token
  }

  const token = authHeader.split(' ')[1] // Token en formato 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Token missing' }) // Error si el token está vacío
  }

  try {
    // Verifica el token usando tu JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Asigna los datos decodificados a req.user
    next() // Continúa con el siguiente middleware o ruta
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' }) // Si el token es inválido o caducado
  }
}

export default auth
