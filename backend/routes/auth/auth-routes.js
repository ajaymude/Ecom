const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  userSignup,
  userSignin,
  userSignout,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", userSignup);
router.post("/login", userSignin);
router.post("/logout", userSignout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
