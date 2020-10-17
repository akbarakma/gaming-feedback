const router = require("express").Router();
const FeedbackController = require("../controllers/FeedbackController");
const authentication = require("../middlewares/authentication");
const { userAuth } = require("../middlewares/authorization");

router.post("/create/:id", authentication, userAuth, FeedbackController.createFeedback);
router.put("/edit/:id", authentication, userAuth, FeedbackController.editFeedback);
router.delete("/delete/:id", authentication, userAuth, FeedbackController.deleteFeedback);
router.get("/games/:id", FeedbackController.getGameFeedback);

module.exports = router;
