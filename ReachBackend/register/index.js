const express = require("express");
const router = express.Router();
const {
  registerUser,
  generateOtpAndSendMail,
  checkUserExists,
  verifyOtp,
} = require("./register");

router.post("/registerUser", registerUser);
router.post("/sendOtp", generateOtpAndSendMail);
router.post("/verifyOtp", verifyOtp);
router.post("/checkUserExists", checkUserExists);

module.exports = router;
