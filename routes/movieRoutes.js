import express from 'express'
import {
  getMovies,
  getMovieByIdOrTitle,
  createMovie,
  getMoviesByReleaseDate,
  getMoviesByRating,
  getMoviesByGenre,
  updateMovieById,
  deleteMovieById
} from '../controllers/movieController.js'

const router = express.Router()

router.get('/', getMovies) // Ruta para obtener todas las películas
router.get('/:movieIdOrTitle', getMovieByIdOrTitle)
router.post('/', createMovie)
router.get('/releaseDate/:releaseDate', getMoviesByReleaseDate)
router.get('/rating/:rating', getMoviesByRating)
router.get('/genre/:genre', getMoviesByGenre)
router.put('/:movieId', updateMovieById)
router.delete('/:movieId', deleteMovieById)

export default router
