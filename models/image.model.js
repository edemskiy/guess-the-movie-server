const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
