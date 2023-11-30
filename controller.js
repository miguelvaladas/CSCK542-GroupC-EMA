
import pool from './database.js';
import * as queries from './queries.js'


export async function getUsers(req, res) {
  const [rows] = await pool.query(queries.getUsersQuery());
  res.send(rows);
}

export async function getUserById(req, res) {
  const UserID = req.params.id;
  const sqlQuery = queries.getUserById(UserID); // Call the function to get the SQL query
  const [rows] = await pool.query(sqlQuery, [UserID]); // Pass the SQL query string and parameter to pool.query
  res.send(rows[0]);
}


export async function getCourses (req, res) {
  const id = req.params.id;
  const userSqlQuery = queries.getUserById(id); // Get the SQL query string
  const [user] = await pool.query(userSqlQuery, [id]); // pass the SQL query string and parameter
  console.log(user[0].UserID)
  const [allCourses] = await pool.query(queries.getCoursesQuery())
  const [availableCourses] = await pool.query(queries.getAvailableCoursesQuery())
  console.log(availableCourses[0])
  if (user[0].RoleID === 3) {
    res.status(200).send({user, availableCourses});
  } else
  res.status(200).send({user, allCourses})
}

export async function getCourseById(req, res) {
  const CourseID = req.params.courseid;
  const sqlQuery = queries.getCourseById(CourseID);
  const [rows] = await pool.query(sqlQuery, [CourseID]);
  res.send(rows[0]);
}


export async function toggleAvailable(req, res) {
  const id = req.params.id;
  const userSqlQuery = queries.getUserById(id); // Get the SQL query string
  const [user] = await pool.query(userSqlQuery, [id]); // pass the SQL query string and parameter
  const CourseID = req.params.courseid;
  const sqlQuery = queries.getCourseById(CourseID);
  const [course] = await pool.query(sqlQuery, [CourseID]);
  console.log(course)
  if (user[0].RoleID === 1 ) {
    if (course[0].isAvailable === 1) {
      const sqlQuery = queries.makeCourseUnavailabile(CourseID);
      await pool.query(sqlQuery, [CourseID]);
      res.send('course has been made unavailable')
    }
    if (course[0].isAvailable === 0){
      const sqlQuery2 = queries.makeCourseAvailabile(CourseID);
      await pool.query(sqlQuery2, [CourseID]);
      res.send('course has been made available')
    }
  } else res.send(`User ${user[0].Name} is a ${user[0].Role} - does not have permission to do this`)
}


export async function assignTeacher(req, res) {

  const TeacherID = req.body.TeacherID;
  const CourseID = req.params.courseid;
  const sqlQuery = queries.getCourseById(CourseID);
  const [course] = await pool.query(sqlQuery, [CourseID]);

  const id = req.params.id;
  const userSqlQuery = queries.getUserById(id);
  const [user] = await pool.query(userSqlQuery, [id]);

  if (user[0].RoleID === 1 )  {
      const assignSqlQuery = queries.assignTeacher(TeacherID, CourseID);
      await pool.query(assignSqlQuery, [TeacherID, CourseID]);
      res.send(`Course has been assigned to teacher ${TeacherID}`);
    } else {
      res.send(`User ${user[0].Name} is a ${user[0].Role} - does not have permission to do this`);
    }
}

export async function enroll(req, res) {
  const id = req.params.id;
  const userSqlQuery = queries.getUserById(id); // Get the SQL query string
  const [user] = await pool.query(userSqlQuery, [id]); // pass the SQL query string and parameter
  const CourseID = req.params.courseid;
  const sqlQuery = queries.getCourseById(CourseID);
  const [course] = await pool.query(sqlQuery, [CourseID]);
  if (user[0].RoleID === 3 ) {
    if (course[0].isAvailable === 1) {
      const sqlQuery = queries.enroll(id, CourseID);
      await pool.query(sqlQuery, [id, CourseID]);
      res.send(`user ${id} has been enrolled in course ${CourseID}`)
    } else res.send('course is not available')
  } else res.send(`User ${user[0].Name} is a ${user[0].Role} - does not have permission to do this`)
}

export async function getEnrolments(req, res) {
  const [rows] = await pool.query(queries.getEnrolments());
  res.send(rows);
}


export async function updateGrade(req, res) {
  const enrolmentid = req.params.enrolmentid;
  const id = req.params.id;
  const userSqlQuery = queries.getUserById(id);
  const [user] = await pool.query(userSqlQuery, [id]);
  console.log(user);
  const grade = req.body.Mark;
    if (user[0].RoleID === 2) {
      const sqlGrade = queries.updateGrade(grade, enrolmentid);
      await pool.query(sqlGrade, [grade, enrolmentid]);
      res.send(`Enrolment ${enrolmentid} has been awarded grade ${grade}`);
    } else {
      res.send(`User ${user[0].Name} is a ${user[0].Role} - does not have permission to do this`);
    }
    }
