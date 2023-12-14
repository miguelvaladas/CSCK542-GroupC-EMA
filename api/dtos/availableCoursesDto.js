class AvailableCoursesDto {
  constructor(Title, Teacher_Name, Available) { //changed what is displayed for student readability
      this.Title = Title;
      this.Teacher_Name = Teacher_Name
      this.Available = Available;

  }
}

module.exports = AvailableCoursesDto;
