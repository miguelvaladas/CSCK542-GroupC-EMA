 


            async updateGrade(req, res) {
                try {
                  const userId = req.params.id;
                  const grade = req.body.grade;
                  const enrolmentId = req.params.enrolmentid;
              
                  // Check if the user making the request is a teacher (roleId = 2)
                  const user = await this.service.getUserById(userId);
                  if (!user || user[0].roleId !== 2) {
                    return res.status(403).send('User does not have permission to update grades');
                  }
              
                  
                  await this.service.updateGrade(grade, enrolmentId, userId);
              
                  res.send(`Grade has been updated`);
                } catch (error) {
                  res.status(500).send(error.message);
                }
              }
              