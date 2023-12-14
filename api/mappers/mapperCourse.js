const Course = require('../models/course'); // Update the path accordingly

const courseMapper = (row) => {
  return new Course(row.CourseID, row.Title, row.TeacherID, row.isAvailable, row.TeacherName);
}

module.exports = courseMapper;
