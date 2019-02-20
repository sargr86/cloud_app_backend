const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/getById',usersController.getUserById);
router.get('/get',usersController.getUsers);
router.put('/change-status',usersController.changeUserStatus);

module.exports = router;