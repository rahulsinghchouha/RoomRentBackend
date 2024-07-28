const express = require("express");
const databaseConnect = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinaryconnect = require("./config/cloudinary");



const app = express();



//setup-port
require("dotenv").config();
const PORT = process.env.PORT || 4000;
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
app.use(bodyParser.urlencoded({ extended: true }));
//user Routers
const userRoutes = require("./routers/auth");
const productsRouter = require("./routers/products");

//cors for add the path
app.use(
    cors({
        origin:"http://localhost:3000", //for only localhost 3000
        credentials: true,//when we use cookie
        maxAge: 14400,
    })
)

//database connection
databaseConnect();
//cloudinary connect
cloudinaryconnect();
//user signup
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/productfunction",productsRouter);


