const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {

    // Only request to /news/* will be sent to our router
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
