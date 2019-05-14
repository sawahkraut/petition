// ######################### spicedPg setup ######################### //

const spicedPg = require("spiced-pg");

var db = spicedPg("postgres:postgres:postgres@localhost:5432/salt-petition");

// ######################### database queries ######################### //

module.exports.addSign = function addSign(first, last, email, signature) {
    return db.query(
        `
        INSERT INTO signatures (first, last, email, signature)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
        `,
        [first, last, email, signature]
    );
};

module.exports.getCount = function getCount() {
    return db.query(`SELECT COUNT(*) FROM signatures`);
};

module.exports.seeSign = function seeSign(id) {
    return db.query(`SELECT first, signature FROM signatures WHERE id = $1`, [
        id
    ]);
};

module.exports.seeSigners = function seeSigners() {
    return db.query(`SELECT first, last FROM signatures`);
};
// addSign("Berlin", "DE");
