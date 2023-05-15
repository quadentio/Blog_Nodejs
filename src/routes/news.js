var express = require('express');
var router = express.Router();
const newsController = require('../app/controllers/NewsController');

// Router đọc từ trên xuống
// Tuyến đường dưới cùng là tiến đường đơn giản nhất

router.use('/:slug', newsController.show);
router.use('/', newsController.index);

module.exports = router;