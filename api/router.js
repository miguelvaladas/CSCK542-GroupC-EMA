const express = require('express')
const router = express.Router()
const controllerFactory = require('/util/controllerFactory')


const controller = controllerFactory.getInstance()

router.get('/courses/:id', (req, res) => controller.getCourse(req, res));
router.put('/courses/:id', (req, res) => controller.updateCourse(req, res));
router.get('/courses/', (req, res) => controller.getCourses(req, res));

router.post('/enrolment/', (req, res) => controller.createEnrolment(req, res));
router.put('/enrolment/:id', (req, res) => controller.updateEnrolment(req, res));


module.exports = router;