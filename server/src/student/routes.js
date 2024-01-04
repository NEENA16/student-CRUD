const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/search",controller.searchStudent)
router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.post("/", controller.createStudent);
router.delete("/:id", controller.deleteStudent);
router.put("/:id", controller.updateStudent);

module.exports = router;
