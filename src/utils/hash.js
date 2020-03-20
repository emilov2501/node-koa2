const bcrypt = require('bcrypt');

async function hashing(value) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(value, salt)
  return hash;
}

module.exports = hashing;
