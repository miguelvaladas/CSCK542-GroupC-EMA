const AvailableCoursesDto = require('../dtos/availableCoursesDto')

const availableCoursesMapper = (row) => {
  return new AvailableCoursesDto(row.Title, row.TeacherName, 'yes' )
}

module.exports = availableCoursesMapper
