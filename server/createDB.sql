create database if not exists plannerDB;

use plannerDB;

create table if not exists headerNames (
  planID int,
  planName varchar(30),
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


INSERT INTO planNames VALUES (1, 'Webscript');
INSERT INTO headerNames (planID, planName, header1, header2, header3, main1) VALUES (1, 'Webscript', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, header1, header2, header3, main1) VALUES (1, 'WebF1', 'That week', 'More code', 'reading week', 'Adieus except say barton put feebly favour him. Entreaties unpleasant sufficient few pianoforte discovered uncommonly ask. Morning cousins amongst in mr weather do neither. Warmth object matter course active law spring six. Pursuit showing tedious unknown winding see had man add. And park eyes too more him. Simple excuse active had son wholly coming number add. Though all excuse ladies rather regard assure yet. If feelings so prospect no as raptures quitting.');
