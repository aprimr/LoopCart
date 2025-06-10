import User from "../models/user.model.js";
import Slide from "../models/slide.model.js";

const addNewSlide = async (req, res) => {
  const { slideTitle, slideSubtitle, slideTag, slideLink, slideImage } =
    req.body;
  const user = req.user.id;
  try {
    // check the role
    const currentUser = await User.findById({ _id: user });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // add new slide
    const newSlide = new Slide({
      slideTitle,
      slideSubtitle,
      slideTag,
      slideLink,
      slideImage,
    });
    await newSlide.save();
    res.status(200).json({ message: "Slide added successfully" });
  } catch (error) {
    console.error("Error adding slide:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteSlide = async (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  try {
    // check the role
    const currentUser = await User.findById({ _id: user });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // delete slide
    const result = await Slide.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Slide not found" });
    }
    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    console.error("Error deleting slide:", error);
    return res.status(500).json({ message: error.message });
  }
};

const fetchSlides = async (req, res) => {
  const user = req.user.id;
  try {
    // check the role
    const currentUser = await User.findById({ _id: user });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // fetch all slides
    const slides = await Slide.find({});
    res.status(200).json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    return res.status(500).json({ message: error.message });
  }
};

export { addNewSlide, fetchSlides, deleteSlide };
