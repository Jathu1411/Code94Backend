const router = require("express").Router();
const { upload } = require("../helpers/Filehelper");
const service = require("../controllers/Product");

router.get("/getAll", service.getAllProducts);

router.post("/add", upload.array("images"), service.createProduct);

router.put("/update/:id", upload.array("images"), service.updateProduct);

router.delete("/delete/:id", service.deleteProduct);

router.get("/get/:id", service.getProductById);

router.get("/search/:name", service.searchProduct);

module.exports = router;
