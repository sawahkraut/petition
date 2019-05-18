## petition pt. IV

### Joining

join 	take two tables, and temporarily make it into one query/table to get data from it

To query data that exists in different tables you *join* the tables together and conduct the query on the combined table.



**inner join** - only gives you rows where theres data from both tables involved 

```
SELECT songs.name AS song_name, singers.name AS singer_name
FROM singers 
JOIN songs 
ON singers.id = songs.singer_id;
```



**outer join** - will include all rows, regardless of if there's data from both tables involved 

```
SELECT songs.name AS song_name, singers.name AS singer_name
FROM singers 
FULL JOIN songs 
ON singers.id = songs.singer_id;
```

You can join more than one table. 



new route: /profile 

- no link in navigation
- we will only send ppl there, once they successfully registered 
- at this page, we'll ask for additional information about them (age, city, homepage…). All of these are optional for the user to insert. 
- then we send them to the petition 

- create new table: userprofile
- this will be linked/join 
- we want to make it so that noone can come back 

In see all signers page:

will show first and last, age city and if they have an url, it will be a link on their name. City will also be an url

```
app.get("/signers/:city", (req, res) => {
same as other signers query, 
just with a WHERE clause $1 // WHERE LOWER(city) = LOWER($1)
const city : req.params.city;
db.getSignersByCity(city).then()
})
```

new page to show only the people who signed who are from the city you clicked 



```
{{#if url}}
<a href="{{url}}">{{first} {last}}
{{/if url}}
```

the url needs to begin with:

http://

https://

// 

prepend http

Do this when they submit the form in the post route 

handle it: throwing the url out, or prepend http:// to it 





registration — profile — petition — signed — signers



## **Vulnerabilities** 



`eval ` 						**NOTE** 	DO NOT USE EVAL		

s a global Javascript function that we have not yet looked at primarily because using it is almost always ill-advised. It accepts a string as a parameter and expects that string to consist of Javascript code. It compiles the string passed to it and runs it.

```
var a = 10;

eval("a = 20")

console.log: 20
```

Risk: string you pass to eval came from a user. Meaning that form can mean that anyone can manipulate it 



`setTimeout ` 				**NOTE** 	NEVER PASS IT A STRING

in node is fine. However, in browsers it's dangerous. 

```
setTimeout("alert(10)", 100);
```



`XSS ` 					**NOTE** 	ESCAPE THIS

Cross-site scripting (abbreviated *XSS*) vulnerabilities allow attackers to inject their own scripts into your pages. It is common to take input from users and show it to other users. It is critical that this input be *sanitized* before it is displayed. If it contains HTML that is not escaped, attackers can include their own scripts on your page and do anything they want.

Sanitizing involves escaping the characters &, <, >, ", and ', all of which are meaningful in HTML. Keep in mind that if you want to put untrusted content into `<script>` tags, they must be escaped for Javascript rather than HTML. Another complicating factor is that you sometimes want to allow users to include some HTML formatting of the content they submit.



`Frame`

```
app.use((req, res, next) => {

res.setHeader("X-FRAME-OPTIONS", "DENY");

next();

})
```





`Cookies` / `CSURF`		

if cookies are there, doesn't necessarily mean the request is coming from your site 

Use `Token` to solve this. 

In the future, you won't need this. You will be able to set your cookie to only your site. 

Use after body parser and cookie session

```
const csurf = require("csurf");

app.use(csurf());

```



then, in every `GET` route 

```
csrfToken: req.csrfToken();
```

OR: 

```
app.use(req, res, next) => {

res.locals.csrfToken = req.csrfToken();

res.setHeader("x-frame-options", "DENY";

next();

});
```



Whenever POST request comes in ,it will look for a token in a set number of places (eg. body).

Then, in every form field add this: 

```
<input name="_csrf" type="hidden" value="{{csrfToken}}">
```



## 					**DO THESE STEPS BEFORE GOING LIVE**