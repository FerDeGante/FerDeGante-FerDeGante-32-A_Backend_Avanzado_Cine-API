import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config() // Leer las variables de entorno

const connect = async () => {
  try {
    // Intentamos conectarnos a la base de datos sin las opciones deprecadas
    await mongoose.connect(process.env.DB_CONNECT_URI)

    const { connection } = mongoose // Traemos la conexión de Mongoose

    // Cuando se abra la conexión con éxito
    connection.once('open', () => {
      console.log('🟢 DB Connection Successful')
    })

    // En caso de error en la conexión
    connection.on('error', (error) => {
      console.error('❌ DB Connection Error:', error)
    })
  } catch (error) {
    console.error('❌ Error in DB connection:', error.message)
    process.exit(1) // Detenemos el proceso si no logramos conectar a la DB
  }
}

export { connect }
