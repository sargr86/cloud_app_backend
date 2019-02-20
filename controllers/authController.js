require('../constants/sequelize');

let help = require('../helpers/index');

/**
 * Registers a user in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.register = async (req, res) => {
    let data = req.body;

    uploadProfileImg(req, res, async (multerErr) => {

        // Validating file size & type
        let error = help.validateFile(req.file);
        if (error) {
            res.status(423).json(error);
        }

        // Getting multer errors if any
        else if (multerErr) res.status(423).json(multerErr);

        // If file validation passed, heading to the request data validation
        else {

            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }

            // Saving the original password of user and hashing it to save in db
            let originalPass = data.password;
            data.password = bcrypt.hashSync(originalPass, 10);

            await Users.create(data);

            // Saving the original password again to request for authenticating the user at once
            data.password = originalPass;
            req.body = data;

            this.login(req, res);
        }


    })


};

/**
 * Authenticates the user
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    // Getting request data and setting user fields to return
    let data = req.body;
    let email = data.email.trim();
    let lang = data.lang;
    let attributes = [`first_name_${lang}`, `last_name_${lang}`, 'email', 'profile_img', 'password'];

    // Selecting an employee that has an email matching request one
    let user = await Users.findOne({
        attributes: attributes, where: {email: email},
        include: [
            {model: Roles}
        ]
    });
    if (!user) return;

    // Cloning users object without password and saving user full name
    let {password, ...details} = user.toJSON();
    let full_name = user[`first_name_${lang}`] + ' ' + user[`last_name_${lang}`];


    res.status(200).json({
        token: jwt.sign(details
            , 'secretkey', {expiresIn: '8h'}), user_id: user.id, full_name: full_name
    })

};