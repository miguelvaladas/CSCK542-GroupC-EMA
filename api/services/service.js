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
        if ("TeacherID" in data) {
<<<<<<< HEAD
          return await this.dao.assignTeacher(data.TeacherID, courseId);
        }
        if ("isAvailable" in data || data.isAvailable === 1) {
          return await this.dao.availCourse(courseId);
     }
        if ("isAvailable" in data || data.isAvailable === 0) {
          return await this.dao.unAvailCourse(courseId);
      }
        }

    async enroll(courseId, userId) {
        const course = await this.dao.getCourseById(courseId);

        if (!course) {
            throw new Error('Course not found');
=======
            return await this.dao.assignTeacher(data.TeacherID, courseId);

        } else if ("isAvailable" in data) {
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
>>>>>>> 531ca6b07328752395a8e104b3b8c79e501b6921
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
<<<<<<< HEAD
  }

=======
}
>>>>>>> 531ca6b07328752395a8e104b3b8c79e501b6921


module.exports = Service;
