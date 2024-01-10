const pool = require("../../db");
const bcrypt = require("bcrypt");
const queries = require("./queries");
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  //1. destucture the req.body
  //2. check if user exists (if exist throw error)
  //3. bcrypt the user password
  //4. enter the new user insde the database
  //5. generate jwt token

  // destructure req.body
  const { name, email, password, confirmPassword } = req.body;
  try {
    let errors = [];
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: "Please enter all fields" });
    } else if (password.length < 6) {
      errors.push({ message: "Password should be atleast 6 characters" });
    } else if (password != confirmPassword) {
      errors.push({ message: "Passwords do not match" });
    }
    if (errors.length) {
      return res.status(401).send(errors);
    }
    // check if user exist (if yes throw error)
    const userExist = await pool.query(queries.getUserByEmail, [email]);
    if (userExist.rows.length > 0) {
      errors.push({ message: "User already registered" });
      return res.status(401).send(errors);
    }

    //bcrypt the password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    let bcryptPassword = await bcrypt.hash(password, salt); // (password to encrypt, number of rounds to encyrpt)

    //insert user to db
    const newUser = await pool.query(queries.registerUser, [
      name,
      email,
      bcryptPassword,
    ]);

    //generating jwt token
    const token = jwtGenerator(newUser?.rows[0].id);

    res.json(token);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

const loginUser = async (req, res) => {
  //1. destructure req.body
  //2. check if user exist (if no thow error)
  //3. check if incoming password is same as db password
  //4. give them the jwt token access and refresh token and set refresh token in cookie (for cookie approach)

  //destructure req.body
  const { email, password } = req.body;
  let errors = [];
  if (!email || !password) {
    errors.push({ message: "Please enter all the fields" });
  }
  if (errors.length) {
    return res.status(401).send(errors);
  }

  //check if user exit
  const user = await pool.query(queries.getUserByEmail, [email]);
  if (!user.rows.length) {
    return res.status(401).json("User does not exist");
  }

  //check if incoming password is same as db password
  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) {
    return res.status(401).json("Email or Password is incorrect");
  }

  //give them the jwt tokens
  const token = jwtGenerator(user.rows[0].id);
  res.cookie("refresh_token", token.refreshToken, { httpOnly: true }); // to set cookie in headers(in res headers get  (set-cookie: regresh_token='our token')
  res.json(token);
};

const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log(refreshToken);
    if (refreshToken === null)
      return res.status(401).json({ error: "Null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtGenerator(user);
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, refreshToken, logout };
