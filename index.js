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

//schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    job_title: {
        type: String,
    },

    gender: {
        type: String
    },
   
}, {timestamps: true})

const User = mongoose.model("user", userSchema);

//middle ware
app.use(express.urlencoded({extended: false}));

app.get("/users", async (req, res) => {
    const allDBUsers = await User.find({});
    const html = `
        <ul>
            ${allDBUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
        </ul>
    `;
    res.send(html);

})

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
//REST API
app.get("/api/users", (req, res) => {
    console.log("Im at  get route:", req.myName)
    res.json(users);
})


app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        // TODO: edit a user
        return res.json({ status: "Pending" })
    })
    .delete((req, res) => {
        //TODO: delete a user
        return res.json({ status: "Pending" })
    })

app.post("/api/users", async (req, res) => {
    const body = req.body;

    const result =  await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    console.log(result);

    return res.status(201).json({ msg: "success"});
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))