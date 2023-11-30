
export const getUsersQuery = () => `
  SELECT *
  FROM users
`;

export const getUserById = (UserID) => `
  SELECT *
  FROM users, roles
  WHERE users.RoleID = roles.RoleID
  AND users.UserID = ?
`;

export const getCoursesQuery = () =>`
  SELECT *
  FROM courses
  `;

export const getAvailableCoursesQuery = () => `
  SELECT users.Name AS 'Teacher Name', courses.CourseID,courses.Title, courses.isAvailable
  FROM courses, users
  WHERE users.UserID = courses.TeacherID
  AND courses.isAvailable = 1
`;

export const getCourseById = (CourseID) => `
  SELECT *
  FROM courses
  WHERE courseID = ?
`;

export const makeCourseAvailabile = (CourseID) => `
  UPDATE courses
  SET isAvailable = 1 WHERE CourseID = ?
`;

export const makeCourseUnavailabile = (CourseID) => `
  UPDATE courses
  SET isAvailable = 0 WHERE CourseID = ?
`;

export const assignTeacher = (TeacherID, CourseID) => `
  UPDATE courses
  SET TeacherID = ? WHERE CourseID = ?
`;

export const enroll = (UserID, CourseID) => `
  INSERT INTO enrolments (UserID, CourseID)
  VALUES (?, ?)
`;

export const getEnrolments = () => `
  SELECT *
  FROM enrolments
`;

export const updateGrade = (Grade, EnrolmentID) => `
  UPDATE enrolments
  SET Mark = ? WHERE EnrolmentID = ?
`;
