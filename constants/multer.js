// Multer stuff
global.multer = require('multer');
global.UPLOAD_MAX_FILE_SIZE = 1024 * 1024;
let invalidFiles = [];
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(USERS_UPLOAD_FOLDER)
        cb(null, TRANSACTIONS_UPLOAD_FOLDER)
    },
    filename: function (req, file, cb) {
        // console.log(file)
        cb(null, file.originalname) // already have got Date implemented in the name
    }
});


let upload = multer({
    storage: storage,
    // limits: {fileSize: UPLOAD_MAX_FILE_SIZE},
    fileFilter: function (req, file, cb) {
        let filetypes = /csv|xls/;//csv|xls
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        invalidFiles = [];

        if (!mimetype && !extname) {
            invalidFiles.push(file.originalname);
            invalidFiles = [...new Set(invalidFiles)];
            req.fileTypeError = {msg: "invalid_file_type", files: invalidFiles.join('<br>')};
            return cb(null, false, req.fileTypeError) //
        }

        cb(null, true)
        // return cb(null, false, true);
        // else {
        //     console.log('filter')
        //     cb(null, true)
        //     // return cb(null, false, true);
        // }
    }
});
global.uploadProfileImg = upload.single('profile_img_file');
global.importFilesUpload = upload.array('imported_file', 10);

