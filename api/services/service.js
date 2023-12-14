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
        if (user[0].roleId === Role.STUDENT) {
            return await this.dao.getAvailableCourses();

        } else {
            return await this.dao.getCourses();
        }
    }

    async getCourse(id) {
        return await this.dao.getCourseById(id);
    }

    async assignTeacher(courseId, teacherId) {
        const course = await this.dao.getCourseById(courseId);
            if (!course[0]) {
                throw new Error('Course not found');
            }
        await this.dao.assignTeacher(teacherId, courseId);
    }


    async enroll(courseId, userId) {
        const course = await this.dao.getCourseById(courseId);

        if (!course[0]) {
            throw new Error('Course not found');
        }
        await this.dao.enroll(courseId, userId);
    }

  async updateGrade(Mark, EnrolmentID, userID) {
    try {
      
      const user = await this.dao.getUserById(userID);
      const enrolment = await this.dao.getEnrolmentById(EnrolmentID); 
  
      if (enrolment[0].TeacherID !== userID) {
        throw new Error('Current teacher does not have permission to update grades for this enrolment');
      }
  
      await this.dao.updateGrade(Mark, EnrolmentID, userID);
    } catch (error) {
      console.error('Error in updateGrade', error);
      throw error;
    }
  }
}

module.exports = Service;
