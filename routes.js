import express from 'express';

//import queries
import {
  getUsers,
  getUser,
  getUserWithEnrolmentData,
  getCourses,
  getCourse,
  makeCourseAvailabile,
  makeCourseUnavailabile,
  getAvailableCourses,
  assignTeacher,
  enroll,
  getEnrolments,
  getEnrolmentsById,
  updateGrade
} from './queries.js'

//initialize router
const router = express.Router();

router.get("/users", async (req, res) => {
  const users =  await getUsers()
  res.send(users)
})

router.get("/users/:id", async (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

router.get("/users/:id/courses", async (req, res) => {
  console.log(req.params)
  const id = req.params.id
  const user = await getUser(id)
  const allCourses = await getCourses()
  const availableCourses = await getAvailableCourses()
  if (user.RoleID === 3) {
    res.status(200).send({user, availableCourses})
  } else
  res.status(200).send({user, allCourses})

})

router.get("/users/:id/courses/:courseid", async (req, res) => {
  console.log(req.params)
  const courseid = req.params.courseid
  const id = req.params.id
  const user = await getUser(id)
  const course = await getCourse(courseid)
  res.status(200).send({user, course})
})

router.put("/users/:id/courses/:courseid", async (req, res) => {

  const courseid = req.params.courseid
  const id = req.params.id
  const user = await getUser(id)
  const course = await getCourse(courseid)


  if(course.isAvailable === 1) {
    if(user.RoleID === 1){

      await makeCourseUnavailabile(courseid)
      res.send('course has been made unavailable')
    } else
    res.send(`User ${user.Name} is a ${user.Role} - does not have permission to do this`)
  }
  if(course.isAvailable === 0) {
    if(user.RoleID === 1){
      await makeCourseAvailabile(courseid)
      res.send('course has been made available')
    } else

    res.send(`User ${user.Name} is a ${user.Role} - does not have permission to do this`)}

}
  )
  router.patch("/users/:id/courses/:courseid", async (req, res) => {
    const TeacherID = req.body.TeacherID;
    const courseid = req.params.courseid
    const id = req.params.id
    const user = await getUser(id)
   if (req.body.TeacherID) {
    if(user.RoleID === 1){
    await assignTeacher(TeacherID, courseid)
    res.send(`course has been assigned to teacher ${TeacherID}`)
   }else res.send(`User ${user.Name} is a ${user.Role} - does not have permission to do this`)
  }
})

router.post("/users/:id/courses/:courseid", async (req, res) => {
  console.log(req.body)
  const courseid = req.body.CourseID
  const id = req.params.id
  const user = await getUser(id)
  if(user.RoleID === 3){
    await enroll(id, courseid)
    res.send(`user ${id} has been enrolled in course ${courseid}`)
  } else
  res.send(`User ${user.Name} is a ${user.Role} - does not have permission to do this`)
}
)
router.get("/users/:id/enrolments/", async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  const enrolments = await getEnrolments()
  res.send(enrolments)
})

router.get("/users/:id/enrolments/:enrolmentid", async (req, res) => {
  const id = req.params.id
  const enrolmentid = req.params.enrolmentid
  console.log(req.params)
  const user = await getUser(id)
  const enrolments = await getEnrolmentsById(enrolmentid)
  res.send(enrolments)
})

router.patch("/users/:id/enrolments/:enrolmentid", async (req, res) => {
  const enrolmentid = req.params.enrolmentid
  console.log(req.params.id)
  const id = req.params.id
  const user = await getUser(id)
  console.log(user)
  const grade = req.body.Grade
  if(user.RoleID === 2){
    await updateGrade(grade, enrolmentid)
    res.send(`enrolment ${enrolmentid} has been awarded grade ${grade}`)
  } else
  res.send(`User ${user.Name} is a ${user.Role} - does not have permission to do this`)
})

export default router;
