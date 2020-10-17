const router = require("express").Router();
const GameController = require("../controllers/GameController");
const authentication = require("../middlewares/authentication");
const { developerAuth, gameDevAuth } = require("../middlewares/authorization");

router.post("/create", authentication, developerAuth, GameController.createGame);
router.get("/all", GameController.getAllGame);
router.get("/single/:id", GameController.getSingleGame);
router.put("/edit/:id", authentication, developerAuth, gameDevAuth, GameController.editGame);
router.delete("/delete/:id", authentication, developerAuth, gameDevAuth, GameController.deleteGame);

module.exports = router;
