/**
 * Does the files importing process
 * @param req
 * @param res
 */
exports.import = (req, res) => {
    let data = req.body;
    importFilesUpload(req, res, async (err) => {


        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(424).json(req.fileTypeError);
        }

        let ret = this.saveData(data);

        // Getting multer errors if any
        if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {

            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }
            res.json(ret);
        }
    });
};

exports.saveData = (data) => {

    let ret = [];

    let files = [];

    // Handling multiple & one file upload
    if (data.imported_files instanceof Array) {
        files = data.imported_files;
    } else files.push(data.imported_files);


    files.map(filename => {
        const XLSX = require('xlsx');

        var workbook = XLSX.readFile(TRANSACTIONS_UPLOAD_FOLDER + filename);// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
        var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
        data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); //if you have multiple sheets

        ret.push(data);
        // ret[filename] = data
    });
    return ret;
};
