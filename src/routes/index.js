const newsRouter = require('./news.route');
const siteRouter = require('./site.route');

function route(app) {
  // Only request to /news/* will be sent to our router
  app.use('/news', newsRouter);
  app.use('/', siteRouter);
}

module.exports = route;
