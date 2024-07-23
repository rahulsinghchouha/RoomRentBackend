const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../templates/emailVerificationTemplate");

const OTP = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 60*5,
    }
})
//defien a function to send email
async function sendVerificationEmail(email,otp)
{
    //we can create the transporter and mail sender here but we are using the seprate file for code reusability
    try{
       
            const mailResponse = await mailSender(
                email,
                "verification Email",
                emailTemplate(otp)
            )
            
    }
    catch(error)
    {
        console.log("Error occured while send the email",error);
        throw error;
    }
}

OTP.pre("save",async function (next){

    
    if(this.isNew)
    {
        await sendVerificationEmail(this.email,this.otp) //in this we have send email and otp and created at is by default
    }

    next();
})

module.exports =  mongoose.model("OTP",OTP);