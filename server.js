const path = require("path");

const express = require("express");
const app = express();
const sendEmail = require("./utils/sendEmail");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
// app.use(express.json());

app.set("view engine", "ejs");

// home route
app.get("/", (req, res) => {
  res.render("contact");
});

// sent route
app.get("/sent", (req, res) => {
  res.render("sent");
});

app.post("/sendemail", (req, res) => {
  const { name, surname, email } = req.body;

  const to = email;
  const from = "qkralstntntn@gmail.com";
  const subject = "Welcome to Dev Mates";
  // const text = "Thx for singing up",
  // const html = "Hello"

  const output = `
        <h3>Thx for signing up</h3>
        <h3>Contact Details</h3>
        <ul>
            <li>${name}</li>
            <li>${surname}</li>
            <li>${email}</li>
        </ul>
    `;

  sendEmail(to, from, subject, output);
  res.redirect("/sent");
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
