## Heroku

### putting the petition online 



1. create account 
2. make new app
3. make remote git 

```
git remote add heroku https://git.heroku.com/sawahkraut.git
```

URL was found in setting tab

4. 

```
git remote -v 
```

5. Let Heroku decide what PORT will be used. In index js

```
if (require.main == module) {
app.listen(process.env.PORT || 8080, () => console.log("online"))
};
```

6. Resources / add ons / postgress / 

7. install the installer (GitHub)

ALREADY DONE ALL THESE STEPS. TO DO (SEE BELOW)

7. in terminal: 

```
heroku login 
```

9. Once logged in, in terminal (to put them online)

```
heroku pg:psql
```

THEN, you're in the database and copy and paste all your tables in the terminal 

10. in db.js file

```
const dbUrl = process.env.DATABASE_URL || `"postgres:postgres:postgres@localhost:5432/salt-petition"`

const db = spicedPg(dbUrl)
```

11. Pushing it live 

```
git add .
git commit -m "Made it almost production ready"
git push heroku HEAD:master
```



12. IF error, go to Heroku

```
more / restart all dynos / 
```

13. if you have secrets file 

```
let secrets;
process.env.NODE_ENV === "production" ? secrets = process.env : secrets = require("./secrets.json")
```

