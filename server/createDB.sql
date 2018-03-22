create database if not exists plannerDB;

use plannerDB;

create table if not exists headerNames (

  planName varchar(30),
  Week varChar(10),
  header1 varchar(30),
  header2 varchar(30),
  header3 varchar(30),
  main1 TEXT,
  main2 TEXT,
  main3 TEXT
);


create table if not exists planNames (
  id int primary key auto_increment,
  planName varchar(30)

);
