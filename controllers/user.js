const User = require("../models/Users");

async function getAllUsers(req, res){
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);  
}

async function getUserById(req, res){
    const user = await User.findById(req.params.id);
    return res.json(user);
}

async function updateUserById(req, res) {
    console.log("Updating user by id");
}

async function createUser(req, res){
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
}
module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    createUser,
}