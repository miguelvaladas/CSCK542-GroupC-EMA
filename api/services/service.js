const Role = require('../util/role')

class Service {

    constructor(dao) {
        this.dao = dao;
    }

    async verifyUserRole(userId, allowedRoles) {
        const user = await this.dao.getUserById(userId);
        if (!user || !allowedRoles.includes(user[0].roleId)) {
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

    async getEnrolments() {
        return await this.dao.returnEnrolments();
    }

    async updateGrade(Mark, EnrolmentID, userID) {
        const user = await this.dao.getUserById(userID);
        if (!user[0] || user[0].roleId !== Role.TEACHER) {
            throw new Error(`User does not have permission`);
        }
        await this.dao.updateGrade(Mark, EnrolmentID);
    }
}

module.exports = Service;
