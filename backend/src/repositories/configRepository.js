const prisma = require('../config/prismaClient');
class ConfigRepo {
    register(user) {
        return new Promise(async (resolve, reject) => {
            try {
                // Handle DB LOGIC
                const { id, username, email, password } = user;
                const newUser = await prisma.user.create({
                    data: {
                        id,
                        username,
                        password,
                        email
                    }
                });
                resolve(newUser);
            } catch (error) {
                next(error);
            }
        })
    }
}
module.exports = ConfigRepo;