CREATE DATABASE mytodolist;
CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE todos(
    todo_id SERIAL,
    user_id UUID NOT NULL,
    description VARCHAR(255) NOT NULL,
    isdone BOOLEAN NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE todos 
ADD COLUMN priority_id INT;

DELETE FROM todos;

CREATE TABLE catergories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_icon VARCHAR(100) NOT NULL,
    category_color VARCHAR(20) NOT NULL
);

CREATE TABLE priorities(
    priority_id SERIAL PRIMARY KEY,
    priority_name VARCHAR(255) NOT NULL,
    priority_icon VARCHAR(100) NOT NULL,
    priority_color VARCHAR(20) NOT NULL
);

INSERT INTO catergories (category_name, category_icon,category_color) VALUES ('Work', 'fas fa-briefcase', '#45B39D');
INSERT INTO catergories (category_name, category_icon,category_color) VALUES ('School', 'fas fa-graduation-cap', '#2980B9');
INSERT INTO catergories (category_name, category_icon,category_color) VALUES ('Home', 'fas fa-home', '#EC7063');
INSERT INTO catergories (category_name, category_icon,category_color) VALUES ('Social', 'fas fa-users', '#5D6D7E');


INSERT INTO priorities (priority_name, priority_icon,priority_color) VALUES ('Important-Urgent', 'fas fa-exclamation-triangle', '#ff3333');
INSERT INTO priorities (priority_name, priority_icon,priority_color) VALUES ('School', 'fas fa-star', '#e6e600');
INSERT INTO priorities (priority_name, priority_icon,priority_color) VALUES ('Home', 'fas fa-anchor', '#33ccff');
INSERT INTO priorities (priority_name, priority_icon,priority_color) VALUES ('Social', 'fas fa-skull-crossbones', '#b4b4b1');
