const router = express.Router();
const filesController = require('../controllers/filesController');

router.post('/import', importFilesUpload, filesController.import);


module.exports = router;