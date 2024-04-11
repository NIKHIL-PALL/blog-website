const express = require("express");
const UserController = require("../contollers/UserController");
const router = express.Router();


router.get('/', UserController.getAllUsers);
router.get("/:uid", UserController.getUserById);
router.post("/login",UserController.login );

router.post("/signup", UserController.signup);

module.exports = router;
