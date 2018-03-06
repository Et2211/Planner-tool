create database if not exists plannerDB;

use plannerDB;

create table if not exists headerNames (
  planID int,
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


INSERT INTO planNames VALUES (1, 'Webscript');
INSERT INTO planNames VALUES (2, 'WebF1');


INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 1', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 2', 'That week', 'More code', 'reading week', 'Adieus except say barton put feebly favour him. Entreaties unpleasant sufficient few pianoforte discovered uncommonly ask. Morning cousins amongst in mr weather do neither. Warmth object matter course active law spring six. Pursuit showing tedious unknown winding see had man add. And park eyes too more him. Simple excuse active had son wholly coming number add. Though all excuse ladies rather regard assure yet. If feelings so prospect no as raptures quitting.');

INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 3', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 4', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 5', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 6', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 7', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 8', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 9', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 10', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 11', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');
INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'Webscript', 'Week 12', 'This week', 'Code', 'resources', 'Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.');

INSERT INTO headerNames (planID, planName, Week, header1, header2, header3, main1) VALUES (1, 'WebF1', 'Week 1', 'This week', 'Code', 'no lecture', 'He determined to drop his litigation with the monastry, and relinguish his claims to the wood-cuting and fishery rihgts at once. He was the more ready to do this becuase the rights had becom much less valuable, and he had indeed the vaguest idea where the wood and river in quedtion were.');





INSERT INTO headerNames (planID, planName, header1, header2, header3, main1) VALUES (1, 'WebF1', 'That week', 'More code', 'reading week', 'Adieus except say barton put feebly favour him. Entreaties unpleasant sufficient few pianoforte discovered uncommonly ask. Morning cousins amongst in mr weather do neither. Warmth object matter course active law spring six. Pursuit showing tedious unknown winding see had man add. And park eyes too more him. Simple excuse active had son wholly coming number add. Though all excuse ladies rather regard assure yet. If feelings so prospect no as raptures quitting.');
