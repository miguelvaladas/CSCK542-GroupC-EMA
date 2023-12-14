const Course = require('../models/course'); // Update the path accordingly
const Enrollment = require('../models/enrolment'); // Update the path accordingly
const User = require('../models/user'); // Update the path accordingly
const AvailableCoursesDto = require('../dtos/availableCoursesDto')

const availableCoursesMapper = (row) => {
  return new AvailableCoursesDto(row.Title, row.TeacherName, 'yes' )
}

const courseMapper = (row) => {
  return new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable, row.TeacherName);
}



const enrollmentMapper = (row) => {
  return new Enrollment(row.EnrollmentID, row.Mark, row.CourseID, row.UserID);
}



const userMapper = (row) => {
  //return new User(row.UserID, row.Name, row.RoleID);
  const user = new User(row.UserID, row.Name, row.RoleID)
  return user
}

module.exports = {userMapper, enrollmentMapper , courseMapper, availableCoursesMapper}
