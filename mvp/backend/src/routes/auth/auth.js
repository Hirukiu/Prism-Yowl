const express = require('express');
const auth = express.Router();

const queries = require('./userQueries');
const utils = require('./authUtilis');

auth.post('/register', async (req, res, next) => {
  console.log("register endpoint reached");
  try {
    const db = req.app.locals.db;
    const { email, username, password, confirmation_password } = req.body;

    if (!email || !username || !password || !confirmation_password || password != confpassword) {
      const error = new Error('Missing parameters');
      error.name = 'BadRequestError';
      throw error;
    }
	
    const userAlreadyExists = await queries.emailExists(db, email);
    if (userAlreadyExists) {
      return res.status(409).json({ "msg": "Account already exists" });
    }

    const hashedPassword = utils.hashPassword(password);

    await queries.createUser(db, email, username, hashedPassword);
    console.log("registered");

    const newUser = await queries.getUserForToken(db, email);

    const token = utils.generateToken(newUser);
    
    return res.status(201).json({ token });

  } catch (err) {
    next(err);
  }
});

auth.post('/login', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Missing parameters');
      error.name = 'BadParametersError';
      throw error;
    }

    const user = await queries.getUserByEmail(db, email);

    if (!user) {
      return res.status(401).json({ "msg": "Invalid credentials" });
    }

    const isPasswordValid = utils.verifyPassword(password, user.password);

    if (isPasswordValid) {
      const token = utils.generateToken(user);
      res.status(200).json({ "token": token });
    } else {
      res.status(401).json({ "msg": "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = auth;
