const router = require("express").Router();
const GenreController = require("../controllers/GenreController");

router.get("/games", GenreController.getAllGenres);
router.get("/games/:name", GenreController.getGameGenre);

module.exports = router;
