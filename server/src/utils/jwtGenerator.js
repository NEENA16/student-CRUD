const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  // return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
  return { accessToken, refreshToken };
}

module.exports = jwtGenerator;
// or
// export { jwtGenerator };
