const express = require("express");
const hb = require("express-handlebars");
const app = express();
const db = require("./utils/db");
const bc = require("./utils/bc");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");
app.use(express.static("./public"));

// ################################### Body Parser ################################### //

const bodyParser = require("body-parser");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
// ##################################### Cookies ##################################### //

const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: `I won't say`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

// app.get("/cookie-test", (req, res) => {
//     console.log("GET / cookie-test hit!");
//     req.session.cookie = true;
//     res.redirect("/signers");
//     console.log("checking to see whats happen in my cookie", req.session);
// });

// ################################ + vulnerabilities ################################ //

const csurf = require("csurf");

app.use(csurf());

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.setHeader("x-frame-options", "DENY");
    res.locals.userloggedin = req.session.userID;
    res.locals.signed = req.session.signID;
    res.locals.first = req.session.first;
    next();
});

// ################################### GET AND POST ################################### //

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
});

app.get("/", (req, res) => {
    res.render("home", {
        layout: "main"
    });
});

app.get("/pet", (req, res) => {
    console.log("GET route pet working :", req.session);
    res.render("pet", {
        layout: "main"
    });
});

app.get("/registration", (req, res) => {
    res.render("registration", {
        layout: "main"
    });
});

app.post("/registration", (req, res) => {
    bc.hashPassword(req.body.password)
        .then(hashedPW => {
            db.getUser(req.body.first, req.body.last, req.body.email, hashedPW)
                .then(results => {
                    console.log("results.rows[0] :", results.rows[0]);
                    req.session.userID = results.rows[0].id;
                    req.session.email = results.rows[0].email;
                    req.session.first = results.rows[0].first;
                    res.redirect("/profile");
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/profile", (req, res) => {
    console.log(req.session);
    res.render("profile", {
        layout: "main"
    });
});

app.post("/profile", (req, res) => {
    db.profile(
        req.session.userID,
        req.body.age,
        req.body.city,
        req.body.url
    ).then(() => {
        res.redirect("/pet");
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        layout: "main"
    });
});

app.post("/login", (req, res) => {
    db.logIn(req.body.email).then(userInfo => {
        // console.log("userInfo:", userInfo);
        const hashedPW = userInfo.rows[0].password;
        bc.checkPassword(req.body.password, hashedPW)
            .then(results => {
                console.log(results);
                req.session.userID = userInfo.rows[0].id;
                req.session.first = userInfo.rows[0].first;
                res.redirect("/pet");
            })
            .catch(err => {
                console.log(err);
            })
            .catch(err => {
                console.log(err);
            });
    });
});

app.get("/editprofile", (req, res) => {
    db.editProfile(req.session.userID)
        .then(display => {
            // console.log("display: ", display);
            res.render("editprofile", {
                layout: "main",
                data: display.rows[0]
            });
        })
        .catch(err => console.log(err));
});

app.post("/editprofile", (req, res) => {
    if (req.session.userID) {
        const update = [
            db.updateUser(
                req.session.userID,
                req.body.first,
                req.body.last,
                req.body.email
            ),
            db.upsertUserProfile(
                req.body.age,
                req.body.city,
                req.body.url,
                req.session.userID
            )
        ];
        if (req.body.password && req.body.password.length > 0) {
            update.push(
                new Promise((resolve, reject) => {
                    bc.hashPassword(req.body.password)
                        .then(hashPass => {
                            return db.updatePassword(
                                hashPass,
                                req.session.userID
                            );
                        })
                        .then(() => {
                            resolve();
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
            );
        }
        Promise.all(update)
            .then(() => {
                res.redirect("/signed");
            })
            .catch(err => {
                console.log(err);
                res.statusCode = 401;
                res.end();
            });
    } else {
        res.redirect("/login");
    }
});

app.post("/delete", (req, res) => {
    console.log("made it to delete post route :", req.session);
    if (req.session.userID) {
        db.removeSign(req.session.userID)
            .then(() => {
                req.session.signID = null;
                res.redirect("/pet");
            })
            .catch(err => {
                console.log(err);
                res.statusCode = 401;
                res.end();
            });
    } else {
        res.redirect("/login");
    }
});

app.get("/signed", (req, res) => {
    // console.log(req.session);
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
        // console.log(results.rows[0]);
        // console.log("my cookie in signers route", req.session);
        res.render("signers", {
            layout: "main",
            seeSigners: results.rows
        });
    });
});

app.post("/subscription", (req, res) => {
    console.log("delete working :", req.session);
    db.addSign(req.session.userID, req.body.signature).then(result => {
        req.session.signID = result.rows[0].id;
        res.redirect("/signed");
    });
});

app.listen(8080, () => console.log("Online, aye aye captain!"));
