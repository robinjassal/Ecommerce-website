require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // helps to connect server with db
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-route");
const adminProductsRouter = require("./routes/admin/products-route");
const shopProductsRouter = require("./routes/shop/products-route");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter); // /api/auth/register ->call registerUser
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);

app.listen(PORT, () => console.log("Server is now running on PORT ", PORT));
