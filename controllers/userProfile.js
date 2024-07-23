const userProfile = require("../models/userProfile");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");

 const sendOTP = async (req,res) =>{
try{
    const email = req.body.email;

    if(!email)
        return res.send("Email not found");

    //check if email is already present


    //now we send the otp
    const otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })

    //console.log(otp);

    //after generate the otp we will send the otp

        const otpPayload = {
            email,
            otp
        }
        //we store otp in user schema
    //console.log(otpPayload);
    //const otpBody = await OTP.create(otpPayload); //from there our otp will share to the user

    //console.log(otpBody);

    return res.status(200).json({
        success:true,
        message:`OTP Sent Succesfully`,
        otp,
    })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false,error:error.message});
    }
}

module.exports = sendOTP;