

### petition pt.I

client — method/function which will be the contact from our server to the database 

SQL INJECTION ATTACK!

With input fields, e.g instead of entering an email in email field, they will enter a sql command like: DROP TABLE IF EXISTS signatures;

If our query is structured like this

```
function addSign(city, country) {
    db.query(`
        INSERT INTO signatures (first, last, signatures) 
        VALUES (${city}), ${country})
        `);
}
```

what will happen is that the database field will be replaced and will execute/run the command and delete our table 

How to prevent this: 

```
function addSign(city, country) {
    db.query(`
        INSERT INTO signatures (first, last, signatures) 
        VALUES ($1, $2)
        `);
}
```

### PART ONE

create handlebar templates you need for petition

- thank you page and signers page
- users can naviagte to the /petition route and see petiton template
- users can naviagte to the /signed route and see thank you template
- users can naviagte to the /signers route and see signers template

### PART TWO

server routes needed

- GET / petition
  - renders petition template (one with input fields and canvas elements)

- POST / petition
  - runs when user enters first name, last name, and signs cavas element, then clicks on submit button 
- GET / petition / signed
  - renders the thank you template
- GET / petition / signers 
  - renders the signers template

### PART THREE

handlebars templates needed 

- petition template (one with input fields and canvas)

  - `<form>` tag, `<input>` tag for first name, `<input>` tag for last name, `<input>` tag for signature (input: "hidden" "name: signature") , and `<canvas>`

  - we will need front end Java code to: (1) allow user to MOUSEDOWN on canvas, (2) allowe user to MOUSEMOVE on canvas, and draw a line as user mouse moves, and (3) allow user to MOUSEUP to stop drawing on canvas

  - `<form>` tag - will make post request to our server when user clicks submit

  - hidden input form field: when user signs petition, we need to convert the camvas drawing into a rul that an be inserted into our table. that url should be assigned as a value of the hidden input field when user finishes signing the petition 

    

- thak you template ("Thank you for signing! along with the # of signers, and a link to the signers page")

- signers template ( one that lists everyone who's signed petition so far )

- layout (link to CSS, front-end JS)

- optional - partials for things like navigation bars

  

queries

- INSERT INTO signatures 
  - should be invoked when user signs petition (user gives their first, last and signature)
- SELECT the names of signers 
  - this query should run when user goes to /petition/signers page
- SELECT query to get number of signers (optional)
  - this query should run when the user goes to the /petition/signed page (thank-you page) 

in public folder: script js will be for javascript code for canvas 