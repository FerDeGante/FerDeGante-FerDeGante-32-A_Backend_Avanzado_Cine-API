import mongoose from 'mongoose'

// Definir las posibles salas en una enumeración
const roomEnum = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6', 'Sala 7', 'Sala 8', 'Sala 9', 'Sala 10']

// Definir el esquema del ticket
const ticketSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Cambiado de 'Customer' a 'User' para hacer referencia al modelo correcto
    required: true
  },
  quantity: { type: Number, required: true },
  ticketValue: { type: Number, required: true },
  totalValue: { type: Number, required: true }, // Se calculará automáticamente en el pre-save
  ticketFolio: { type: String, required: true, unique: true }, // Puede generarse automáticamente si no se pasa
  showTime: { type: Date, required: true }, // Usar Date en lugar de String para fechas
  showDate: { type: Date, required: true },
  seats: { type: String, required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  room: { type: String, required: true, enum: roomEnum },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

// Middleware para calcular el totalValue antes de guardar
ticketSchema.pre('save', function (next) {
  this.totalValue = this.quantity * this.ticketValue // Calcular el valor total basado en cantidad y valor por boleto
  if (!this.ticketFolio) {
    this.ticketFolio = `FOLIO-${Date.now()}` // Generar un folio único si no se pasa
  }
  next() // Continuar con el guardado
})

// Crear y exportar el modelo
const Ticket = mongoose.model('Ticket', ticketSchema)
export default Ticket
