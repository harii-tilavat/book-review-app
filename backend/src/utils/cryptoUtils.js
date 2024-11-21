const bcrypt = require("bcryptjs");

class CryptoUtils {
    static async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            console.log(error);
        }
    }
    static async compareHash(password, hashPassword) {
        try {
            return await bcrypt.compare(password, hashPassword);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = CryptoUtils;