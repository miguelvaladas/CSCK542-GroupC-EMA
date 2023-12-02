// Data Access Object - Responsible for Accessing Database data, usually through some database connection object
class Dao {

    async getUserRole{
        router.get('/role', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_UserID', req.query.userid)
                    .execute(`Sys_User_Get_Role`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async isAdmin{
        router.get('/admin', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_UserID', req.query.userid)
                    .execute(`Sys_User_Is_Admin`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async isStudent{
        router.get('/student', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_UserID', req.query.userid)
                    .execute(`Sys_User_Is_Student`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async isTeacher{
        router.get('/teacher', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_UserID', req.query.userid)
                    .execute(`Sys_User_Is_Teacher`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async gradeCourse{
        router.get('/grade', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_CourseID', req.query.courseid)
                    .input('P_UserID', req.query.userid)
                    .input('P_Mark', req.query.mark)
                    .execute(`Tch_Course_Mark`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async getCourses{
        router.get('/courses', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .execute(`Std_View_Courses`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async getCourseById(id) {
        // TODO
        // Not certain that this is required
    }

    async makeCourseAvailable{
        router.get('/avail', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_CourseID', req.query.courseid)
                    .input('P_isAvailable', req.query.isavailable)
                    .execute(`Adm_Course_Avail`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async assignCourseTeacher{
        router.get('/assign', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_CourseID', req.query.courseid)
                    .input('P_TeacherID', req.query.teacherid)
                    .execute(`Adm_Course_Teacher`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async enrollStudent{
        router.get('/enroll', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_CourseID', req.query.courseid)
                    .input('P_UserID', req.query.userid)
                    .execute(`Std_Course_Enrol`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

    async withdrawStudent{
        router.get('/withdraw', async (req, res) => {
            try {
                await pool.connect();
                const result = await pool.request()
                    .input('P_CourseID', req.query.courseid)
                    .input('P_UserID', req.query.userid)
                    .execute(`Std_Course_Withdraw`);
                const role = result.recordset;

                res.json(role);
                }
            catch (error) {
                res.status(500).json(error);
            }
        );
    }

}

module.exports = Dao;