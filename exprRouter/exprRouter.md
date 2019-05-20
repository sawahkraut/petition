## Auth Flow 



- new file in root directory 

```
middleware.js
```

- the function

```
module.exports.requireNoSignature = function requireNoSignature(
    req,
    res,
    next
) {
    if (req.session.signatureId) {
        res.redirect("/signed");
    } else {
        next();
    }
};
```

next is a function we have to call in every single middleware function we write ever 

if cookie exists, this route will run.

- how to export it

```
module.exports = {
    requireNoSignature,
    fn
};
```



- In index.js

```
const { requireNoSignature} = require("./middleware");
```

- in petition route 

```
app.get("/pet", requireNoSignature, fn, (req, res) => {
		res.render("/pet", {
		layout: "main";
	})
});
```



## Express Router 

Putting all routes (GET + POST) in one file, which sole responsibility is to get routes. 

- Make new folder called: routers

  ​	-	Inside this, make a file: profile.js

- in profile.js

```
const express = require("express");
const router = express.Router();
```

router is a variable that has GET and POST methods on it (just like app in index.js)

- copy ansd delete GET and POST routes from index.js and put them in profile.js

```
app.get("/profile", (req, res) => {
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
```

- NOW, rewrite them so they work with profile.js

```
router.get("/profile", (req, res) => {
    res.render("profile", {
        layout: "main"
    });
});

router.post("/profile", (req, res) => {
    db.profile(
        req.session.userID,
        req.body.age,
        req.body.city,
        req.body.url
    ).then(() => {
        res.redirect("/pet");
    });
});
```

- export the router (profile.js)

```
module.exports = router;
```

- import it (index.js)

```
app.use(express.static("./public"));

const profilerouter = require("./routers/profile");
app.use(profileRouter);
```



OPTIONAL: You can write this a little more simply with express.Router

```
router.route("/profile").get((req, res) => {
 res.render("profile", {
        layout: "main"
		});
})
.post((req, res) => {
 db.profile(
        req.session.userID,
        req.body.age,
        req.body.city,
        req.body.url
    ).then(() => {
        res.redirect("/pet");
    });
})
```





if user logged in, he cant register nor login:

conditional check

```
app.use(function(req, res, next) {

if(!req.session.userID && req.url != "/login" && req.url != "/register") {

res.redirect("/register");

} else {

next();

}
});

```



```

```

in login and register, if there is a req.session.userID then redirect them to pet

otherwsie do the normal business 