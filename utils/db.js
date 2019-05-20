// ############################### spicedPg setup ############################### //

const spicedPg = require("spiced-pg");

var db = spicedPg("postgres:postgres:postgres@localhost:5432/salt-petition");

// ############################### database queries ############################### //

module.exports.addSign = function addSign(userID, signature) {
    return db.query(
        `
        INSERT INTO signatures (user_id, signature)
        VALUES ($1, $2)
        RETURNING id;
        `,
        [userID, signature]
    );
};

module.exports.getCount = function getCount() {
    return db.query(`SELECT COUNT(*) FROM signatures`);
};

module.exports.seeSign = function seeSign(id) {
    return db.query(`SELECT signature FROM signatures WHERE id = $1`, [id]);
};

module.exports.seeSigners = function seeSigners() {
    return db.query(
        `SELECT first, last FROM signatures INNER JOIN users ON signatures.user_id = users.id;`
    );
};

module.exports.getUser = function getUser(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING first, id, email;
    `,
        [first, last, email, password]
    );
};

module.exports.logIn = function logIn(email) {
    return db.query(
        `SELECT first, last, email, password, users.id, signatures.id AS "signID"
        FROM users
        LEFT JOIN signatures ON users.id = signatures.user_id
        WHERE email=$1;
        `,
        [email]
    );
};

module.exports.profile = function profile(uid, age, city, url) {
    return db.query(
        `INSERT INTO user_profiles (age, city, url, user_id)
    VALUES ($1, $2, $3, $4)
    `,
        [age.length > 0 ? age : null, city, url, uid]
    );
};

// ############################ edit + update user profile ############################ //

module.exports.editProfile = function editProfile(userid) {
    return db.query(
        `SELECT email, password, city, age, url, first, last, signatures.signature, users.id AS user_id, signatures.id AS "signID"
        FROM users
        LEFT JOIN signatures ON users.id = signatures.user_id
        LEFT JOIN user_profiles ON users.id = user_profiles.user_id
        WHERE users.id = $1
         `,
        [userid]
    );
};

module.exports.updateUser = function updateUser(id, first, last, email) {
    return db.query(
        `UPDATE users SET first=$2, last=$3, email=$4
        WHERE id=$1;
        `,
        [id, first, last, email]
    );
};

module.exports.upsertUserProfile = function upsertUserProfile(
    age,
    city,
    url,
    uid
) {
    return db.query(
        `INSERT INTO user_profiles (age, city, url, user_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age = $1, city = $2, url = $3
        WHERE user_profiles.user_id = $4
        `,
        [age.length > 0 ? age : null, city, url, uid]
    );
};

module.exports.updatePassword = function updatePassword(hashPass, id) {
    return db.query(
        `UPDATE users
        SET password = $1
        WHERE id = $2;
        `,
        [hashPass, id]
    );
};

// ############################ delete signature ############################ //

module.exports.removeSign = function removeSign(id) {
    return db.query(`DELETE FROM signatures WHERE user_id=$1`, [id]);
};
