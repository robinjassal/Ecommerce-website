const Product = require("../../models/Product");

//fetch all products
const getFilterdProducts = async (req, res) => {
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

module.exports = {
  getFilterdProducts,
};
