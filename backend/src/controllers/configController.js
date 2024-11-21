const { validationHandler, userRegisterValidationSchema } = require("../middlewares/validation");
const ConfigService = require("../services/configService");
const Response = require("../utils/response");
class ConfigController {
    constructor() {
        this.configService = new ConfigService();
    }
    register(app) {
        app.route('/auth/login')
            .post(async (req, res, next) => {
                try {
                    console.log("REQ : ", req);
                    res.json({ message: "ROUTE COMPLETED." });
                } catch (error) {
                    next(error);
                }
            })
        app.route("/auth/register")
            .post(userRegisterValidationSchema, validationHandler, async (req, res, next) => {
                try {
                    await this.configService.registerUser(req.body);
                    return Response.created(res, 'Signup successfully.');
                    // return successResponse(res, 'Signup successfully.', user);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = ConfigController;