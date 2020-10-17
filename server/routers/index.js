const router = require("express").Router();
const users = require("./users");
const games = require("./games");
const categories = require("./categories");
const genres = require("./genres");
const languages = require("./languages");

router.use("/users", users);
router.use("/games", games);
router.use("/categories", categories);
router.use("/genres", genres);
router.use("/languages", languages);

module.exports = router;
