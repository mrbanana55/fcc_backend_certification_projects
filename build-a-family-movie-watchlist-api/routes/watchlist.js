import express from "express"
import { authenticate } from "../middleware/authenticate.js"
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js"
import { authorizeModification } from "../middleware/authorize.js"


const router = express.Router()
router.use(authenticate)


router.get("/:userId", (req, res)=>{
    const watchlist = getWatchlist(Number(req.params.userId))
    res.status(200).json({watchlist})
})

router.post('/:userId/movies', authorizeModification, (req, res)=>{
    const movieData = req.body
    addMovie(Number(req.params.userId), movieData)
    res.status(201).json({message: "Added successfully"})
})

router.put('/:userId/movies/:movieId', authorizeModification, (req, res)=>{
    const userId = req.params.userId;
    const movieId = req.params.movieId
    updateMovie(userId, movieId, req.body.updates)
    res.status(200).json({message: "Successful update"})
})

//DELETE
router.delete('/:userId/movies/:movieId', authorizeModification, (req, res)=>{
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    deleteMovie(userId, movieId)
    res.status(200).json({message: "Successful delete"})
})

export default router