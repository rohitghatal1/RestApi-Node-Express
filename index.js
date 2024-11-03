const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require("fs")

const app = express();
const PORT = 8000;

//middle ware
app.use(express.urlencoded({extended: false}));

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`)}
        </ul>
    `;
    res.send(html);

})

//REST API
app.get("/api/users", (req, res) => {
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

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=> {
        return res.json({ status: "Pending" })

    })
    console.log("Body", body)
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))