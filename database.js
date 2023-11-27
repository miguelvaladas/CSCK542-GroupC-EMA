import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'testtest',
  database: 'mydb'
}).promise();

export async function getUsers() {
  const [rows] = await pool.query(`
  SELECT *
  FROM users
  `)
  return rows
}

export async function getUserWithEnrolmentData(UserID) {
  const [rows] = await pool.query(`
  SELECT *
  FROM users, roles, enrolments
  WHERE users.RoleID = roles.RoleID
  AND enrolments.UserID = users.UserID
  AND users.UserID = ?
  `,[UserID])
  return rows[0]
}

export async function getUser(UserID) {
  const [rows] = await pool.query(`
  SELECT *
  FROM users, roles
  WHERE users.RoleID = roles.RoleID
  AND users.UserID = ?
  `,[UserID])
  return rows[0]
}

export async function getCourses() {
  const [rows] = await pool.query(`
  SELECT *
  FROM courses
`)
  return rows
}

export async function getAvailableCourses() {
  const [rows] = await pool.query(`
  SELECT users.Name AS 'Teacher Name', courses.CourseID,courses.Title, courses.isAvailable
  FROM courses, users
  WHERE users.UserID = courses.TeacherID
  AND courses.isAvailable = 1
`)
  return rows
}

export async function getCourse(CourseID) {
  const [rows] = await pool.query(`
  SELECT *
  FROM courses
  WHERE courseID = ?

  `,[CourseID])
  return rows[0]
}


export async function makeCourseAvailabile(CourseID) {
  const [rows] = await pool.query(`
  UPDATE courses
  SET isAvailable = 1 WHERE CourseID = ?
  `,[CourseID])
  return rows[0]
}

export async function makeCourseUnavailabile(CourseID) {
  const [rows] = await pool.query(`
  UPDATE courses
  SET isAvailable = 0 WHERE CourseID = ?
  `,[CourseID])
  return rows[0]
}


export async function assignTeacher(TeacherID, CourseID) {
  const [rows] = await pool.query(`
  UPDATE courses
  SET TeacherID = ? WHERE CourseID = ?
  `,[TeacherID, CourseID])
  return rows[0]
}

export async function enroll(UserID, CourseID) {
  const [rows] = await pool.query(`
  INSERT INTO enrolments (UserID, CourseID)
  VALUES (?, ?)
  `,[UserID, CourseID])
  return rows
}

export async function getEnrolments() {
  const [rows] = await pool.query(`
  SELECT *
  FROM enrolments
  `)
  return rows
}

export async function getEnrolmentsById(EnrolmentID) {
  const [rows] = await pool.query(`
  SELECT *
  FROM enrolments
  WHERE EnrolmentID = ?
  `,[EnrolmentID])
  return rows
}

export async function updateGrade(Grade, EnrolmentID) {
  const [rows] = await pool.query(`
  UPDATE enrolments
  SET Mark = ? WHERE EnrolmentID = ?
  `,[Grade, EnrolmentID])
  return rows
}
