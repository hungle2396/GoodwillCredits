const fs = require("fs");
const dotenv = require("dotenv");
const dontenvConfig = require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_NAME_DEV,
    "host": process.env.DB_HOST_DEV,
    "port": process.env.DB_PORT,
    "dialect": 'mysql'
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": 'b79ccfd0c786e1',
    "password": '993e2ef0',
    "database": 'heroku_24bc5210bcfdf97',
    "host": 'us-cdbr-east-06.cleardb.net',
    "dialect": 'mysql'
  }
}
