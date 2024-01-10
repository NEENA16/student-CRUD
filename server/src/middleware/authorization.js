//check the jwt token in header is valid or not before we access protected routes

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // take the token from req header  send fro FE on calling api
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    // verify the incoming token is valid or not
    // if verified the jwt.verify will return a payload that we can use in our routes
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user; // coz in jwtGenerator we declared payload as an object with a key user and value the argument
  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Not Authorized");
  }
};
