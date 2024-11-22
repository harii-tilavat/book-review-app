const prisma = require('../config/prismaClient');
class ConfigRepo {
    async register(user) {
        try {
            const { id, username, email, password } = user;
            // Create a new user record in the database.
            const newUser = await prisma.user.create({
                data: {
                    id,
                    username,
                    password,
                    email
                }
            });
            return newUser;
        } catch (error) {
            throw error;
        }
    }
    async findUserByEmail(email) {
        try {
            // Use `findFirst` for finding a single user by email
            const user = await prisma.user.findFirst({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = ConfigRepo;