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
    RETURNING id, email;
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

// ############################ EDIT + UPDATE USER PROFILE ############################ //

module.exports.editProfile = function editProfile(email) {
    return db.query(
        `SELECT email, password, city, age, url, first, last, signatures.signature, users.id AS user_id, signatures.id AS "signID"
        FROM users
        LEFT JOIN signatures ON users.id = signatures.user_id
        LEFT JOIN user_profiles ON users.id = user_profiles.user_id
        WHERE email = $1
         `,
        [email]
    );
};

module.exports.updateUser = function updateUser(first, last, email, id) {
    return db.query(
        `UPDATE users SET first=$1, last=$2, email=$3
        WHERE id=$4;
        `,
        [first, last, email, id]
    );
};

module.exports.upsertUserProfile = function upsertUserProfile(
    age,
    city,
    url,
    uid
) {
    return db.query(
        `INSERT INTO user_profiles (age, city, url, uid)
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
