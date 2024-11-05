const express = require("express");

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


router.get("/", (req, res) => {
    console.log("Im at  get route:", req.myName)
    res.json(users);
})

router.route("/:id")
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

router.post("/", async (req, res) => {
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

module.exports = router;