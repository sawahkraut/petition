// ######################### spicedPg setup ######################### //

const spicedPg = require("spiced-pg");

var db = spicedPg("postgres:postgres:postgres@localhost:5432/salt-petition");

// ######################### database queries ######################### //

module.exports.addSign = function addSign(
    userFirst,
    userLast,
    email,
    signature
) {
    return db.query(
        `
        INSERT INTO signatures (first, last, email, signature)
        VALUES ($1, $2, $3, $4)
        `,
        [userFirst, userLast, email, signature]
    );
};

// addSign("Berlin", "DE");
