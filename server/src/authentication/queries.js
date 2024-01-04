const getUserByEmail = "SELECT * FROM users WHERE email=$1";
const registerUser =
  "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,password";
  
module.exports = { getUserByEmail, registerUser };
