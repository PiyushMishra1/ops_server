var express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.log("database not connected");
    throw err;
  } else {
    console.log("Database Connected");
  }
});
module.exports = connection;
