const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email }); // checking email already present
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already Exists with same email",
      });
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password",
      });
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Logged in Successfully",
    //   user: {
    //     email: checkUser.email,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //   },
    // });

    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth middleware

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized user",
//     });
//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized user",
//     });
//   }
// };
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
