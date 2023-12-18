const Role = require('../util/role')

class Service {

    constructor(dao) {
        this.dao = dao;
    }

    async verifyUserRole(userId, allowedRoles) {
        const user = await this.dao.getUserById(userId);
        if (!user || !allowedRoles.includes(user.roleId)) {
            throw new Error('Access denied, user does not have permission');
        }
        return true;
    }

    async getUserById(id) {
        return await this.dao.getUserById(id);
    }

    async getCourses(userId) {
        const user = await this.dao.getUserById(userId);
        if (user.roleId === Role.STUDENT) {
            return await this.dao.getAvailableCourses();

        } else {
            return await this.dao.getCourses();
        }
    }

    async getCourse(id) {
        return await this.dao.getCourseById(id);
    }

    async updateCourse(data, courseId) {
      const course = await this.dao.getCourseById(courseId)
      if (!course) {
        return res.status(404).send('Course not found');}
        if ("TeacherID" in data) {
            return await this.dao.assignTeacher(data.TeacherID, courseId);

        } else if ("isAvailable" in data ) {
          this.checkDataValidity(data)
            return await this.dao.updateCourseAvailability(courseId, data.isAvailable);

        } else {
            throw new Error(`Invalid input. Please use "isAvailable" or "TeacherID" in the request body, for example:
            {
              "TeacherID" : 5
            }
                OR
            {
              "isAvailable" : 1
            }
            `);
        }
    }
    checkDataValidity (data) {
      const value = Object.values(data)
      if (value != 1 && value != 0) {
        throw new Error("invalid input, please use either 1 or 0")
      }
    }


    async createEnrolment(courseId, userId) {
        await this.dao.createEnrolment(courseId, userId);
    }

    async getEnrolments() {
        return await this.dao.getEnrolments();
    }

    async updateMark(mark, enrolmentId, userId) {
        if (mark === undefined) { //make sure the user knows what to pass in the req.body
            throw new Error(`Invalid input. Please use "Mark" in the request body, for example:
        {
          "Mark": 5

        }
        `);
        }

        const user = await this.dao.getUserById(userId);
        if (!user || user.roleId !== Role.TEACHER) {
            throw new Error(`User does not have permission`);
        }
        await this.dao.updateMark(mark, enrolmentId, userId);
    }
}


module.exports = Service;
