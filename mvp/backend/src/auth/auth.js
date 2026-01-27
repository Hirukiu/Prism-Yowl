// authRoutes.js
const express = require('express');
const auth = express.Router();

// Importation des deux autres fichiers
const queries = require('./userQueries');
const utils = require('./authUtils');

// --- Route Register ---
auth.post('/register', async (req, res, next) => {
  console.log("register endpoint reached");
  try {
    const db = req.app.locals.db;
    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password) {
      const error = new Error('Missing parameters');
      error.name = 'BadRequestError';
      throw error;
    }

    // 1. Vérifier si l'utilisateur existe via le fichier queries
    const userAlreadyExists = await queries.emailExists(db, email);
    if (userAlreadyExists) {
      return res.status(409).json({ "msg": "Account already exists" });
    }

    // 2. Hacher le mot de passe via le fichier utils
    const hashedPassword = utils.hashPassword(password);

    // 3. Insérer l'utilisateur via le fichier queries
    await queries.createUser(db, email, name, firstname, hashedPassword);
    console.log("registered");

    // 4. Récupérer les infos pour le token
    const newUser = await queries.getUserForToken(db, email);

    // 5. Générer le token via le fichier utils
    const token = utils.generateToken(newUser);
    
    return res.status(201).json({ token });

  } catch (err) {
    next(err);
  }
});

// --- Route Login ---
auth.post('/login', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Missing parameters');
      error.name = 'BadParametersError';
      throw error;
    }

    // 1. Chercher l'utilisateur via le fichier queries
    const user = await queries.getUserByEmail(db, email);

    if (!user) {
      return res.status(401).json({ "msg": "Invalid credentials" });
    }

    // 2. Vérifier le mot de passe via le fichier utils
    const isPasswordValid = utils.verifyPassword(password, user.password);

    if (isPasswordValid) {
      // 3. Générer le token
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
