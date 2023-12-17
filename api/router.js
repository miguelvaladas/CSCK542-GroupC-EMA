const express = require('express')
const router = express.Router()
const controllerFactory = require('./util/controllerFactory')
const RoleMiddleware = require('./middlewares/roleMiddleware')
const Role = require('./util/role')


const controller = controllerFactory.getInstance()


router.get('/user/:id/courses', controller.getCourses);
router.get('/user/:id/courses/:courseId', controller.getCourse);
router.get('/user/:id/users/:userId', controller.getUserById);
router.patch("/user/:id/courses/:courseId/", RoleMiddleware.attachRequiredRoles([Role.ADMIN]), controller.checkUserRole, controller.updateCourse);
router.post("/user/:id/courses/:courseId", RoleMiddleware.attachRequiredRoles([Role.STUDENT]), controller.checkUserRole, controller.createEnrolment);
router.get('/user/:id/enrolments', RoleMiddleware.attachRequiredRoles([Role.ADMIN, Role.TEACHER]), controller.checkUserRole, controller.getEnrolments);
router.patch("/user/:id/enrolments/:enrolmentId", RoleMiddleware.attachRequiredRoles([Role.TEACHER]), controller.checkUserRole, controller.updateMark);

router.get('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = router;
