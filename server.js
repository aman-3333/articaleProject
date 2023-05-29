
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser()); 


const port = process.env.PORT || 3000;

const Route = require("./routes");
app.use("/api", Route);

mongoose
  .connect('mongodb://127.0.0.1:27017/articale', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((error) => {
    console.log(error);
  });

// Starting server
app.listen(3000, () => {
  console.log("Server is starting on port", port)
});