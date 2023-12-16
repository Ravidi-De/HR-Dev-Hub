import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});

const Image = mongoose.model('Image', ImageSchema);

Image.syncIndexes();

export default Image;
