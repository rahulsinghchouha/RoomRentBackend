const userProfile = require("../models/userProfile");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const { castObject } = require("../models/products");

exports.sendOTP = async (req, res, next) => {
    try {
        const email = req.body.email;

        //check if email is already present
        const checkUserPresent = await userProfile.findOne({email});
        //await userProfile.findOne({email});

        //if user already present
        if (checkUserPresent) {
            return res.status(404).json({
				success: false,
				message: `User is Already Registered`,
			});

        }

        //now we send the otp
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        //console.log(otp);

        //after generate the otp we will send the otp

        const otpPayload = {
            email,
            otp
        }
        //we store otp in user schema
        try{
        const otpBody = await OTP.create(otpPayload); //from there our otp will share to the user

        if (otpBody) {
            return res.status(200).json({
                success: true,
                message: `OTP Sent Succesfully`,
                otp,
            })
        }
    }
        catch(error){
            console.log("OTP Sent error",err);
            return res.status(404).json({
                success: false,
                message: `OTP not Send Please try again`
            })
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(404).json({ success: false,
             message: "OTP not Send Enter a valid email and  please try again" });
    }
}

exports.otpVerification = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email)//because if somecan call using th url so for that make application more secure this is necessary
        {
            return res.status(403).json({
                success: false,
                message: "Enter Email",
            })
        }
        if (!otp) {
            return res.status(403).json({
                success: false,
                message: "Enter OTP",
            })
        }

       //check if email is already present
       const checkUserPresent = await userProfile.findOne({email});
       //await userProfile.findOne({email});

       //if user already present
       if (checkUserPresent) {
           return res.status(404).json({
               success: false,
               message: "User is Already Registered",
           });

       }

        //if email find so find otp in user otp

        const dbOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1); //limit 1 for only 1 data sort for latest data

        if (!dbOTP) {
            return res.status(404).json({
                success: false,
                message: "Please try again OTP not validate",
            })

        }

        if (dbOTP[0]?.otp == otp) {
            return res.status(200).json({
                success: true,
                message: "OTP Verify Succesfully"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Invalid OTP"
            })
        }
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: "OTP is not verifying please try again",
        })

    }

}

exports.signUp = async (req, res) => {

  try{
    const { name, email, password, confirmPassword, phone,otp } = req.body;
    //validation

    if((!email) || (!otp))
    {
        return res.status(404).json({
            success:false,
            message:"please Enter Email and verify "
        })
    }

    if((!name) || (!password) || (!confirmPassword)  || (! (email || phone)) )
    {
        return res.status(404).json({
            success:false,
            message:"All the fields are required"
        })
    }
    //check if email is already present
    const checkUserPresent = await userProfile.findOne({email});
    if (checkUserPresent) {
        console.log("user present")
        return res.status(404).json({
            success: false,
            message: `User is Already Registered`,
        });

    }


   // console.log(">",name, email, password, confirmPassword, phone );
    //password match
    if( password !== confirmPassword  )
        {
            return res.status(404).json({
                success:false,
                message:"Password is incorrect"
            })
        }
   //     console.log("+>",name, email, password, confirmPassword, phone );
    // Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
      //  console.log("++>",name, email, password, confirmPassword, phone,hashedPassword );
        const user = await userProfile.create({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone,
            accountType:"User",
            image:""
        })
   //     console.log("+++++>",name, email, password, confirmPassword, phone,"user->",user );
        if(user)
        {
         
            return res.status(200).json({
                success:true,
                message:"Account created Succesfully",
            })
        }        
        else {
           
            return res.status(404).json({
                success:false,
                message:"Account not created Please try again",
            })
        }

  }
  catch(error)
  {
   
    return res.status(404).json({
        success:false,
        message:"Account not created Please try again",
    })

  }

}

exports.login = async (req, res) => {

    const { name, password } = req.body;

}

