require('../constants/sequelize')

const rules = [
    body('email').not().isEmpty().withMessage('email_required_error').isEmail().withMessage('email_invalid_error'),
    body('password', 'password_required_error').not().isEmpty()
];

module.exports = {
    rules
};