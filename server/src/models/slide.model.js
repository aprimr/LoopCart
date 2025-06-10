import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  slideTitle: {
    type: String,
    required: true,
  },
  slideSubtitle: {
    type: String,
    required: true,
  },
  slideTag: {
    type: [""],
    required: true,
  },
  slideLink: {
    type: String,
    required: true,
  },
  slideImage: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Slide = mongoose.model("Slide", slideSchema);
export default Slide;
