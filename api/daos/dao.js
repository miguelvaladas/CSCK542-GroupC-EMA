
// Data Access Object - Responsible for Accessing Database data
const {Connection} = require("mysql2/typings/mysql/lib/Connection");
const {createConnection} = require("mysql2");

class Dao {

    async getCourseById(id) {

    }

    async updateCourse(id, course) {

    }

    async getAllCourses() {

    }

    async createEnrolment(enrolment){

    }

    async updateEnrolment(id, enrolment) {

    }

}

module.exports = Dao;