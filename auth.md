users 

| id   | first  | last |
| ---- | ------ | ---- |
| 1    | eileen | M    |
| 2    | Andrea | A    |
| 3    | Ivana  | M    |
|      |        |      |

signatures

| id   | signature   | userID |
| ---- | ----------- | ------ |
| 1    | jsfjkshdfjs | 2      |
| 2    | jsfjkshdfjs | 3      |
|      |             |        |

The userID in signatures is linked to the id in users

### How to store passwords

#### Hashing

password1 —> jsfksdbfksdjhfasoiñike8432432 (bycrypt)

hashing will turn the password into a gibberish string



- md5 + sha1 —> NEVER EVER USE THESE TO STORE PASSWORDS

- bcrypt —> GOOD! 

mysalt - randomly generated string 

- password1 + mysalt —> jsfksdbfks243djhfasoiñike8432

  

```
var byc = require("bycriptjs");
```



BruteForce attack - 26ULdEvBrWjaH7L4thRAXib

Dictionary attack - 

coconutFlake&255

login - join (user comes back)

registration - join