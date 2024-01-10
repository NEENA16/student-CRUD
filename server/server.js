const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const studentRoutes = require("./src/student/routes");
const userRoutes = require("./src/authentication/routes");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions = { credentials: true, origin: process.env.URL || "*" };

//middleware
app.use(cors(corsOptions)); //BE can interact with FE
app.use(express.json()); // helps to access req.body from api
app.use(cookieParser()); // if using cookie in authetication
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/students", studentRoutes);
app.use("/auth", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
