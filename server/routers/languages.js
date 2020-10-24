const router = require("express").Router();
const LanguageController = require("../controllers/LanguageController");

router.get("/games", LanguageController.getAllLanguages);
router.get("/games/:name", LanguageController.getGameLanguage);

module.exports = router;
