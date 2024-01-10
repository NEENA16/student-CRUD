const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../middleware/authorize");
const router = Router();

router.get("/search", controller.searchStudent);
router.get("/", authenticate, controller.getStudents); //allow only authticated users

// to send token in api request, in postman  in headers add a key as 'Authorization' its value as Bearer 'a valid token that we get from login'
router.get("/:id", controller.getStudentById);
router.post("/", controller.createStudent);
router.delete("/:id", controller.deleteStudent);
router.put("/:id", controller.updateStudent);

module.exports = router;
