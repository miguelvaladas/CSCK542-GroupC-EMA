class Course {

    constructor(id, title, teacherId, isAvailable, teacherName) {
        this.id = id;
        this.title = title;
        this.teacherId = teacherId;
        this.isAvailable = isAvailable;
        this.teacherName = teacherName
    }
}

module.exports = Course;
