const bcrypt = require('bcrypt');

const checkPassword = async (password, myPassword) => {
  return await bcrypt.compare(password, myPassword);
};

const generatePassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

module.exports = {
  checkPassword,
  generatePassword,
};
