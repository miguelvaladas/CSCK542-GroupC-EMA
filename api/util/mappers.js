const Course = require('../models/course');
const Enrollment = require('../models/enrolment');
const User = require('../models/user');
const AvailableCoursesDto = require('../dtos/availableCoursesDto')


const mapToAvailableCourseDto = (row) => {
    return new AvailableCoursesDto(row.Title, row.TeacherName)
}

const mapToCourse = (row) => {
    return new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable);
}

const mapToEnrolment = (row) => {
    return new Enrollment(row.EnrolmentID, row.Mark, row.CourseID, row.UserID);
}

const mapToUser = (row) => {
    return new User(row.UserID, row.Name, row.RoleID)
}


module.exports = {
    mapToAvailableCourseDto: mapToAvailableCourseDto,
    mapToCourse: mapToCourse,
    mapToEnrolment: mapToEnrolment,
    mapToUser: mapToUser
}
