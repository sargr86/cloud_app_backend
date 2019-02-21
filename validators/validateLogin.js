require('../constants/sequelize')

const rules = [
    body('email').not().isEmpty().withMessage('email_required_error').isEmail().withMessage('email_invalid_error'),
    body('password', 'password_required_error').not().isEmpty(),
    body().custom(async(req)=>{
        let email = req.email;
        let pass = req.password;

        // Checking email existence & passwords match
        let found = await Users.findOne({attributes:['email','password'],where:{email:email}});
        if(!found) throw new Error('wrong_user');
        let match = await bcrypt.compare(pass, found.password);

        // Passwords mismatch case
        if (!match) throw new Error('wrong_pass')
    })
];

module.exports = {
    rules
};