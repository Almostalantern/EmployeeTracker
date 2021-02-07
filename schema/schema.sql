DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
USE employees_DB;

create table department (
    id int not null auto_increment,
    primary key (id),
    department_name varchar (50) not null
);

create table title (
    id int not null auto_increment,
    primary key (id),
    department_id int not null,
    job_title varchar (50) not null,
    salary decimal (10,2),
    foreign key (department_id) references department (id)
);

create table employee(
    id int not null auto_increment,
    primary key (id),
    title_id int not null,
    first_name varchar (50),
    last_name varchar (50),
    foreign key (title_id) references title (id),
    manager_id int null,
    foreign key (manager_id) references title (id)
);