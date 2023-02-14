
module.exports = (req, res, next) => {
    if (req.userData?.userType === 'admin') {
        next();
    }
    else {
        return res.status(403).json({message: 'Unauthorized'})
    }
}
