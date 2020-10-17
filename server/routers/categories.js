const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/games", CategoryController.getAllCategories);
router.get("/games/:name", CategoryController.getGameCategory);

module.exports = router;
