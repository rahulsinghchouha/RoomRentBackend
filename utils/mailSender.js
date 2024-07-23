const nodemailer = require("nodemailer");
require("dotenv").config();

//create a transport object using smtp

const mailSender = async(email,title,body)=>{

try {
    
    const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:587,
            auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS
            }
                          
        })
        
        //after transporter we send the mail 
        let info = await transporter.sendMail({
            from:`Room On Rent <${process.env.MAIL_USER}>`,
            to:`${email},`,
            subject: `${title}`,
            html:`${body}`                
        })

           
        return info;
    
    }
catch(error){
    //console.log(error.message);
    return error;
}
}

module.exports = mailSender;
