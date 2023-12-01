const express = require('express')
const router = express.Router()
const controllerFactory = require('./util/controllerFactory')


const controller = controllerFactory.getInstance()

router.get('/test', (req, res) => {
  res.send('this is /test')
});

router.get('/courses', (req, res) => controller.getCourses(req, res));
router.get('/courses/:id', (req, res) => controller.getCourse(req, res));
router.get('/users/:id', (req, res) => controller.getUserbyId(req, res));
router.patch("/users/:id/courses/:courseid", (req, res) => controller.assignTeacher(req, res));
router.post("/users/:id/courses/:courseid", (req, res) => controller.enroll(req, res));
router.get('/enrolments', (req, res) => controller.getEnrolments(req, res));

router.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;
