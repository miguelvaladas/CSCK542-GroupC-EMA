
async updateGrade(Mark, EnrolmentID, userID) {
    try {
      
      const user = await this.dao.getUserById(userID);
      const enrolment = await this.dao.getEnrolmentById(EnrolmentID); /
  
      if (!user || user[0].roleId !== 2 || enrolment[0].TeacherID !== userID) {
        throw new Error('User does not have permission to update grades for this enrolment');
      }
  
      await this.dao.updateGrade(Mark, EnrolmentID);
    } catch (error) {
      console.error('Error in updateGrade', error);
      throw error;
    }
  }
  

  
