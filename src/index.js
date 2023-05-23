// Library
const express = require("express");
// Lib help log HTTP request condition
const morgan = require("morgan");
// Lib help render static view file
const handlebars = require("express-handlebars");
// Router
const route = require("./routes");
// Lib for path operations
const path = require("path");
// Watch and render scss
const scssHandler = require("./scss");

// Application
const app = express();
const port = 3000;

// Middleware

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// XMLHttpRequest, fetch, axios, ajax (thư viện - gửi dữ liệu lên server dưới POST hoặc GET)
// express.json() gửi dữ liệu từ client -> server ở javascript

// HTTP logger
// app.use(morgan('combined'));

// Template engine
const vename = "hdb";
app.engine(
  vename,
  handlebars.engine({
    // Options go here
    extname: "." + vename,
  })
);
// Set view engine using handlebars
app.set("view engine", vename);

// Set view
app.set("views", path.join(__dirname, "./resources/views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Watch and render css
scssHandler.init();

// --ROUTER CONFIG--
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Local host --- hosting
// Action ---> Dispatcher ---> Function handler
