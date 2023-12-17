const mysql = require('mysql2/promise');
const mappers = require("../util/mappers");


class Dao {

    constructor() {
        this.databaseConnection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    }

    async getCourses() {
        try {
            const [rows] = await this.databaseConnection.query('SELECT * FROM courses');
            return rows.map(mappers.mapToCourse);
        } catch (error) {
            console.error('Error in getCourses', error);
            throw error;
        }
    }

    async getAvailableCourses() {
        try {
            const [rows] = await this.databaseConnection.query('SELECT courses.Title, users.Name AS TeacherName FROM courses, users WHERE users.UserID = courses.TeacherID AND courses.isAvailable = 1');
            return rows.map(mappers.mapToAvailableCourseDto); // uses DTO mapper as the data returns is from 2 tables in the database that have been joined
        } catch (error) {
            console.error('Error in getAvailableCourses', error);
            throw error;
        }
    }

    async getCourseById(id) {
        try {
            const result = await this.databaseConnection.query('SELECT * FROM courses WHERE CourseID = ?', [id]);
            const course = result[0][0]
            if (course === undefined) {
                throw new Error("Course not found")
            }
            return mappers.mapToCourse(course);

        } catch (error) {
            console.error('Error in getCourseById:', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const result = await this.databaseConnection.query('SELECT * FROM users WHERE UserID = ?', [userId]);
            const user = result[0][0]
            if (user === undefined) {
                throw new Error("User not found")
            }
            return mappers.mapToUser(user)
        } catch (error) {
            console.error('Error in getUserById:', error);
            throw error;
        }
    }

    async assignTeacher(teacherId, courseId) {
        try {
            await this.databaseConnection.query('UPDATE courses SET TeacherID = ? WHERE CourseID = ?', [teacherId, courseId]);
        } catch (error) {
            console.error('Error in assignTeacher:', error);
            throw error;
        }
    }

    async createEnrolment(courseId, userId) {
        try {
            const [existingEnrolment] = await this.databaseConnection.query('SELECT * FROM enrolments WHERE CourseID = ? AND UserID = ?', [courseId, userId]);
            if (existingEnrolment.length > 0) {
                throw new Error('Enrollment already exists');
            }
            await this.databaseConnection.query('INSERT INTO enrolments (CourseID, UserID) VALUES (?, ?)', [courseId, userId]);

        } catch (error) {
            console.error('Error in enroll', error);
            throw error;
        }
    }

    async getEnrolments() {
        try {
            const [rows] = await this.databaseConnection.query('SELECT * FROM enrolments');
            return rows.map(mappers.mapToEnrolment);
        } catch (error) {
            console.error('Error in returnEnrolments', error);
            throw error;
        }
    }

    async updateMark(mark, enrolmentId, teacherId) {
        try {
            // Add a check for the EnrolmentID belonging to a course assigned to the specific teacher
            const [rows] = await this.databaseConnection.query('UPDATE enrolments SET Mark = ? WHERE EnrolmentID = ? AND CourseID IN (SELECT CourseID FROM courses WHERE TeacherID = ?)', [mark, enrolmentId, teacherId]);
            if (rows.affectedRows === 0) {
                throw new Error('Enrolment not found or not assigned to the specific teacher');
            }
        } catch (error) {
            console.error('Error in updateGrade', error);
            throw error;
        }
    }

    async updateCourseAvailability(courseId, availability) {
        try {
            await this.databaseConnection.query('UPDATE courses SET isAvailable = ? WHERE CourseID = ?', [availability, courseId]);
        } catch (error) {
            console.error('Error in availCourse', error);
            throw error;
        }
    }
}


module.exports = Dao;
