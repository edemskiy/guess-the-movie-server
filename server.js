const moviesRouter = require("./routes/movies");
const imagesRouter = require("./routes/images");
const questionRouter = require("./routes/question");

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .catch(err => console.log(`mongoConnectionError: ${err.message}`));

const db = mongoose.connection;
db.once("open", () => {
  console.log("Sucessfully connected to MongoDB");
});

app.use("/images/files", express.static(__dirname + "/images"));

app.use("/movies", moviesRouter);
app.use("/images", imagesRouter);
app.use("/question", questionRouter);

app
  .listen(port, () => {
    console.log(`server running on port: ${port}`);
  })
  .on("error", err => console.log(`error: ${err.message}`));
