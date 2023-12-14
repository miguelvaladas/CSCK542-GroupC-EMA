    }
 
    async updateGrade(Mark, EnrolmentID, TeacherID) {
        try {
          // Add a check for the EnrolmentID belonging to a course assigned to the specific teacher
          const [rows] = await this.pool.query('UPDATE enrolments SET Mark = ? WHERE EnrolmentID = ? AND CourseID IN (SELECT CourseID FROM courses WHERE TeacherID = ?)', [Mark, EnrolmentID, TeacherID]);
      
          if (rows.affectedRows === 0) {
            throw new Error('Enrolment not found or not assigned to the specific teacher');
          }
        } catch (error) {
          console.error('Error in updateGrade', error);
          throw error;
        }
      }
      
  

  
  
  