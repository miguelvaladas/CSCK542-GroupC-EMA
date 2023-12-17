const express = require('express')
const router = express.Router()
const controllerFactory = require('./util/controllerFactory')
const RoleMiddleware = require('./middlewares/roleMiddleware')
const Role = require('./util/role')


const controller = controllerFactory.getInstance()


<<<<<<< HEAD
router.get('/users/:id/courses', (req, res) => controller.getCourses(req, res));
router.get('/users/:id/courses/:id', (req, res) => controller.getCourse(req, res));
router.get('/users/:id', (req, res) => controller.getUserById(req, res));
router.patch("/users/:id/courses/:courseId/", RoleMiddleware.attachRequiredRoles([Role.ADMIN]), controller.checkUserRole, controller.updateCourse);
router.post("/users/:id/courses/:courseId", RoleMiddleware.attachRequiredRoles([Role.STUDENT]), controller.checkUserRole, controller.enroll);
router.get('/users/:id/enrolments', (req, res) => controller.getEnrolments(req, res));
router.patch("/users/:id/enrolments/:enrolmentId", (req, res) => controller.updateGrade(req, res));
=======
router.get('/user/:id/courses', controller.getCourses);
router.get('/user/:id/courses/:courseId', controller.getCourse);
router.get('/user/:id/users/:userId', controller.getUserById);
router.patch("/user/:id/courses/:courseId/", RoleMiddleware.attachRequiredRoles([Role.ADMIN]), controller.checkUserRole, controller.updateCourse);
router.post("/user/:id/courses/:courseId", RoleMiddleware.attachRequiredRoles([Role.STUDENT]), controller.checkUserRole, controller.createEnrolment);
router.get('/user/:id/enrolments', RoleMiddleware.attachRequiredRoles([Role.ADMIN, Role.TEACHER]), controller.checkUserRole, controller.getEnrolments);
router.patch("/user/:id/enrolments/:enrolmentId", RoleMiddleware.attachRequiredRoles([Role.TEACHER]), controller.checkUserRole, controller.updateMark);
>>>>>>> 531ca6b07328752395a8e104b3b8c79e501b6921

router.get('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = router;
