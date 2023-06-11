

module.exports = () => {
    const ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

         // User is not authenticated, redirect to the login page
        res.redirect('/login');
    }
};
