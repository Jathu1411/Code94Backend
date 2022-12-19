const router = require("express").Router();
const service = require("../controllers/Favorite");

router.post("/add", service.addFavorite);

router.get("/getAll", service.getAllFavorites);

module.exports = router;
