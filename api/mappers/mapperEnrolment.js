const Enrollment = require('../models/enrolment'); // Update the path accordingly

const enrollmentMapper = (row) => {
  return new Enrollment(row.EnrollmentID, row.Mark, row.CourseID, row.UserID);
}

module.exports = enrollmentMapper;