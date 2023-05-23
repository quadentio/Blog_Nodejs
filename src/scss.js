// Lib for file operations
const fs = require('fs');
// Lib for path operations
const path = require('path');
// Lib help create css file base on scss file
const sass = require('node-sass');

var scssHandler = {
  srcDir: './src/resources/scss/',
  desDir: './src/public/css/',

  compileSass: function (file) {
    const inputFilePath = path.join(scssHandler.srcDir, file);
    const outputFilePath = path.join(
      scssHandler.desDir,
      path.basename(file, '.scss') + '.css',
    );
    const option = { file: inputFilePath };
    sass.render(option, (err, result) => {
      if (err) throw err;
      fs.writeFile(outputFilePath, result.css, (err) => {
        if (err) throw err;
        console.log(`Compiled ${inputFilePath} to ${outputFilePath} success`);
      });
    });
  },

  watchForChange_callback: function (event, fileName) {
    if (path.extname(fileName) !== '.scss' || fileName[0] == '_') return;

    console.log(`${event.toUpperCase()}: ${fileName}`);

    scssHandler.compileSass(fileName);
  },

  readDir_callback: function (err, files) {
    if (err) throw err;

    files.forEach((file) => {
      if (path.extname(file) !== '.scss' || file[0] == '_') return;
      scssHandler.compileSass(file);
    });
  },

  init: function () {
    fs.watch(this.srcDir, this.watchForChange_callback);
    fs.readdir(this.srcDir, this.readDir_callback);
  },
};

module.exports = scssHandler;
