
// userQueries.js

// Vérifie si un email existe déjà (renvoie true/false)
async function emailExists(db, email) {
  const [rows] = await db.query('SELECT COUNT(*) AS count FROM user WHERE email = ?', [email]);
  return rows[0].count > 0;
}

// Récupère un utilisateur complet par son email
async function getUserByEmail(db, email) {
  const [rows] = await db.query('SELECT id, email, name, firstname, password FROM user WHERE email = ?', [email]);
  // Renvoie l'utilisateur ou null si pas trouvé
  return rows[0] || null;
}

// Crée un utilisateur
async function createUser(db, email, username, password) {
  const [result] = await db.query(
    'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)',
    [email, name, firstname, password]
  );
  return result;
}

// Récupère juste les infos nécessaires pour le token après l'inscription
async function getUserForToken(db, email) {
    const [rows] = await db.query('SELECT id, email, name FROM user WHERE email = ?', [email]);
    return rows[0];
}

module.exports = {
  emailExists,
  getUserByEmail,
  createUser,
  getUserForToken
};
