class Course {
    constructor(courseId, title, teacherId, isAvailable, teacherName) {
        this.courseId = courseId;
        this.title = title;
        this.teacherId = teacherId;
        this.isAvailable = isAvailable;
        this.teacherName = teacherName
    }
}

module.exports = Course;
