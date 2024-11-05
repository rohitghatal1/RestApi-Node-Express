const express = require("express");

const {connectMongoDB} = require("./connection")

const app = express();
const PORT = 8000;


const userRouter = require("./routes/user");

//connection
connectMongoDB('mongodb://127.0.0.1:27017/restApi');

//middle ware
app.use(express.urlencoded({extended: false}));

// Routes 
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))