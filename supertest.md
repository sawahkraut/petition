## superTest 

[SuperTest](https://github.com/visionmedia/supertest) is a tool for testing HTTP request handling. With SuperTest, you can send specific requests to your Express app or router and then make assertions about the response you receive.

- create module/ javascript file 
  - index.test.js 

Whenever we create a file for testing, that file should have the same as the file of the code we want to test, adding `.test.js`

- in index.js;

```
exports.app = app;

app.get("/home", (req, res) => {
res.send("<h1>home</h1>");
});
```

these routes are fo the supertest demo only 

- in index.test.js

```
const supertest = require("supertest");
const {app} = require = ("./index");

test ("GET /home returns an h1 as a response", () => {
return supertest(app)
.get("home")
.then(res => {
console.log("res: ", res);
})
})


```

res represets the response I'm getting from the server 

- In Terminal:  `npm test` 

the main 3 properties of res that we're interested in are: 

1. text. 	->	text gives us the BODY of the response 

2. headers.	->	gives us the headers that we were sent as part of response

3. statusCode.	->	gives us the status code of the response 

- After getting this info;

```
const supertest = require("supertest");
const {app} = require = ("./index");

test.only("GET /home returns an h1 as a response", () => {
return supertest(app)
.get("home")
.then(res => {
expect(res.statusCode).toBe(200);
expect(res.text).toBe("<h1>home</h1>")
	})
})

if(require.main == module) {
app.listen(8080, () => console.log("listening"));
}
```

