var express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.USER,
  password: "",
  database: process.env.DATABASE,
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
