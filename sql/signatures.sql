-- setting up table for parts one + two

DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures(
    id SERIAL PRIMARY KEY,
    first VARCHAR (255) NOT NULL,
    last VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    signature TEXT NOT NULL
);

-- how to interact with table in our code // tell express server to talk to table
