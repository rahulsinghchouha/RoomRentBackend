const mongoose = require("mongoose");

require("dotenv").config();

const databaseConnect = () => {
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("database connected succesfully");
})
.catch((error)=>{
    console.log("Database connection error",error);
    process.exit(1);
})
}

module.exports = databaseConnect;