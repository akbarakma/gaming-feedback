const router = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", authentication, UserController.getProfile);
router.put("/profile/edit", authentication, UserController.editProfile);
router.get("/profile/:id", UserController.getUserProfile);
router.get("/follow/:id", authentication, UserController.followUser);
router.get("/unfollow/:id", authentication, UserController.unfollowUser);
router.get("/developer/games/:id", UserController.getDeveloperGames);

module.exports = router;
