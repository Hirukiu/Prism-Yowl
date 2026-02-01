
async function emailExists(db, email) {
  const [rows] = await db.query('SELECT COUNT(*) AS count FROM user WHERE email = ?', [email]);
  return rows[0].count > 0;
}

async function getUserByEmail(db, email) {
  const [rows] = await db.query('SELECT id, email, username, password FROM user WHERE email = ?', [email]);
  return rows[0] || null;
}

async function createUser(db, email, username, password) {
  const [result] = await db.query(
    'INSERT INTO user (email, username, password) VALUES (?, ?, ?)',
    [email, username, password]
  );
  return result;
}

async function getUserForToken(db, email) {
    const [rows] = await db.query('SELECT id, email, username FROM user WHERE email = ?', [email]);
    return rows[0];
}

module.exports = {
  emailExists,
  getUserByEmail,
  createUser,
  getUserForToken
};
