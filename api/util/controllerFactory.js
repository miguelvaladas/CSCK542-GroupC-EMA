const Dao = require('../daos/dao');
const Service = require('../services/service');
const Controller = require('../controllers/controller');

class ControllerFactory {

    static instance = null

    constructor() {
        throw new Error('Use ControllerFactory.getInstance()');
    }

    //Singleton pattern implementation
    static getInstance() {
        if (!this.instance) {
            const dao = new Dao();
            const service = new Service(dao);
            this.instance = new Controller(service);
        }
        return this.instance;
    }
}

module.exports = ControllerFactory;