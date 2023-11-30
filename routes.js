import express from 'express';
import * as controller from './controller.js'

//initialize router
const router = express.Router();


router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.get("/users/:id/courses", controller.getCourses);
router.get("/users/:id/courses/:courseid", controller.getCourseById);
router.put("/users/:id/courses/:courseid", controller.toggleAvailable);
router.patch("/users/:id/courses/:courseid", controller.assignTeacher);
router.post("/users/:id/courses/:courseid", controller.enroll);
router.get("/users/:id/enrolments/", controller.getEnrolments);
router.patch("/users/:id/enrolments/:enrolmentid", controller.updateGrade);



export default router;
