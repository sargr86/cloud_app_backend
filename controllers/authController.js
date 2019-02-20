require('../constants/sequelize');

/**
 * Registers a user in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.register = async (req, res) => {
    let data = req.body;

    uploadProfileImg(req, res,  async(err) =>{
        let file = req.file;
        if(file){
            if(file.size > UPLOAD_MAX_FILE_SIZE) res.status(423).json('limit_file_size');
            else {
                let filetypes = /jpeg|jpg/;
                let mimetype = filetypes.test(file.mimetype);
                let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (!mimetype && !extname) {
                    res.status(423).json('invalid_file_type');
                }
            }

        }
        else if(req.file){

        }
        // Getting validation result from multer
       else if (err) {
            res.status(423).json(err.code.toLowerCase())
        }
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

             data.password = originalPass;

             this.login(req,res);
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