require('dotenv').config();

const {
  PORT = 3000,
  SERVER_ADR = 'http://127.0.0.1',
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET_KEY = 'secret-key',
} = process.env;

const salt = 10;

module.exports = {
  PORT,
  SERVER_ADR,
  DB_URL,
  JWT_SECRET_KEY,
  salt,
};
