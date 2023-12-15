const express = require('express')
const router = express.Router()
const controllerFactory = require('./util/controllerFactory')
const RoleMiddleware = require('./middlewares/roleMiddleware')
const Role = require('./util/role')


const controller = controllerFactory.getInstance()


router.get('/user/:id/courses', (req, res) => controller.getCourses(req, res));
router.get('/user/:id/courses/:courseId', RoleMiddleware.attachRequiredRoles([Role.ADMIN, Role.TEACHER]), controller.checkUserRole, controller.getCourse);
router.get('/user/:id/users/:userId', (req, res) => controller.getUserById(req, res));
router.patch("/user/:id/courses/:courseId/", RoleMiddleware.attachRequiredRoles([Role.ADMIN]), controller.checkUserRole, controller.updateCourse);
router.post("/user/:id/courses/:courseId", RoleMiddleware.attachRequiredRoles([Role.STUDENT]), controller.checkUserRole, controller.enroll);
router.get('/user/:id/enrolments', RoleMiddleware.attachRequiredRoles([Role.ADMIN, Role.TEACHER]), controller.checkUserRole, controller.getEnrolments);
router.patch("/user/:id/enrolments/:enrolmentId", RoleMiddleware.attachRequiredRoles([Role.TEACHER]), controller.checkUserRole, controller.updateGrade);

router.get('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = router;
