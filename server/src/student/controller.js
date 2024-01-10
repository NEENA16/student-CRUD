const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool?.query(queries.getStudents, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const createStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  if (!name || !email || !age || !dob) {
    res.status(201).send("Fields cannot be empty");
  }
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.status(201).send("Email already exist");
    }
    pool.query(
      queries.createStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) {
          res.status(500).send("Internal Server Error");
        } else {
          res.status(201).send("Student created successfully");
        }
      }
    );
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    res.status(400).send("Id cannot be empty");
  }
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = results && !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist");
    } else {
      pool.query(queries.deleteStudent, [id], (error, results) => {
        if (error) {
          res.status(500).send("Something went wrong");
        } else {
          res.status(200).send("Student deleted successfully");
        }
      });
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = results && !results.rows.length;
    if (noStudentFound) {
      res.send("Studednt does not exist");
    } else {
      pool.query(queries.updateStudent, [id, name], (error, results) => {
        if (error) res.status(500).send("Something went wrong");
        else res.status(200).send("Studednt updated successfully");
      });
    }
  });
};

const searchStudent = (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400).send("Name parameter is required");
    return;
  }

  // Use ILIKE for case-insensitive partial match
  pool.query(queries.searchStudent, [`%${name}%`], (error, results) => {
    if (error) {
      res.status(500).send("Something went wrong");
    } else if (results.rows.length) {
      res.send(results.rows);
    } else {
      res.send("Student does not exist in the database");
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
  searchStudent,
};
