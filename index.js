const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const { type } = require("os");

const app = express();
const PORT = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/restApi')
.then(()=> console.log("Mongodb connected"))
.catch((err) => console.log("Mongo error", err));


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


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))