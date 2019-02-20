module.exports = (file)=>{
    let error = '';
    if(file){
        if(file.size > UPLOAD_MAX_FILE_SIZE) error = 'limit_file_size';
        else {
            let filetypes = /jpeg|jpg/;
            let mimetype = filetypes.test(file.mimetype);
            let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            if (!mimetype && !extname) {
                error =  'invalid_file_type';

            }
        }

    }
    return error;
}