const router = require("express").Router();
const users = require("./users");
const games = require("./games");

router.use("/users", users);
router.use("/games", games);

module.exports = router;
