const isEmployee = (req, res, next) => {
  // Verificar si req.user está definido y tiene un rol
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: 'Access Denied: No role found' })
  }

  const userRole = req.user.role

  if (userRole === 'ADMIN' || userRole === 'EMPLOYEE') {
    return next() // Permitir acceso
  }

  // Si no tiene el rol adecuado, denegar acceso
  return res.status(403).json({ message: 'Access Denied: You do not have permission to access this resource' })
}

export default isEmployee
