// Responsible for handling requests
class Controller {

    constructor(service) {
        this.service = service;
    }

    async getCourse(req, res) {
        try {
            const id = req.params.id;
            const course = await this.service.getCourse(id);
            if (!course) {
                return res.status(404).send('Course not found');
            }
            res.json(course);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getCourses(req, res) {
        try {
            const courses = await this.service.getCourses();
            res.json(courses);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateCourse(req, res) {
        try {
            const id = req.params.id;
            const courseData = req.body;
            const updatedCourse = await this.service.updateCourse(id, courseData);
            res.json(updatedCourse);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async createEnrolment(req, res) {
        try {
            const body = req.body;
            const enrolment = await this.service.createEnrolment(body);
            res.status(201).json(enrolment);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateEnrolment(req, res) {
        try {
            const enrolmentId = req.params.id;
            const enrolmentUpdates = req.body;
            const updatedEnrolment = await this.service.updateEnrolment(enrolmentId, enrolmentUpdates);
            res.json(updatedEnrolment);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = Controller;