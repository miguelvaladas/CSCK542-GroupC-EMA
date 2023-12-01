const express = require('express')
const router = express.Router()
const controllerFactory = require('./util/controllerFactory')


const controller = controllerFactory.getInstance()

router.get('/courses/:id', (req, res) => controller.getCourse(req, res));


module.exports = router;