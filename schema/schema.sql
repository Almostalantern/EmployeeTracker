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
    job_title varchar (50) not null,
    salary decimal (10,5),
    foreign key (department_id) references department (department_id) 
);

create table employee(
    id int not null auto_increment,
    primary key (id),
    first_name varchar (50),
    last_name varchar (50),
    foreign key (title_id) references title (title_id),
    manager_id int null
);

