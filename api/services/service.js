class Service {

    constructor(dao) {
        this.dao = dao;
    }
    
    async getCourse(id) {
        return await this.dao.getCourseById(id);
    }

}

module.exports = Service;