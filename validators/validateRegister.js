const rules = [
    body('email').not().isEmpty().withMessage('email_required_error').isEmail().withMessage('email_invalid_error'),
    body('password', 'password_required_error').not().isEmpty(),
    body('gender', 'gender_required_error').not().isEmpty(),
    body().custom(req=>{
        let lang = req.lang;
        let email = req.email;
        if(req['first_name_'+lang] === '' || req['last_name_'+lang] === ''){
            throw new Error('full_name_required_error')
        }

        else return true;
    }),



];

module.exports = {
    rules
}