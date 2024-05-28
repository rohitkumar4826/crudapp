const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoute = require("./routes/student.routes");
const createError = require("http-errors"); // Assuming you're using this for error creation
const dotenv = require('dotenv');
dotenv.config();
// Connecting mongoDB Database
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err.reason));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/students", studentRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err = createError(500);
  res.status(err.statusCode).send(err.message);
});
