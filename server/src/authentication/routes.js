const { Router } = require("express");
const router = Router();
const controller = require("./controller");
const validInfo = require("../middleware/validInfo");

router.post("/register", validInfo, controller.registerUser);
router.post("/login", validInfo, controller.loginUser); // will generate access and refresh token
router.get("/refresh_token", controller.refreshToken); // refresh token is a api to generate access token
router.delete("/logout", controller.logout);

module.exports = router;
