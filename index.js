import express from 'express'
import { connect } from './config/database.js'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json()) // Middleware para parsear JSON

// Rutas de la API
app.use('/api/v1/movies', movieRoutes)
app.use('/api/v1/users', userRoutes) // Mantenlo, pero elimina la línea duplicada
app.use('/api/v1/tickets', ticketRoutes) // Ruta de tickets

// Conectar a la base de datos y levantar el servidor
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT} 🚀`)
  })
}).catch((error) => {
  console.error('Error connecting to the database:', error)
})
