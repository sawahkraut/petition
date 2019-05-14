const express = require("express");
const hb = require("express-handlebars");
const app = express();
const db = require("./utils/db");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(
    cookieSession({
        secret: `I won't tell`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.get("/cookie-test", (req, res) => {
    console.log("GET / cookie-test hit!");
    req.session.cookie = true;
    res.redirect("/signers");
    console.log("checking to see whats happen in my cookie", req.session);
});

app.get("/", (req, res) => {
    if (req.session.signID) {
        res.redirect("/signed");
    } else {
        res.render("pet", {
            layout: "main"
        });
    }
});

app.get("/signed", (req, res) => {
    var obj = {};
    db.getCount()
        .then(results => {
            obj.count = results.rows[0].count;
            return db.seeSign(req.session.signID);
        })
        .then(results => {
            res.render("signed", {
                layout: "main",
                getCount: obj.count,
                signature: results.rows[0].signature,
                first: results.rows[0].first
            });
        });
});

app.get("/signers", (req, res) => {
    db.seeSigners().then(results => {
        console.log(results.rows[0]);
        // var obj = {};
        console.log("my cookie in signers route", req.session);
        res.render("signers", {
            layout: "main",
            seeSigners: results.rows
        });
    });
});

app.post("/subscription", (req, res) => {
    if (req.body.firstName) {
        // console.log("first name: ", req.body.firstName);
    }
    if (req.body.surname) {
        // console.log("surname: ", req.body.surname);
    }
    if (req.body.email) {
        // console.log("email: ", req.body.email);
    }
    db.addSign(
        req.body.firstName,
        req.body.surname,
        req.body.email,
        req.body.signature
    ).then(result => {
        req.session.signID = result.rows[0].id;
        res.redirect("/signed");
    });
});

app.listen(8080, () => console.log("Online, aye aye captain!"));
