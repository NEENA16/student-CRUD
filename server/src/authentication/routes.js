const { Router } = require("express");
const router = Router();
const controller = require("./controller");
const validInfo = require("../middleware/validInfo");

router.post("/register", validInfo, controller.registerUser);
router.post("/login", validInfo, controller.loginUser);

module.exports = router;
