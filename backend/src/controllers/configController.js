const { validationHandler, userRegisterValidationSchema, userLoginValidationSchema } = require("../validation");
const ConfigService = require("../services/configService");
const { Response, Message } = require("../utils/response");

class ConfigController {
    constructor() {
        this.configService = new ConfigService();
    }
    register(app) {
        app.route('/auth/login')
            .post(userLoginValidationSchema, validationHandler, async (req, res, next) => {
                try {
                    const { email, password } = req.body;
                    const data = await this.configService.loginUser(email, password);
                    return Response.success(res, `Login successful. Welcome back, ${data.user.username}!`, data);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/auth/register")
            .post(userRegisterValidationSchema, validationHandler, async (req, res, next) => {
                try {
                    await this.configService.registerUser(req.body);
                    return Response.created(res, Message.SIGNUP_SUCCESS);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = ConfigController;