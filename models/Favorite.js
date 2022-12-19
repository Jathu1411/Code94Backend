const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FavoriteSchema = new Schema({
  productList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      requred: false,
    },
  ],
});

const favorites = mongoose.model("Favorites", FavoriteSchema);
module.exports = favorites;
