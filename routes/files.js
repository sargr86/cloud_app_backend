const router = express.Router();
const filesController = require('../controllers/filesController');
const fileUpload = require('express-fileupload');

router.post('/import', importFilesUpload, filesController.import); //,fileUpload(),checkFiles


module.exports = router;
