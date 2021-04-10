CREATE SCHEMA IF NOT EXISTS azdev;

CREATE TABLE azdev.users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    hashed_auth_token TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
    CHECK (lower(username) = username)
);

CREATE TABLE azdev.tasks (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    tags TEXT,
    user_id INTEGER NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    approach_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
    FOREIGN KEY (user_id) REFERENCES azdev.users
);

CREATE TABLE azdev.approaches (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    vote_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),

    FOREIGN KEY (user_id) REFERENCES azdev.users,
    FOREIGN KEY (task_id) REFERENCES azdev.tasks
);

select * from azdev.users;
select * from azdev.tasks;
select * from azdev.approaches;

INSERT INTO "azdev"."users"("username","hashed_password")
VALUES (E'test', crypt('123456', gen_salt('bf')));

INSERT INTO "azdev"."users"("username","hashed_password")
VALUES
(E'test','123456');

INSERT INTO "azdev"."tasks" ("content","tags","user_id","approach_count","is_private")
VALUES
(E'Make an image in HTML change based on the theme color mode (dark or light)',E'code,html',1,1,FALSE),
(E'Get rid of only the unstaged changes since the last git commit',E'command,git',1,1,FALSE),
(E'The syntax for a switch statement (AKA case statement) in JavaScript',E'code,javascript',1,2,FALSE),
(E'Calculate the sum of numbers in a JavaScript array',E'code,javascript',1,1,FALSE),
(E'Babel configuration file for "react" and "env" presets',E'config,javascript,node',1,1,TRUE),
(E'Create a secure one-way hash for a text value (like a password) in Node',E'code,node',1,1,FALSE);		