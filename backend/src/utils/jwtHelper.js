const jwt = require("jsonwebtoken");

class JwtHelpwer {
    static generateToken(data) {
        return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}
module.exports = JwtHelpwer;