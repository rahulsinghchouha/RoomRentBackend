const userProfile = require("../models/userProfile");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");

exports.sendOTP = async (req,res,next) =>{
try{
    const email = req.body.email;

        //check if email is already present
        const checkUserPresent = 0;
        //await userProfile.findOne({email});

        //if user already present
        if(checkUserPresent)
        {
            //return res.status(401).json({
           
            return res.send("User is  Already Registered");
           
        }

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
    
    const otpBody = await OTP.create(otpPayload); //from there our otp will share to the user
    
    if(otpBody){
    return res.status(200).json({
        success:true,
        message:`OTP Sent Succesfully`,
        otp,
    })
   }
   else{
    return res.status(404).json({
        success:false,
        message:`OTP not Send Please try again`
   })
   }
}
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false,message:"OTP not Send please verify your Email"});
    }
}

exports.otpVerification = async(req,res,next)=>{
    try{
    const {email,otp} = req.body;
    console.log("email,otp",email,otp);
    if(!email)//because if somecan call using th url so for that make application more secure this is necessary
    {
        return res.status(401).json({
            success:false,
            message:"Enter Email",
        })
    }
    if(!otp)
    {
        return res.status(401).json({
            success:false,
            message:"Enter OTP",
        }) 
    }
    //if email find so find otp in user otp
    const dbOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1); //limit 1 for only 1 data sort for latest data
    console.log("dbOTP=>",dbOTP);
    if(!dbOTP)
    {
        return res.status(404).json({
            success:false,  
            message:"Please try again",  
        })

    }
    console.log("dbOTP",dbOTP[0].otp);
    if(dbOTP[0].otp == otp)
    {
        return res.status(200).json({
            success:true,
            message:"OTP Verify Succesfully"
        })
    }
    else{
    return res.status(401).json({
        success:false,
        message:"Invalid OTP"
    })
 }
  }
  catch(error)
  {
    return res.status(401).json({
            success:false,
            message:"OTP is not verifying",
            error:error
    })

  }

}

exports.signUp = async(req,res) =>{

    const {email,otp,name,password,confirmPassword} = req.body;




}

exports.login = async(req,res) =>{

    const {name,password} = req.body;

}

