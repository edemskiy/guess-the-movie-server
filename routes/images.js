const Image = require("../models/image.model");
const Movie = require("../models/movie.model");

const imagesRouter = require("express").Router();
imagesRouter.route("/").get((req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

imagesRouter.route("/add").post((req, res) => {
  const name = req.body.name;
  const title = req.body.title;

  Movie.findOne({ title }).exec((err, movie) => {
    if (err) {
      console.log(`error: ${err.message}`);
    }

    const newImage = new Image({ name, movie });
    newImage
      .save()
      .then(() => {
        movie.images.push(newImage);
        movie.save().catch(err => res.status(400).json(`Error: ${err}`));
      })
      .then(() => res.json("Image has been added"))
      .catch(err => res.status(400).json(`Error: ${err}`));
  });
});

module.exports = imagesRouter;
