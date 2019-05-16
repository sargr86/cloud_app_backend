module.exports = (req, res, next) => {
// console.log('checking files');
    let reqFiles = req.files['imported_file'];
    let files = [];

    // Handling multiple & one file upload
    if (reqFiles instanceof Array) {
        files = reqFiles;
    } else files.push(reqFiles);

    const fileNames = Object.keys(files).map(key => files[key].name).filter(n => n);
    // console.log(fileNames)
    const invalidFiles = [];
    // return
    fileNames.map(filename => {
        let match = !!filename.match(/\.(csv|xls)$/);
        if (!match) {
            invalidFiles.push(filename);
        }

        // console.log(filename, match)

    });

    if (invalidFiles.length === 0) next();
    else {
        console.log('aaaasa')
        res.status(424).json({msg: "invalid_file_type", files: invalidFiles.join('<br>')});
    }
    // ? next() // let multer do the job
    // : res.status(424).json({msg: "invalid_file_type", files: fileNames.join('<br>')});
};
