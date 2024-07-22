const express = require("express");
const databaseConnect = require("./config/database");

const app = express();

//setup-port
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("I am listening on PORT =",PORT);
})
//api call
app.get('/',(req,res)=>{
    res.send("Hi I am App");
})

//database connection
databaseConnect();
