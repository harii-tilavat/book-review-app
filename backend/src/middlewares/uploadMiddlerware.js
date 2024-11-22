const multer = require("multer");
const { AppError } = require("./errorHandlerMiddleware");
const { StatusCode } = require("../utils/response");

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        const uniqePrifix = Date.now();
        file.originalname = uniqePrifix + '-' + file.originalname;
        cb(null, true);
    } else {
        cb(new AppError(StatusCode.BAD_REQUEST, 'Only image files are allowed'), false)
    }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;