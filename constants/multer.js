// Multer stuff
global.multer = require('multer');
global.UPLOAD_MAX_FILE_SIZE = 1024*1024;

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, USERS_UPLOAD_FOLDER)
    },
    filename: function (req, file, cb) {

        let ext = file.mimetype.split('/')[1]
        cb(null, file.originalname) // + '-' + Date.now()+path.extname(file.originalname
    }
});


global.uploadProfileImg = multer({
    storage: storage,
    limits: { fileSize: UPLOAD_MAX_FILE_SIZE },
    fileFilter: function (req, file, cb) {
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
}).single('profile_img_file');