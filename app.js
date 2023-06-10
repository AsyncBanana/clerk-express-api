require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var clerk = require("@clerk/clerk-sdk-node");

var indexRouter = require("./routes/index");
var protectedRouter = require("./routes/protected");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html"],
  })
);

app.use("/", indexRouter);
app.use("/protected", clerk.ClerkExpressWithAuth({
  
}), protectedRouter);
module.exports = app;
