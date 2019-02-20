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


let upload = multer({
    storage: storage,
});
global.uploadProfileImg = upload.single('profile_img_file');

