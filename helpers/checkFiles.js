module.exports = (req, res, next) => {

    let reqFiles = req.files['imported_file'];
    let files = [];

    // Handling multiple & one file upload
    if (reqFiles instanceof Array) {
        files = reqFiles;
    } else files.push(reqFiles);

    const fileNames = Object.keys(files).map(key => files[key].name).filter(n => n);
    return fileNames.every(filename => !!filename.match(/\.(csv|xls)$/))
        ? next() // let multer do the job
        : res.status(424).json({msg: "invalid_file_type", files: fileNames.join('<br>')});
};