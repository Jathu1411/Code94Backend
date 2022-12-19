const favorite = require("../models/Favorite");
const addFavorite = async (req, res) => {
  try {
    const newFavorite = new favorite({
      productList: req.body.productList,
    });
    await newFavorite.save();
    res.status(201).send("Favorite Added Successfully !!!");
  } catch (error) {
    res
      .status(400)
      .send({ status: "An Error Ocuured !!", error: error.message });
  }
};

const getAllFavorites = async (req, res) => {
  try {
    const favorites = await favorite
      .find()
      .populate("productList", "sku quantity name description images");
    res.status(200).send(favorites);
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error with get all favorites", error: error });
  }
};

module.exports = {
  addFavorite,
  getAllFavorites,
};
