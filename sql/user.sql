create table user(
    id int primary key AUTO_INCREMENT,
    login varchar(50),
    email varchar(100),
    password varchar(250),
    role varchar(50),
    status varchar(50),
    UNIQUE (email)
);

insert into user(login, email, password, role, status) values ('admin', 'planeta@planetanordeste.com.br', 'Planeta2024@', 'cliente', 'true');