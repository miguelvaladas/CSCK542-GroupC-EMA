class Controller {

    constructor(service) {
        this.service = service;
    }

    async getCourse(req, res) {
        try {
            const id = req.params.id;
            const course = await this.service.getCourse(id);
            if (!course) {
                return res.status(404).send('Course not found');
            }
            res.json(course);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = Controller;