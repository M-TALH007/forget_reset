const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cors = require("cors");
require("express-async-errors");
const connection = require("./db");
let app = express();
// const flash = require('express-flash');
const newPath = path.join(__dirname,"public")
const dotenv = require('dotenv');
dotenv.config();


app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(newPath));
app.set("view engine", "ejs");
app.use(cookieParser());
app.set("layout", "layouts/layout.ejs");
app.use(cors());

app.use(
  session({
    secret: process.env.secret,
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
// app.use(flash());
app.use(require("./middlewares/siteSetting"));
app.use("/", require("./routes/auth"));

app.get("/contact", (req, res) => {
    // res.send("Hello contact");
  res.render("contact");
});

app.get("/", (req, res) => {
  // res.send("Hello contact");
res.render("home");
});


app.get(
  "/dashboard",
  require("./middlewares/checkSessionAuth"),
  async (req, res) => {
    // const errorMessage = req.flash('error')[0];

    // return res.render("dashboard", { errorMessage });
    return res.render("dashboard");
  }
);


app.get("/cookie-test", (req, res) => {
  let views = req.cookies.views ? req.cookies.views : 0;
  views = Number(views) + 1;
  res.cookie("views", views);
  return res.send(`You Visited ${views} times`);
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

let port = 1000;
app.listen(port, () => {
  console.log(`App Listening on http://localhost:` + port);
});

let connection1 = async function db(){
  await connection();
}
connection1();
