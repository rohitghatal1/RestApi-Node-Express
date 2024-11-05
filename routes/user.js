const express = require("express");
const {getAllUsers, getUserById, updateUserById, createUser} = require("./controllers/user")

const router = express.Router()

// router.get("/users", async (req, res) => {
//     const allDBUsers = await User.find({});
//     const html = `
//         <ul>
//             ${allDBUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
//         </ul>
//     `;
//     res.send(html);

// })


router.route("/")
    .get(getAllUsers)
    .post(createUser)

router.route("/:id")
    .get(getUserById)
    .patch(updateUserById)


module.exports = router;