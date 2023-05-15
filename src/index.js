// Library
const express = require('express');
// Lib help log HTTP request condition
const morgan = require('morgan');
// Lib help render static view file
const handlebars = require('express-handlebars');
// Lib help create css file base on scss file
const sass = require('node-sass');
// Lib for file operations
const fs = require('fs');
// Lib for path operations
const path = require('path')
// Router
const route = require('./routes')

// Application
const app = express();
const port = 3000;

// Middleware

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// XMLHttpRequest, fetch, axios, ajax (thư viện - gửi dữ liệu lên server dưới POST hoặc GET)
// express.json() gửi dữ liệu từ client -> server ở javascript

// HTTP logger
// app.use(morgan('combined'));

// Template engine
const vename = 'hdb';
app.engine(vename, handlebars.engine({
  // Options go here
  extname: "." + vename
}));
// Set view engine using handlebars
app.set('view engine', vename);

// Set view
app.set('views', path.join(__dirname, './resources/views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

const scssHandler = {
  srcDir: "./src/resources/scss/",
  desDir: "./src/public/css/",

  compileSass: function(file) {
    const inputFilePath = path.join(scssHandler.srcDir, file);
    const outputFilePath = path.join(scssHandler.desDir, path.basename(file, '.scss') + '.css')
    const option = {file: inputFilePath }
    sass.render(option, (err, result) => {
      if (err) throw err;
      fs.writeFile(outputFilePath, result.css, (err) => {
        if (err) throw err;
        console.log(`Compiled ${inputFilePath} to ${outputFilePath} success`);
      });
    });
  },

  watchForChange_callback: function(event, fileName) {
    if (path.extname(fileName) !== '.scss' || fileName[0] == '_') return;

    console.log(`${event.toUpperCase()}: ${fileName}`);

    scssHandler.compileSass(fileName);
  },

  readDir_callback: function(err, files) {
    if (err) throw err;

    files.forEach(file => {
      if (path.extname(file) !== '.scss' || file[0] == '_') return;
      scssHandler.compileSass(file);
    });
  },

  init: function() {
    fs.watch(this.srcDir, this.watchForChange_callback);
    fs.readdir(this.srcDir, this.readDir_callback);
  }
}
scssHandler.init();

// --ROUTER--
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// Local hose --- hosting
// Action ---> Dispatcher ---> Function handler
