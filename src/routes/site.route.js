var express = require('express');
var router = express.Router();
const siteController = require('../app/controllers/SiteController');

// Router đọc từ trên xuống
// Tuyến đường dưới cùng là tiến đường đơn giản nhất

router.use('/search', siteController.search);
router.use('/', siteController.index);

module.exports = router;
