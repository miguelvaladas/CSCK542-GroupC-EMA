const AvailableCoursesDto = require('../dtos/availableCoursesDto')

const availableCoursesMapper = (row) => {
  return new AvailableCoursesDto(row.CourseID, row.Title, row.TeacherID, row.isAvailable, row.TeacherName)
}

module.exports = availableCoursesMapper
