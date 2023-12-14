
const mysql = require('mysql2/promise');

const mappers = require('../mappers/mappers')


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
            return rows.map(row => new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable));


  async getCourses() {
    try {
        const [rows] = await this.pool.query('SELECT * FROM courses');
        return rows.map(mappers.courseMapper);
    } catch (error) {
        console.error('Error in getCourses', error);
        throw error;
    }
  }
    async getAvailableCourses() {{
      try {
          const [rows] = await this.pool.query('SELECT courses.Title, users.Name AS TeacherName, courses.isAvailable FROM courses, users WHERE users.UserID = courses.TeacherID AND courses.isAvailable = 1');
          return rows.map(mappers.availableCoursesMapper); // uses DTO mapper as the data returns is from 2 tables in the database that have been joined
      } catch (error) {
          console.error('Error in getAvailableCourses', error);
          throw error;
      }

    }

    async getAvailableCourses() {
        {
            try {
                const [rows] = await this.databaseConnection.query('SELECT courses.CourseID, courses.Title, users.Name AS TeacherName, courses.isAvailable FROM courses, users WHERE users.UserID = courses.TeacherID AND courses.isAvailable = 1');
                return rows.map(row => new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable, row.TeacherName));

            } catch (error) {
                console.error('Error in getAvailableCourses', error);
                throw error;
            }
        }
    }

    async getCourseById(id) {
        try {

            const result = await this.pool.query('SELECT * FROM courses WHERE CourseID = ?', [id]);
            const course = result[0][0]
            return mappers.courseMapper(course);

        } catch (error) {
            console.error('Error in getCourseById:', error);
            throw error;
        }
    }

    async getUserById(userId) {

      try{
        const result = await this.pool.query('SELECT * FROM users WHERE UserID = ?', [userId]);
        const user = result[0][0]
      return mappers.userMapper(user)
      }
      catch (error) {
        console.error('Error in getUserById:', error);
        throw error;
      }

  }


        } catch (error) {
            console.error('Error in getUserById:', error);
            throw error;
        }
    }

    async assignTeacher(teacherId, courseId) {
        try {
            await this.databaseConnection.query('UPDATE courses SET TeacherID = ? WHERE CourseID = ?', [teacherId, courseId]);
            const [updatedRows] = await this.databaseConnection.query('SELECT * FROM courses WHERE CourseID = ?', [courseId]);
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



  async returnEnrolments() {
    try {
    const [rows] = await this.pool.query('SELECT * FROM enrolments');
    return rows.map(mappers.enrollmentMapper);
    } catch(error) {
      console.error('Error in returnEnrolments', error);
      throw error;

      
    }

 async updateGrade(Mark, EnrolmentID, TeacherID) {
    try {
      // Add a check for the EnrolmentID belonging to a course assigned to the specific teacher
      const [rows] = await this.pool.query('UPDATE enrolments SET Mark = ? WHERE EnrolmentID = ? AND CourseID IN (SELECT CourseID FROM courses WHERE TeacherID = ?)', [Mark, EnrolmentID, TeacherID]);
  
      if (rows.affectedRows === 0) {
        throw new Error('Enrolment not found or not assigned to the specific teacher');
      }
    } catch (error) {
      console.error('Error in updateGrade', error);
      throw error;
    }
  }


}

module.exports = Dao;
