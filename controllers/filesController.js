/**
 * Does the files importing process
 * @param req
 * @param res
 */
exports.import = (req, res) => {
    importFilesUpload(req, res, async (err) => {
        console.log('aaaa')

        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(424).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {

            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }
            res.json("OK");
        }
    });
};