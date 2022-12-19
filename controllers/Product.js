let product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  product
    .find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Get a product by id
const getProductById = async (req, res) => {
  let productId = req.params.id;
  await product
    .findById(productId)
    .then((product) => {
      res.status(200).send({ status: "Product fetched", data: product });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get a product", error: err.message });
    });
};

//create a new product

const createProduct = async (req, res) => {
  try {
    let imageArray = [];
    const basePath = `${req.protocol}://${req.get("host")}/`;
    req.files.forEach((element) => {
      const newPath = element.path.replace(/\\/g, "/");
      const file = {
        fileName: element.originalname,
        filePath: `${basePath}${newPath}`,
        fileType: element.mimetype,
        fileSize: fileSizeFormat(element.size, 3),
      };

      imageArray.push(file);
    });
    const newProduct = new product({
      title: req.body.title,
      sku: Number(req.body.sku),
      quantity: Number(req.body.quantity),
      name: req.body.name,
      description: req.body.description,
      images: imageArray,
    });

    await newProduct.save();

    res.status(201).send("Product Added Successfully !!!");
  } catch (error) {
    res
      .status(400)
      .send({ status: "An Error Ocuured !!", error: error.message });
  }
};

const fileSizeFormat = (bytes, decimals) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimals || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    parseFloat((bytes / Math.pow(1024, index)).toFixed(dm)) + " " + sizes[index]
  );
};

// Update a product
const updateProduct = async (req, res) => {
  let productId = req.params.id;
  let imageArray = [];
  const { sku, quantity, name, description } = req.body;
  const basePath = `${req.protocol}://${req.get("host")}/`;
  req.files.forEach((element) => {
    const newPath = element.path.replace(/\\/g, "/");
    const file = {
      fileName: element.originalname,
      filePath: `${basePath}${newPath}`,
      fileType: element.mimetype,
      fileSize: fileSizeFormat(element.size, 3),
    };

    imageArray.push(file);
  });

  const updateProduct = {
    sku,
    quantity,
    name,
    description,
    images: imageArray,
  };

  console.log(updateProduct);

  await product
    .findByIdAndUpdate(productId, updateProduct)
    .then(() => {
      res.status(200).send({ status: "Product updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
};

//Delete a product
const deleteProduct = async (req, res) => {
  let productId = req.params.id;
  await product.findByIdAndDelete(productId);
  res.status(200).send({ status: "Product deleted" });
};

//Search a product
const searchProduct = async (req, res) => {
  let productName = req.params.name;
  await product
    .find({
      name: { $regex: productName, $options: "i" },
    })
    .then((product) => {
      res.status(200).send({ status: "Product fetched", data: product });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get a product", error: err.message });
    });
};

// Export all functions
module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProduct,
};
