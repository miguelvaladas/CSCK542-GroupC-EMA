// Data Access Object - Responsible for Accessing Database data, usually through some database connection object
const mysql = require('mysql2/promise');
const Course = require('../models/course');
const User = require('../models/user');
const Enrolment = require('../models/enrolment');
const availableCoursesMapper = require('../mappers/availableCoursesMapper')


class Dao {
    constructor() {
        this.pool = mysql.createPool({
          host: '127.0.0.1',
          user: 'root',
          password: 'testtest',
          database: 'mydb'
        });
    }


  async getCourses() {
    try {
        const [rows] = await this.pool.query('SELECT * FROM courses');
        return rows.map(row => new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable));
    } catch (error) {
        console.error('Error in getCourses', error);
        throw error;
    }
  }
    async getAvailableCourses() {{
      try {
          const [rows] = await this.pool.query('SELECT courses.Title, users.Name AS TeacherName, courses.isAvailable FROM courses, users WHERE users.UserID = courses.TeacherID AND courses.isAvailable = 1');
          return rows.map(availableCoursesMapper); // uses DTO mapper as the data returns is from 2 tables in the database that have been joined
      } catch (error) {
          console.error('Error in getAvailableCourses', error);
          throw error;
      }
    }
}


    async getCourseById(id) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM courses WHERE CourseID = ?', [id]);
            return rows.map(row => new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable));
        } catch (error) {
            console.error('Error in getCourseById:', error);
            throw error;
        }
    }

    async getUserById(userId) {
      try{
        const [user] = await this.pool.query('SELECT * FROM users WHERE UserID = ?', [userId]);
      return user.map(row => new User(row.UserID, row.Name, row.RoleID));
      }
      catch (error) {
        console.error('Error in getUserById:', error);
        throw error;
      }

  }

  async assignTeacher(teacherId, courseId) {
    try {
        await this.pool.query('UPDATE courses SET TeacherID = ? WHERE CourseID = ?', [teacherId, courseId]);


        const [updatedRows] = await this.pool.query('SELECT * FROM courses WHERE CourseID = ?', [courseId]);
        if (updatedRows.length === 0) {
            throw new Error('Course not found');
        }
        const updatedCourse = updatedRows[0];
        return new Course(updatedCourse.CourseID, updatedCourse.Title, updatedCourse.TeacherID, updatedCourse.isAvailable);
    } catch (error) {
        console.error('Error in assignTeacher:', error);
        throw error;
    }
  }

  async enroll(courseId, userId) {
    try {

        const [existingEnrolment] = await this.pool.query('SELECT * FROM enrolments WHERE CourseID = ? AND UserID = ?', [courseId, userId]);

        if (existingEnrolment.length > 0) {
            throw new Error('Enrollment already exists');
        }


        await this.pool.query('INSERT INTO enrolments (CourseID, UserID) VALUES (?, ?)', [courseId, userId]);

    } catch(error) {
        console.error('Error in enroll', error);
        throw error;
    }
  }

  async returnEnrolments() {
    try {
    const [rows] = await this.pool.query('SELECT * FROM enrolments');
    return rows.map(row => new Enrolment(row.EnrolmentID, row.Mark, row.CourseID, row.UserID));
    } catch(error) {
      console.error('Error in returnEnrolments', error);
      throw error;
    }
  }
  async updateGrade(Mark, EnrolmentID) {
    try{
      await this.pool.query('UPDATE enrolments SET Mark = ? WHERE EnrolmentID = ?', [Mark, EnrolmentID]);
    } catch(error) {
      console.error('Error in updateGrade', error);
      throw error;
    }
  }


      // Additional DAO methods...
}

module.exports = Dao;
