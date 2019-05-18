var bc = require("bcryptjs");

// will be called in POST registration route
module.exports.hashPassword = function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bc.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bc.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// checkPassword should be called in POST /login route
module.exports.checkPassword = function checkPassword(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bc.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(
            err,
            doesMatch
        ) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};
// hashPassword(what user enters in password input field)
