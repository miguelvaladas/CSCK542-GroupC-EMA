class Course {
    constructor(courseId, title, teacherId, isAvailable) {
        this.courseId = courseId;
        this.title = title;
        this.teacherId = teacherId;
        this.isAvailable = isAvailable;
    }
}

module.exports = Course;