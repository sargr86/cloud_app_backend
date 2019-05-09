const router = express.Router();
const filesController = require('../controllers/filesController');
const fileUpload = require('express-fileupload');

router.post('/import', fileUpload(), checkFiles, importFilesUpload, filesController.import);


module.exports = router;