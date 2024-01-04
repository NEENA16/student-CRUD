const express = require("express");
// const cors = require("cors");
const studentRoutes = require("./src/student/routes");
const userRoutes = require("./src/authentication/routes");

const app = express();

const PORT = 3000;

//middleware
app.use(express.json()); // helps to access req.body from api
// app.use(cors);  //BE can interact with FE
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/students", studentRoutes);
app.use("/auth", userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
