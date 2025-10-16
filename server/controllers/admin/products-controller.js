const { handleImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await handleImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: "False",
      message: "Error Occured",
    });
  }
};
//Add a new products
const addProducts = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error occured",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error occured",
    });
  }
};

// edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    // Update product fields (only update fields that were provided in the request)
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price !== undefined ? price : findProduct.price; // Check for undefined to preserve existing value
    findProduct.salePrice =
      salePrice !== undefined ? salePrice : findProduct.salePrice;
    findProduct.totalStock =
      totalStock !== undefined ? totalStock : findProduct.totalStock;
    findProduct.image = image || findProduct.image; // Handle image update

    // Save the updated product to the database
    const updatedProduct = await findProduct.save();

    // Respond with the updated product
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct, // Send the updated product as part of the response
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error occured",
    });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      productId: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  fetchAllProducts,
  addProducts,
  editProduct,
  deleteProduct,
};
