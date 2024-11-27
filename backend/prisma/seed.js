const prisma = require("../src/config/prismaClient");
async function main() {
    // Insert Genres
    const genres = [
        'Fiction',
        'Non-fiction',
        'Mystery',
        'Fantasy',
        'Romance',
        'Science Fiction',
        'Thriller',
        'Historical',
        'Biography',
        'Adventure',
    ];

    const createGenres = async () => {
        for (let name of genres) {
            const existingGenre = await prisma.genre.findUnique({ where: { name } });
            if (!existingGenre) {
                await prisma.genre.create({
                    data: { name }
                });
            }
        }
    }
    await createGenres();
    console.log("Genres created... ");
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })