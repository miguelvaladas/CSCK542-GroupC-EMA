class Controller {

    constructor(service) {
        this.service = service;
    }

    checkUserRole = async (req, res, next) => {
        try {
            const userId = req.params.id;
            const allowedRoles = req.allowedRoles;
            await this.service.verifyUserRole(userId, allowedRoles);
            next(); // User has the required role, proceed
        } catch (error) {
            res.status(403).send(error.message);
            console.error(error)
        }
    }

    getUserById = async (req, res) => {
        try {
            const id = req.params.userId;
            const user = await this.service.getUserById(id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    getCourses = async (req, res) => {
        try {
            const userId = req.params.id;
            const courses = await this.service.getCourses(userId);
            if (!courses) {
                return res.status(404).send('Courses not found');
            }
            res.json(courses);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    getCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const course = await this.service.getCourse(courseId);
            if (course === undefined) {
                return res.status(404).send('Course not found');
            }
            res.json(course);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    updateCourse = async (req, res) => {
        try {
            const data = req.body
            const courseId = req.params.courseId;
            await this.service.updateCourse(data, courseId);
            res.send(`Course has been updated`);

        } catch (error) {
            if (error.message === 'Course not found') {
                res.status(404).send(error.message);
            } else if (error.message === 'User does not have permission') {
                res.status(403).send(error.message);
            } else {
                res.status(500).send(error.message);

            }
        }
    }

    enroll = async (req, res) => {
        try {
            const courseID = req.params.courseId;
            const id = req.params.id;
            const user = await this.service.getUserById(id);
            const course = await this.service.getCourse(courseID);
            if (!user) {
                return res.status(404).send('User not found');
            }
            await this.service.enroll(courseID, id);
            res.send(`student ${user.name} has been enrolled in course ${course.title}`);

        } catch (error) {
            if (error.message === 'Course not found') {
                res.status(404).send(error.message);
            } else if (error.message === 'User does not have permission') {
                res.status(403).send(error.message);
            } else {
                res.status(500).send(error.message);
            }
        }
    }

    getEnrolments = async (req, res) => {
        try {
            const enrolments = await this.service.getEnrolments();
            if (!enrolments) {
                return res.status(404).send('Enrolments not found');
            }
            res.json(enrolments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    updateMark = async (req, res) => {
        try {
            const id = req.params.id;
            const mark = req.body.Mark;
            const enrolmentId = req.params.enrolmentId;
            await this.service.updateMark(mark, enrolmentId, id);
            res.send(`Mark has been updated`);

        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}


module.exports = Controller;
