const { Router } = require("express");
const router = Router();
const controller = require("./controller");

router.post("/register", controller.registerUser);
router.get("/login", controller.loginUser);

module.exports = router;
