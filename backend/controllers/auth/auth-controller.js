const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const asyncHandler = require("express-async-handler");

// user signup
const userSignup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser)
    return res.json({
      success: false,
      message: "User Already exists with the same email! Please try again",
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
    message: "Registration successful",
  });
});

// user signin
const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });
  if (!checkUser)
    return res.json({
      success: false,
      message: "User doesn't exists! Please register first",
    });

  const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
  if (!checkPasswordMatch)
    return res.json({
      success: false,
      message: "Incorrect password! Please try again",
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

  res.cookie("token", token, { httpOnly: true, secure: false }).json({
    success: true,
    message: "Logged in successfully",
    user: {
      email: checkUser.email,
      role: checkUser.role,
      id: checkUser._id,
      userName: checkUser.userName,
    },
  });
});

// user signout
const userSignout = asyncHandler(async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
});

// user auth middleware
const userAuthMiddleware = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;

});



//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};



module.exports = {
  userSignup,
  userSignin,
  userSignout,
  userAuthMiddleware,
  authMiddleware
};
