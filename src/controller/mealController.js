import Meal from "../model/meal.js";

export const getMeals = async (req, res) => {
  const meals = await Meal.find();
  res.status(200).json({ meals });
};

export const createMeal = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";

    const meal = new Meal({
      name,
      description,
      price,
      image: imagePath, // saves path like uploads/123.jpg
    });

    await meal.save();

    res.status(201).json({ msg: "Meal created", meal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteMeal = async (req, res) => {
  await Meal.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Meal deleted" });
};
