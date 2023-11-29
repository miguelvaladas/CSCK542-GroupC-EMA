/* FR1: Admins enable or disable availability of Course */
CREATE PROCEDURE Adm_Course_Avail(IN p_CourseID INT, IN p_isAvailable TINYINT)
BEGIN
	UPDATE Courses 
	SET isAvailable = p_isAvailable
	WHERE CourseID = p_CourseID;
END;

/* FR2: Admins assign Teacher to Courses */
CREATE PROCEDURE Adm_Course_Teacher(IN p_CourseID INT, IN p_TeacherID INT)
BEGIN
	UPDATE Courses 
	SET TeacherID = p_TeacherID
	WHERE CourseID = p_CourseID;
END;

/* FR3: Students can view available courses, Course Title, Teacher's Name */
CREATE PROCEDURE Std_View_Courses
BEGIN
	SELECT Courses.Title, Users.Name
	FROM Courses INNER JOIN Users ON Courses.TeacherID = Users.UserID
	WHERE Courses.isAvailable = 1
	ORDER BY Courses.Title;
END;


/* FR4: Students can Enrol in a course */
CREATE PROCEDURE Std_Course_Enrol(IN p_CourseID INT, IN p_UserID INT) 
BEGIN
	INSERT INTO Enrolments (CourseID, UserID)
	VALUES (p_CourseID, p_UserID)
	WHERE NOT EXISTS(SELECT * FROM Enrolments WHERE CourseID = p_CourseID AND UserID = p_UserID LIMIT 1)
END;


/* FR4.1 Students can Withdraw from a course */
CREATE PROCEDURE Std_Course_Withdraw(IN p_CourseID INT, IN p_UserID INT) 
BEGIN
	DELETE FROM Enrolments
	WHERE CourseID = p_CourseID AND UserID = p_UserID;
END;


/* FR5: Teacher pass or fail student */
CREATE PROCEDURE Tch_Course_Mark(IN p_CourseID INT, IN p_UserID INT, IN p_Mark INT)
BEGIN
	UPDATE Enrolments
	SET Mark = p_Mark
	WHERE CourseID = p_CourseID AND UserID = p_UserID;
END;


/* FR6.1: System Access Control */
CREATE PROCEDURE Sys_User_Is_Admin(IN p_UserID INT)
BEGIN
	SELECT Users.UserID
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID AND Roles.Role = 'Admin';
END;

/* FR6.2: System Access Control */
CREATE PROCEDURE Sys_User_Is_Teacher(IN p_UserID INT)
BEGIN
	SELECT Users.UserID
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID AND Roles.Role = 'Teacher';
END;

/* FR6.3: System Access Control */
CREATE PROCEDURE Sys_User_Is_Student(IN p_UserID INT)
BEGIN
	SELECT Users.UserID
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID AND Roles.Role = 'Student';
END;

/* FR6.4: System Access Control */
CREATE PROCEDURE Sys_User_Get_Role(IN p_UserID INT)
BEGIN
	SELECT Roles.Role
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID;
END;