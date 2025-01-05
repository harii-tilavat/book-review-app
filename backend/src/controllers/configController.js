const { validationHandler, userRegisterValidationSchema, userLoginValidationSchema } = require("../validation");
const ConfigService = require("../services/configService");
const { Response, Message } = require("../utils/response");

class ConfigController {
    constructor() {
        this.configService = new ConfigService();
    }
    register(app) {
        app.route('/login')
            .post(userLoginValidationSchema, validationHandler, async (req, res, next) => {
                try {
                    const { email, password } = req.body;
                    const data = await this.configService.loginUser(email, password);
                    return Response.success(res, `Login success. Welcome back, ${data.user.username}!`, data);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/register")
            .post(userRegisterValidationSchema, validationHandler, async (req, res, next) => {
                try {
                    const data = await this.configService.registerUser(req.body);
                    return Response.success(res, `Signup success. Welcome ${data.user.username}!`, data);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = ConfigController;