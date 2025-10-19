const Product = require("../../models/Product");

//fetch all products
const getFilterdProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }
    // console.log(filters);
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.salePrice = 1;
        break;
      case "price-hightolow":
        sort.salePrice = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const listOfProducts = await Product.find(filters).sort(sort);
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

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product Fetch successfully",
      data: product,
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
  getFilterdProducts,
  getProductDetails,
};
