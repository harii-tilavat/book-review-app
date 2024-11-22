const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

// Create and export a single instance of PrismaClient
module.exports = prismaClient;