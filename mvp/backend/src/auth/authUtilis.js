// authUtils.js
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const key = process.env.SECRET;

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}

function verifyPassword(password, hashedPassword) {
  return bcryptjs.compareSync(password, hashedPassword);
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    key,
    { expiresIn: '1h' }
  );
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken
};
