const express = require("express");

const {connectMongoDB} = require("./connection")

const app = express();
const PORT = 8000;


const userRouter = require("./routes/user");

//connection
connectMongoDB('mongodb://127.0.0.1:27017/restApi');

//middle ware
app.use(express.urlencoded({extended: false}));


app.use((req, res, next)=> {
    console.log("Hello from middleware  1")
    req.myName = "Rohit Ghatal"
    // return res.json({msg: "request stopped at middleware 1"});
    next();
})

app.use((req, res, next)=> {
    console.log("Mdddleware 2:", req.myName)
    // return res.json({msg: "request stopped at middleware 1"});
    next();
})

// Routes 
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))