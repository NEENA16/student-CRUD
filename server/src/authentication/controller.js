const pool = require("../../db");
const bcrypt = require("bcrypt");
const queries = require("./queries");
const jwtGenerator = require("../utils/jwtGenerator");

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
    res.json({ token });

  } catch (e) {
    console.log("error in catch", e);
    res.status(500).send("Something went wrong");
  }
};

const loginUser = (req, res) => {
  res.send("Login User");
};

module.exports = { registerUser, loginUser };
