const ConfigRepo = require("../repositories/configRepository");
const { v4 } = require('uuid');
const CryptoUtils = require("../utils/cryptoUtils");

class ConfigService {
    constructor() {
        this.configRepo = new ConfigRepo();
    }
    registerUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const id = v4();
                const hashPassword = await CryptoUtils.hashPassword(user.password);
                const currentUser = { ...user, password: hashPassword, id };

                await this.configRepo.register(currentUser);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }
}
module.exports = ConfigService;