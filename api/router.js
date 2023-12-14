const express = require('express')
const router = express.Router()
const controllerFactory = require('./util/controllerFactory')
const RoleMiddleware = require('./middlewares/roleMiddleware')
const Role = require('./util/role')


const controller = controllerFactory.getInstance()

router.get('/test', (req, res) => {
    res.send('this is /test')
});

router.get('/users/:id/courses', (req, res) => controller.getCourses(req, res));
router.get('/users/:id/courses/:id', (req, res) => controller.getCourse(req, res));
router.get('/users/:id', (req, res) => controller.getUserById(req, res));
router.patch("/users/:id/courses/:courseId", RoleMiddleware.attachRequiredRoles([Role.ADMIN]), controller.checkUserRole, controller.assignTeacher);
router.post("/users/:id/courses/:courseId", RoleMiddleware.attachRequiredRoles([Role.STUDENT]), controller.checkUserRole, controller.enroll);
router.get('/users/:id/enrolments', (req, res) => controller.getEnrolments(req, res));
router.patch("/users/:id/enrolments/:enrolmentId", (req, res) => controller.updateGrade(req, res));

router.get('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = router;
