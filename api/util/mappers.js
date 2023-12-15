const Course = require('../models/course');
const Enrollment = require('../models/enrolment');
const User = require('../models/user');
const AvailableCoursesDto = require('../dtos/availableCoursesDto')


const mapToAvailableCourseDto = (row) => {
    return new AvailableCoursesDto(row.Title, row.TeacherName, 'yes')
}

const mapToCourse = (row) => {
    return new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable);
}

const mapToEnrollment = (row) => {
    return new Enrollment(row.EnrollmentID, row.Mark, row.CourseID, row.UserID);
}

const mapToUser = (row) => {
    return new User(row.UserID, row.Name, row.RoleID)
}


module.exports = {
    mapToUser: mapToUser,
    mapToEnrollment: mapToEnrollment,
    mapToCourse: mapToCourse,
    mapToAvailableCourseDto: mapToAvailableCourseDto
}
