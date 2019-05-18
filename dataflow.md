### DATAFLOW

#### petition pt.II

| BACK END               | FRONT END                 |
| :--------------------- | :------------------------ |
| index.js (server), SQL | script.js, CSS, templates |
| test, database queries | images                    |

GET - to get data from back end to front end 

POST - we send data as part ot the request from front to back end



*dataflow of POST*

front — post — back — index.js — database(sql) — tells server yes/no — 

server sends a response — redirect to thankyou page



#### cookies

when user goes to thankyou page, we want to show user the signature they just made. How do we do that?

- How does the thankyou page know that the signature you just made is yours, to then display it? Cookies!

  

DEFINITION OF COOKIES  —>  to remember information of the user who's currently on the website. You can make cookies expire when you like. 



When user signs the petition and hits submit, we can

1. make POST request 
2. insert data into db
3. put something in cookie saying: user signed the petition 



We wouldn't store the users signature in the cookie, instead we'll store his id which will reference the signature. 

The reason for this: signature is too big for cookies to store. Cookies can break websites in myterious ways if too much data is stored in them. 

We will store a reference to the signature in the cookie - id. 



- Middleware to use:

```
var cookieSession = require('cookie-session');
```

This will create two cookies:

one cookie will hold id, second cookie will contain copy of first expect for everything insie will be hashed/encrypted. We never directly interact with the second cookie



-  How to put info in cookie:

```
app.use(
    cookieSession({
        secret: `I won't tell`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
```

```
app.get("/cookie-test", (req, res) => {
    req.session.cookie = true;
});
```

req.session — session property comes from the middleware function.

req.session — an OBJECT

We are adding a property to our cookies called "cookie", and its value is true

Every single route in my server (every single app.get and app.post) will have this 'req.session' object



next steps: 

1. change the POST `/petition` route that was created in part 1 to now put the id of the signature in the cookie
   - you should be able to `console log(req.session)` and see the id of the signature that was just made 

2. Change GET `/petition/signed`   route (thank you route) to get users signature from the database and render it onscreen
   - to render that signature on screen, you will h©ave to take the signarure url and put it in an `<img> `  tag