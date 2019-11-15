import moviesRouter from "./routes/movies";
import imagesRouter from "./routes/images";
import questionRouter from "./routes/question";

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

app.get("/", (req, res) => {
  res.send("hello startpage");
});

app.get("/api/random-choises", (req, res) => {
  n = req.query.n;
  fs.readdir("images/", (err, files) => {
    if (err) {
      response = err.message;
    } else {
      if (n > files.length) {
        n = files.length;
      }

      choises = files.sort(() => 0.5 - Math.random()).slice(0, n);
      image = `images/${choises[Math.floor(Math.random() * n)]}`;

      choises = choises.map(name => name.slice(0, name.lastIndexOf(".")));
      response = { choises, image };
    }
    res.send(JSON.stringify(response));
  });
});

app
  .listen(port, () => {
    console.log(`server running on port: ${port}`);
  })
  .on("error", err => console.log(`error!!: ${err.message}`));
