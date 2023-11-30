
// Responsible for encapsulating the business logic
class Service {

    constructor(dao) {
        this.dao = dao;
    }
    
    async getCourse(id) {
        return await this.dao.getCourseById(id);
    }

    async getCourses() {
        return await this.dao.getAllCourses();
    }

    async updateCourse(id, course) {
        return await this.dao.updateCourse(id, course);
    }

    async createEnrolment(enrolment) {
        return await this.dao.createEnrolment(enrolment);
    }

    async updateEnrolment(id, enrolment) {
        return await this.dao.updateEnrolment(id, enrolment);
    }

}

module.exports = Service;