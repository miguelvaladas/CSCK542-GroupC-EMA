class Service {

  constructor(dao) {
      this.dao = dao;
  }

  async getUserById(id) {
    const user =  await this.dao.getUserById(id);

    return user
  }

  async getCourses(userId) {
    const user = await this.dao.getUserById(userId);
    if (user[0].roleId === 3) {
      return await this.dao.getAvailableCourses();

    }else{
      return await this.dao.getCourses();
    }
  }

  async getCourse(id) {
      const course = await this.dao.getCourseById(id);
      return course
  }

  async assignTeacher(courseId, teacherId) {
    const course = await this.dao.getCourseById(courseId);

    if (!course[0]) {
        throw new Error('Course not found');
    }
    await this.dao.assignTeacher(teacherId, courseId);
  }


  async enroll(courseId, userId) {
    const course = await this.dao.getCourseById(courseId);
    const user = await this.dao.getUserById(userId);

    if (!course[0]) {
        throw new Error('Course not found');
    }
    await this.dao.enroll(courseId, userId);

  }

  async getEnrolments() {
    return await this.dao.returnEnrolments();
  }



  async updateGrade(Mark, EnrolmentID, userID) {
    try {
      
      const user = await this.dao.getUserById(userID);
      const enrolment = await this.dao.getEnrolmentById(EnrolmentID); 
  
      if (!user || user[0].roleId !== 2 || enrolment[0].TeacherID !== userID) {
        throw new Error('User does not have permission to update grades for this enrolment');
      }
  
      await this.dao.updateGrade(Mark, EnrolmentID);
    } catch (error) {
      console.error('Error in updateGrade', error);
      throw error;
    }
  }
  
}

module.exports = Service;
