USE mydb;

/* FR1: Admins enable or disable availability of Course */
DELIMITER //
CREATE PROCEDURE Adm_Course_Avail(IN p_CourseID INT, IN p_isAvailable TINYINT)
BEGIN
	UPDATE Courses 
	SET isAvailable = p_isAvailable
	WHERE CourseID = p_CourseID;
END //
DELIMITER ;

/* FR2: Admins assign Teacher to Courses */
DELIMITER //
CREATE PROCEDURE Adm_Course_Teacher(IN p_CourseID INT, IN p_TeacherID INT)
BEGIN
	UPDATE Courses 
	SET TeacherID = p_TeacherID
	WHERE CourseID = p_CourseID;
END //
DELIMITER ;

/* FR3: Students can view available courses, Course Title, Teacher's Name */
DELIMITER //
CREATE PROCEDURE Std_View_Courses()
BEGIN
	SELECT Courses.Title, Users.Name
	FROM Courses INNER JOIN Users ON Courses.TeacherID = Users.UserID
	WHERE Courses.isAvailable = 1
	ORDER BY Courses.Title;
END //
DELIMITER ;


/* FR4: Students can Enrol in a course */
DELIMITER //
CREATE PROCEDURE Std_Course_Enrol(IN p_CourseID INT, IN p_UserID INT) 
BEGIN
	INSERT INTO Enrolments (CourseID, UserID)
    SELECT CourseID, UserID
    FROM (SELECT p_CourseID as CourseID, p_UserID as UserID) t
    WHERE NOT EXISTS (SELECT 1 FROM Enrolments e WHERE e.CourseID = t.CourseID AND e.UserID = t.UserID);
END //
DELIMITER ;


/* FR4.1 Students can Withdraw from a course */
DELIMITER //
CREATE PROCEDURE Std_Course_Withdraw(IN p_CourseID INT, IN p_UserID INT) 
BEGIN
	DELETE FROM Enrolments
	WHERE CourseID = p_CourseID AND UserID = p_UserID;
END //
DELIMITER ;


/* FR5: Teacher pass or fail student */
DELIMITER //
CREATE PROCEDURE Tch_Course_Mark(IN p_CourseID INT, IN p_UserID INT, IN p_Mark INT)
BEGIN
	UPDATE Enrolments
	SET Mark = p_Mark
	WHERE CourseID = p_CourseID AND UserID = p_UserID;
END //
DELIMITER ;


/* FR6.1: System Access Control */
DELIMITER //
CREATE PROCEDURE Sys_User_Is_Admin(IN p_UserID INT)
BEGIN
	SELECT Users.UserID
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID AND Roles.Role = 'Admin';
END //
DELIMITER ;

/* FR6.2: System Access Control */
DELIMITER //
CREATE PROCEDURE Sys_User_Is_Teacher(IN p_UserID INT)
BEGIN
	SELECT Users.UserID
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID AND Roles.Role = 'Teacher';
END //
DELIMITER ;

/* FR6.3: System Access Control */
DELIMITER //
CREATE PROCEDURE Sys_User_Is_Student(IN p_UserID INT)
BEGIN
	SELECT Users.UserID
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID AND Roles.Role = 'Student';
END //
DELIMITER ;

/* FR6.4: System Access Control */
DELIMITER //
CREATE PROCEDURE Sys_User_Get_Role(IN p_UserID INT)
BEGIN
	SELECT Roles.Role
	FROM Users INNER JOIN Roles ON Users.RoleID = Roles.RoleID
	WHERE Users.UserID = p_UserID;
END //
DELIMITER ;