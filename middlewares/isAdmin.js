const isAdmin = (req, res, next) => {
  if (req.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Unauthorized' })
  }
  next()
}
export { isAdmin }
