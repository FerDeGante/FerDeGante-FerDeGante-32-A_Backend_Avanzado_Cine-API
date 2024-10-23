// Se podrán consultar las películas existentes y se podrán filtrar por:
// ○ Título
// ○ Fecha de lanzamiento
// ○ Calificación
// ○ Género
// ● También se podrán consultar los clientes que existan en el sistema.
// ● Se puede consultar el historial de boletos comprados.

import Director from '../models/Director.js'
import Movie from '../models/Movies.js'
// CREATE
const createMovie = async (req, res) => {
  const movieData = req.body
  try {
    const directorModels = await Promise.all(
      movieData.director.map(async (director) => {
        const existingDirector = await Director.findOne({
          firstName: director.firstName,
          lastName: director.lastName,
          birthDate: director.birthDate
        })

        if (existingDirector) {
          return existingDirector
        }

        const newDirector = new Director(director)
        return await Director.create(newDirector)
      })
    )

    movieData.director = directorModels.map(director => director._id)
    const newMovie = await Movie.create(movieData)
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Se pueden consultar las películas existentes y se podrán filtrar por:
// ○ Título
// ○ Fecha de lanzamiento
// ○ Calificación
// ○ Género
// READ - Obtener todas las películas activas
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true }).populate('director')
    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ - Obtener una película por ID o título
// Valido si el parámetro es un ID o un título
const getMovieByIdOrTitle = async (req, res) => {
  const identifier = req.params.movieIdOrTitle
  let query = {}

  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    query = { _id: identifier, isActive: true }
  } else {
    query = { title: identifier, isActive: true }
  }

  try {
    const movie = await Movie.findOne(query).populate('director')
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ películas por Fecha de lanzamiento
const getMoviesByReleaseDate = async (req, res) => {
  try {
    // Convertir la fecha de la URL en un objeto Date
    const releaseDate = new Date(req.params.releaseDate)

    // Asegúrate de que la fecha es válida
    if (isNaN(releaseDate.getTime())) {
      return res.status(400).json({ message: 'Invalid release date format' })
    }

    // Buscar las películas que coincidan con la fecha y que estén activas
    const movies = await Movie.find({ releaseDate, isActive: true }).populate('director')

    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for this release date' })
    }

    return res.status(200).json(movies)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// READ películas por Calificación
const getMoviesByRating = async (req, res) => {
  try {
    // Convertir el rating de la URL a un número
    const rating = parseFloat(req.params.rating)

    // Validar si el rating es un número
    if (isNaN(rating)) {
      return res.status(400).json({ message: 'Invalid rating format' })
    }

    // Buscar las películas que coincidan con la calificación y que estén activas
    const movies = await Movie.find({ rating, isActive: true }).populate('director')

    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found with this rating' })
    }

    return res.status(200).json(movies)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// READ películas por Género
const getMoviesByGenre = async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre, isActive: true }).populate('director')
    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// UPDATE (Actualizar una película)
const updateMovieById = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true })
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    res.status(200).json(updatedMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE (Soft delete)
const deleteMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movieId)

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.status(200).json({ message: 'Movie deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export {
  createMovie,
  getMovies,
  getMovieByIdOrTitle,
  getMoviesByReleaseDate,
  getMoviesByRating,
  getMoviesByGenre,
  updateMovieById,
  deleteMovieById
}
