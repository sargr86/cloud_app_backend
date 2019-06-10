var mongoose = require('mongoose');
var moment = require('moment');


/**
 * Does the files importing process
 * @param req
 * @param res
 */
exports.import = (req, res) => {
    let data = req.body;
    let user = this.getUserData(req);

    // Handling file upload errors
    importFilesUpload(req, res, async (err) => {


        mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, (err) => {
            console.log(err)
            // throw new Error(err);
        });

        var db = mongoose.connection;
        db.on('error', (err) => {
            // throw  new Error(err);
            // res.json(err)
        });
        db.once('open', function () {
            // we're connected!
            console.log('Connected to Mongo!!!')
        });


        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(424).json(req.fileTypeError);
        }


        let ret = this.saveData(data, user);
        console.log(ret)
        // Getting multer errors if any
        if (err) res.status(423).json(err);

        // If file validation passed, proceeding to the request data validation
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


exports.getUserData = (req) => {
    let ret;
    // Retrieving user data here
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    // if(process.env.NODE_ENV === 'production')
    if (!token) {
        res.status(500).send('Auth token is not supplied');
    } else {

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                ret = '';
            } else {
                req.decoded = decoded;
                ret = decoded;
            }
        })
    }
    return ret;
};

exports.saveData = (data, user) => {

    let ret = [];

    let files = [];


    // Handling multiple & one file upload
    if (data.imported_files instanceof Array) {
        files = data.imported_files;
    } else files.push(data.imported_files);

    let schemaObj = {filename: 'String', data: []};
    files.map(async (filename) => {
        const XLSX = require('xlsx');
        const mongoData = {
            file_name: filename,
            data: [],
            file_type: data.type,
            import_date: moment().format('YYYY-MM-DD'),
            import_by: user.first_name_en + ' ' + user.last_name_en,
            total_records: 0
        };

        var workbook = XLSX.readFile(TRANSACTIONS_UPLOAD_FOLDER + filename);// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
        var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); //if you have multiple sheets

        let fileDataSchema;
        let fileData;

        let list = sheetData.map(async (d) => {
            // schemaObj['filename'] = typeof filename;
            let dataObj = {};
            // mongoData['data'].push(d);

            mongoData['total_records'] = sheetData.length;
            for (let k in d) {
                dataObj[k] = typeof d[k];
                schemaObj['data'].push(dataObj);
                // schemaObj['filename'] = 'String';
            }
        });
        ret.push(mongoData);
        if (!fileDataSchema) {
            fileDataSchema = new mongoose.Schema(schemaObj, {strict: false});
        }
        if (!mongoose.models.fileData) {
            fileData = mongoose.model('fileData', fileDataSchema);
        } else {
            fileData = mongoose.model('fileData');
        }

        let fd = new fileData(mongoData);

        let result = await to(fd.save());
        const results = await Promise.all(list);

    });


    return ret;
};
