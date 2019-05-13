const express = require("express");
const hb = require("express-handlebars");
const app = express();
const db = require("./utils/db");
const bodyParser = require("body-parser");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.get("/", (req, res) => {
    res.render("pet", {
        layout: "main"
    });
});

app.get("/signed", (req, res) => {
    res.render("signed", {
        layout: "main"
    });
});

app.get("/signers", (req, res) => {
    res.render("signers", {
        layout: "main"
    });
});

app.post("/subscription", (req, res) => {
    if (req.body.firstName) {
        console.log("first name: ", req.body.firstName);
    }
    if (req.body.surname) {
        console.log("surname: ", req.body.surname);
    }
    if (req.body.email) {
        console.log("email: ", req.body.email);
    }
    db.addSign(
        req.body.firstName,
        req.body.surname,
        req.body.email,
        req.body.signature
    ).then(() => {
        res.redirect("/signed");
    });
});

app.listen(8080, () => console.log("I am listening"));
