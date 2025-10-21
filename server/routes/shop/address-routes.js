const express = require("express");
const {
  addAddress,
  editAddress,
  fetchAllAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controllers");

const Router = express.Router();

Router.post("/add", addAddress);
Router.get("/get/:userId", fetchAllAddress);
Router.deleteAddress("/delete/:userId", deleteAddress);
Router.put("/update/:userId", editAddress);

module.exports = Router;
