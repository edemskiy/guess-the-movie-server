const Movie = require("../models/movie.model");
const moviesRouter = require("express").Router();

moviesRouter.route("/").get((req, res) => {
  Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

moviesRouter.route("/add").post((req, res) => {
  const title = req.body.title;
  const newMovie = new Movie({ title });

  newMovie
    .save()
    .then(() => res.json("Movie has been added"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = moviesRouter;
