const express = require("express");
const router = express.Router();


const {sendOTP,signUp,login,otpVerification} = require("../controllers/userProfile");
const {checkUserPresent,isUser,isAdmin} = require("../middleware/userauth");

router.post("/sendotp",sendOTP);
router.post("/otpverification",otpVerification);
router.post("/signup",signUp);
router.post("/login",login);
//midd for check user present
router.get("/checkuserpresent",checkUserPresent);


module.exports=router;