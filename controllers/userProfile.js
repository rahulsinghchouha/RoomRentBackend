const userProfile = require("../models/userProfile");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { castObject } = require("../models/products");
require("dotenv").config();

exports.sendOTP = async (req, res, next) => {
    try {
        const email = req.body.email;

        //check if email is already present
        const checkUserPresent = await userProfile.findOne({ email });
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
        try {
            const otpBody = await OTP.create(otpPayload); //from there our otp will share to the user

            if (otpBody) {
                return res.status(200).json({
                    success: true,
                    message: `OTP Sent Succesfully`,
                    otp,
                })
            }
        }
        catch (error) {
            // console.log("OTP Sent error", err);
            return res.status(404).json({
                success: false,
                message: `OTP not Send Please try again`
            })
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(404).json({
            success: false,
            message: "OTP not Send Enter a valid email and  please try again"
        });
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
        const checkUserPresent = await userProfile.findOne({ email });
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

    try {
        const { name, email, password, confirmPassword, phone, otp } = req.body;
        //validation

        if ((!email) || (!otp)) {
            return res.status(404).json({
                success: false,
                message: "please Enter Email and verify "
            })
        }

        if ((!name) || (!password) || (!confirmPassword) || (!(email || phone))) {
            return res.status(404).json({
                success: false,
                message: "All the fields are required"
            })
        }
        //check if email is already present
        const checkUserPresent = await userProfile.findOne({ email });
        if (checkUserPresent) {
            //  console.log("user present")
            return res.status(404).json({
                success: false,
                message: `User is Already Registered`,
            });

        }


        // console.log(">",name, email, password, confirmPassword, phone );
        //password match
        if (password !== confirmPassword) {
            return res.status(404).json({
                success: false,
                message: "Password is incorrect"
            })
        }
        //     console.log("+>",name, email, password, confirmPassword, phone );
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //  console.log("++>",name, email, password, confirmPassword, phone,hashedPassword );
        const user = await userProfile.create({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            accountType: "User",
            image: ""
        })
        //     console.log("+++++>",name, email, password, confirmPassword, phone,"user->",user );

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Account not created please try again",
            })
        }
        //create token and cookies

        const token = jwt.sign(
            { email: user.email, id: user._id, accountType: user.accountType },
            process.env.JWT_SECRET,
            {
                expiresIn: "240h",
            }
        );
        //save this token into the user DB
        user.token = token;

        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            path: '/',

        }

        res.cookie('token', token, options).status(200).json({
            success: true,
            token,
            user,
            message: "user login succesfully",
        });

    }


    catch (error) {

        return res.status(404).json({
            success: false,
            message: "Account not created Please try again",
        })

    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //  console.log("email,password", email, password);

        //data validation
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Enter all the data",
            })
        }

        //user check in db
        try {
            const user = await userProfile.findOne({ email: email });
            //  console.log("userr", user);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "you are not registered please signUp first",
                })
            }

            //password validation


            try {
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return res.status(404).json({ 
                        success: false,
                        message: "Incorrect password" });
                }

                //then password we will create a token and store that token
            }

            catch (error) {
              //  console.error("Error comparing passwords:", error);
                return res.status(500).json({ success: false, message: "Server error" });
            }

            //create token and cookies

            const token = jwt.sign(
                { email: user.email, id: user._id, accountType: user.accountType },
                process.env.JWT_SECRET,
                {
                    expiresIn: "240h",
                }
            );
            //save this token into the user DB
            user.token = token;

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                path: '/',

            }

            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user login succesfully",
            });


        }
        catch (error) {
            // console.log("error", error);
            return res.status(404).json({
                success: false,
                message: "User not found please logged in",
            })
        }



    }
    catch (error) {
        //  console.log("error", error);
        return res.status(404).json({
            success: false,
            message: "login error please try again",
        })
    }



}

