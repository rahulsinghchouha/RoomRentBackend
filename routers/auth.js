const express = require("express");
const router = express.Router();


const {sendOTP,signUp,login,otpVerification} = require("../controllers/userProfile");

router.post("/sendotp",sendOTP);
router.post("/otpverification",otpVerification);
//router.post("/login",login);

module.exports=router;