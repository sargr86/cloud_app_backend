const router = express.Router();
const authController = require('../controllers/authController');
const validateRegister = require('../validators/validateRegister');

router.post('/register',uploadProfileImg,validateRegister.rules,authController.register);

module.exports = router;