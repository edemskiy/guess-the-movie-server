import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }]
});
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
