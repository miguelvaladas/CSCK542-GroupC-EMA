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
            return await this.dao.assignTeacher(data.TeacherID, courseId);
        }
        if ("isAvailable" in data) {
            return await this.dao.availCourse(courseId, data.isAvailable);
        }
    }

    async enroll(courseId, userId) {
        const course = await this.dao.getCourseById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        await this.dao.enroll(courseId, userId);
    }

    async getEnrolments() {
        return await this.dao.returnEnrolments();
    }

    async updateGrade(mark, enrolmentId, userId) {
        const user = await this.dao.getUserById(userId);
        if (!user || user.roleId !== Role.TEACHER) {
            throw new Error(`User does not have permission`);
        }
        console.log("mark:" + mark)
        console.log("enrolmentId:" + enrolmentId)
        console.log("teacherID:" + userId)
        await this.dao.updateGrade(mark, enrolmentId, userId);
    }
}


module.exports = Service;
