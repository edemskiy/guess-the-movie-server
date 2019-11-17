const Image = require("../models/image.model");
const Movie = require("../models/movie.model");

const path = require("path");
const questionRouter = require("express").Router();

require("dotenv").config();

questionRouter.route("/").get((req, res) => {
  const imgFolder = `${req.hostname}:${process.env.PORT}/images/files/`;
  Movie.aggregate([{ $sample: { size: 4 } }])
    .then(movies => Image.populate(movies, { path: "images" }))
    .then(movies => {
      const movie = movies[Math.floor(Math.random() * 4)];
      const imageURL =
        imgFolder +
        movie.images[Math.floor(Math.random() * movie.images.length)].name;
      const choises = movies.map(movie => movie.title);
      const answer = movie.title;

      res.json({ imageURL, choises, answer });
    });
});

module.exports = questionRouter;
