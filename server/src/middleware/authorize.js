// FE we will pass the access token to all susequent api calls, the standard way is to have a authorization header
// 'Authorization': Bearer 'Bearer_token'

//  this below function ie, autheticateToken will check the token sent by FE is valid or not
// and we will use this middleware in routes that needs to be authenticated

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"]; //fetch from headers whose key is authorization,  o/p is  Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1]; // get the token
  if (token == null) {
    return res.status(401).json({ error: "Null Token" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next(); //carry on other flow
  });
};

