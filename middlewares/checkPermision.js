const { User } = require('../models/index');

const checkPermission = (permission) => {
    return async (req, res, next) => {
        try {
            // Get user role
            const userId = req.user.id;

            const user = await User.findByPk(userId);
            
            if (!user) {
                return res.status(404).json({
                    error: 'User does not exist'
                })
            }

            if (user.role.includes(permission)) {
                next();
            } else {
                return res.status(403).json({
                    error: 'You do not have permission to access this resource.'
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

module.exports = checkPermission;