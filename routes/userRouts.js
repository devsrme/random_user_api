const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.route("/random").get(userControllers.getRandomUser);
router.route("/all").get(userControllers.getAllUsers);
router.route("/save").post(userControllers.postNewUser);
router.route("/update/:id").patch(userControllers.updateUser);
router.route("/delete/:id").delete(userControllers.deleteUser);
router.route("/bulk-update").patch(userControllers.updateMultipleUsers);

module.exports = router;
