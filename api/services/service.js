class Service {

  constructor(dao) {
      this.dao = dao;
  }

  async getUserById(id) {
    const user =  await this.dao.getUserById(id);
    return user
  }

  async getCourses() {
    return await this.dao.getCourses();
}

  async getCourse(id) {
      return await this.dao.getCourseById(id);
  }

  async assignTeacher(courseId, teacherId, userId) {
    const course = await this.dao.getCourseById(courseId);
    const user = await this.dao.getUserById(userId);
    if (!user[0] || user[0].roleId !== 1) {
        throw new Error(`User does not have permission`);
    }
    if (!course[0]) {
        throw new Error('Course not found');
    }
    await this.dao.assignTeacher(teacherId, courseId);
  }

  async enroll(courseId, userId) {
    const course = await this.dao.getCourseById(courseId);
    const user = await this.dao.getUserById(userId);

    if (!user || user[0].roleId !== 3) {
        throw new Error(`User ${user[0].name} does not have permission`);
    }

    if (!course[0]) {
        throw new Error('Course not found');
    }
    await this.dao.enroll(courseId, userId);

  }

  async getEnrolments() {
    return await this.dao.returnEnrolments();
  }
}

module.exports = Service;
