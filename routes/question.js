import Image from "../models/image.model";
import Movie from "../models/movie.model";

import { Router } from "express";

const questionRouter = Router();
const imgFolder = `http://localhost:5000/images/files/`; //TODO change to process.env.PORT
questionRouter.route("/").get((req, res) => {
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

export default questionRouter;
