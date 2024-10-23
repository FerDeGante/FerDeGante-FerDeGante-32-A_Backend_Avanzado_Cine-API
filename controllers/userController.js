import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar que el email y la contraseña estén presentes
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required' })
    }

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // Encriptar la contraseña
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Crear al usuario con la contraseña encriptada
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    })

    // Guardar al nuevo usuario en la base de datos
    await newUser.save()

    return res.status(201).json({ message: 'User Created', user: newUser })
  } catch (error) {
    return res.status(500).json({ message: 'Error Creating User', error: error.message })
  }
}

// Login
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' })
  }

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or Password' })
    }

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Email or Password' })
    }

    // Generar el token JWT si la contraseña es válida
    const payload = {
      userId: user._id,
      role: user.role,
      email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.status(200).json({ message: 'User Logged In', token })
  } catch (error) {
    return res.status(500).json({ message: 'Error Logging In', error: error.message })
  }
}

// Obtener lista de clientes (solo accesible por empleados/admin)
const getCustomers = async (req, res) => {
  try {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user authenticated' })
    }

    const userRole = req.user.role
    if (userRole !== 'ADMIN' && userRole !== 'EMPLOYEE') {
      return res.status(403).json({ message: 'Access Denied: You do not have permission to access this resource' })
    }

    // Obtener la lista de clientes
    const customers = await User.find({ role: 'CUSTOMER' })
    return res.status(200).json(customers)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export { register, login, getCustomers }
