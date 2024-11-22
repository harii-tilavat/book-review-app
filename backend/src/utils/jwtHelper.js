const jwt = require("jsonwebtoken");

class JwtHelpwer {
    static generateToken(data) {
        return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}
module.exports = JwtHelpwer;