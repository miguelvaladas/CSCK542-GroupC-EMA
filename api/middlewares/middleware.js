const Dao = require('../daos/dao');
const dao = new Dao();
const Service = require('../services/service');
const service = new Service(dao); //service requires dao to call the functions
class RoleMiddleware {

  static async verifyRole(req, res, next, allowedRoles) {
      try {
          const userId = req.params.id;
          const user = await service.getUserById(userId);
          if (!user || !allowedRoles.includes(user[0].roleId)) {
              return res.status(403).send(`Access denied, user ${user[0].name} does not have permission`);
          }
          next(); // User has the required role, proceed to the next middleware
      } catch (error) {
          res.status(500).send(error.message);
      }
  }

  static isAdmin(req, res, next) {
      return RoleMiddleware.verifyRole(req, res, next, [1]); //admin roleid is 1
  }

  static isTeacher(req, res, next) {
      return RoleMiddleware.verifyRole(req, res, next, [2]); //teacher roleid is 2
  }

  static isStudent(req, res, next) {
      return RoleMiddleware.verifyRole(req, res, next, [3]); //student roleid is 3
  }
}

module.exports = RoleMiddleware;
