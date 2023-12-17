class RoleMiddleware {

    constructor() {
        throw new Error('Do not instantiate it directly, use the static methods.');
    }

    // Intercept request and attaches the required roles for verification
    static attachRequiredRoles(allowedRoles) {
        return async (req, res, next) => {
            try {
                req.allowedRoles = allowedRoles;
                next();
            } catch (error) {
                res.status(500).send(error.message);
            }
        };
    }
}


module.exports = RoleMiddleware;
