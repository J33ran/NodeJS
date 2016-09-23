module.exports = function admin (req, res, next) {

    if (req.decoded._doc.admin) {
        console.log ('User is admin');
        next();
    } else {
        // user is not admin
        // return an error
        var err = new Error('user is not admin!');
        err.status = 403;
        return next(err);
    }
};