const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        const directory = path.join(__dirname, "../upload");

        // Ensure the directory exists
        fs.mkdirSync(directory, { recursive: true });

        cb(null, directory);
    },
    filename: (_, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});

module.exports = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only .pdf, .png, .jpg and .jpeg formats are allowed!"));
        }
    },
}).fields([
    { name: "lampiran", maxCount: 1 },
]);
