require('../constants/sequelize')

const rules = [
    body('email').not().isEmpty().withMessage('email_required_error').isEmail().withMessage('email_invalid_error'),
    body('gender', 'gender_required_error').not().isEmpty(),
    body().custom(async (req) => {
        let lang = req.lang;
        let email = req.email;

        // Retrieving a user with request email
        let user = await Users.findOne({where: {email: email}});

        // Checking if user wrote first name and last name
        if (req['first_name_' + lang] === '' || req['last_name_' + lang] === '') {
            throw new Error('full_name_required_error')
        }

        else return true;
    }),


];

module.exports = {
    rules
};