const router = require("express").Router();
const FeedbackController = require("../controllers/FeedbackController");
const authentication = require("../middlewares/authentication");
const { userAuth } = require("../middlewares/authorization");

router.post("/create/:id", authentication, userAuth, FeedbackController.createFeedback);

module.exports = router;
