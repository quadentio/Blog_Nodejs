class NewsController {

    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEWS DETAIL');
    }
}

// Xuất ra ngoài
// export cái gì thì bên ngoài require nhận được cái đó
module.exports = new NewsController;

const newController = require('./NewsController')