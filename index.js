const express = require("express");
const databaseConnect = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinaryconnect = require("./config/cloudinary");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./models/userProfile");


const app = express();



//setup-port
require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("I am listening on PORT =", PORT);
})
//api call
app.get('/', (req, res) => {
    res.send("Hi I am App");
})
//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for files and jso both
// Middleware to parse cookies
app.use(cookieParser());
//user Routers
const userRoutes = require("./routers/auth");
const productsRouter = require("./routers/products");

//cors for add the path
app.use(
    cors({
        origin: "http://localhost:3000", //for only localhost 3000
        credentials: true,//when we use cookie
        allowedHeaders: ['Authorization', 'Content-Type']
    })
)



//database connection
databaseConnect();
//cloudinary connect
cloudinaryconnect();
//user signup
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/productfunction", productsRouter);


//logout 
app.get('/api/v1/auth/logout', (req, res) => {

    const token = req?.cookies?.token
        

    console.log("cookie delete");

    res.cookie('token', token, { expires: new Date(0), httpOnly: true, path: "/" }).status(200).json({
        success: true,
        token,
       
        message: "user login succesfully",
    });


});

