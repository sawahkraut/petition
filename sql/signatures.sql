-- setting up table for parts one + two

DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures(
    id SERIAL PRIMARY KEY,
    signature TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) UNIQUE
);

-- how to interact with table in our code // tell express server to talk to table
