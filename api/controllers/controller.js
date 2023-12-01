class Controller {

  constructor(service) {
      this.service = service;
  }

  async getUserbyId(req, res) {
    try {
      const id = req.params.id;
      const user = await this.service.getUserById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch(error) {
      res.status(500).send(error.message);
    }
  }

  async getCourses(req, res) {
    try {
        const courses = await this.service.getCourses();
        if (!courses) {
            return res.status(404).send('Courses not found');
        }
        res.json(courses);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

  async getCourse(req, res) {
      try {
          const id = req.params.id;
          const course = await this.service.getCourse(id);
          if (!course[0]) {
              return res.status(404).send('Course not found');
          }
          res.json(course);
      } catch (error) {
          res.status(500).send(error.message);
      }
  }

  async assignTeacher(req, res) {
    try {
        const teacherId = req.body.TeacherID;
        const courseId = req.params.courseid;
        const userId = req.params.id;
        const teacher = await this.service.getUserById(teacherId);
        await this.service.assignTeacher(courseId, teacherId, userId);
        res.send(`Course has been assigned to teacher ${teacher.name}`);
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

      async enroll(req, res) {
        try {
            const courseID = req.params.courseid;
            const id = req.params.id;
            const user = await this.service.getUserById(id);
            const course = await this.service.getCourse(courseID);
            if (!user[0]) {
                return res.status(404).send('User not found');
            }
            await this.service.enroll(courseID, id);
            res.send(`student ${user[0].name} has been enrolled in course ${course[0].title}`); // Use 'user[0].Name'

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

    async getEnrolments(req, res) {
      try {
        const enrolments = await this.service.getEnrolments();
        if (!enrolments) {
          return res.status(404).send('Enrolments not found');
        }
        res.json(enrolments);
      } catch(error) {res.status(500).send(error.message);
    }
  }
}
module.exports = Controller;
