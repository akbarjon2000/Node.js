function authenticate(req, res, next) {
    console.log("Permission Succeed!!!");
    next();
}

module.exports = authenticate;