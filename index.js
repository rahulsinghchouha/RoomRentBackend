const express = require("express");
const databaseConnect = require("./config/database");
const router = express.Router();
const sendOTP = require("./controllers/userProfile");
const cors = require("cors");
const bodyParser = require("body-parser");

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
//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//database connection
//user signup
app.post("/signup",sendOTP);
databaseConnect();
