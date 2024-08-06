const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userProfile");

exports.checkUserPresent = async (req, res) => {

    try {

        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization")?.replace("Bearer ", "");
        //token hai means user available
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "please login",
            })
        }
        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("decode= ",decode);
            req.user = decode;

            return res.status(200).json({
                success: true,
                message: "auth succesfully",
            })
        }
        catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'please login again then try',
            });
        }


    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'please login',
        });
    }
}

//auth
exports.auth = async (req, res, next) => {

    try {

        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization")?.replace("Bearer ", "");
        //token hai means user available
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "please login auth",
            })
        }
        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("decode= ",decode);
            req.user = decode;
        }
        catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'please login again then try',
            });
        }

    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'please login err',
        });
    }

    next();
}
//isStudent
exports.isUser = async (req, res, next) => {
    try {
        if (req.user.accountType !== "User") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Students only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }

}


//isInstructor
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Instructor only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}
