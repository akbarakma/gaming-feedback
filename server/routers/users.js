const router = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", authentication, UserController.getProfile);
router.put("/profile/edit", authentication, UserController.editProfile);
router.get("/profile/:id", authentication, UserController.getUserProfile);

module.exports = router;
