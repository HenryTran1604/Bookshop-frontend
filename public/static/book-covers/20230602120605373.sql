create database StudentDB;
use StudentDB;
create table Student (
	id int auto_increment,
    name varchar(50),
    dob date,
    major varchar(50),
    race smallint,
    constraint PK_Student primary key (id)
);
insert into Student (name, dob, major, race)
values('Nguyen Van A', '2002-12-12', 'CNTT', 1),
('Tran Van C', '2002-2-12', 'ATTT', 0),
('Le Van D', '2002-1-1', 'CNTT', 1),
('Nguyen Van E', '2002-12-31', 'KT', 1),
('Hoang Manh F', '2002-12-11', 'CNPM', 0),
('Tran Van G', '2002-8-12', 'CNTT', 1),
('Tran Thi H', '2002-12-12', 'CNTT', 1),
('Nguyen Van K', '2001-12-12', 'VT', 0),
('Vu Van V', '2002-4-29', 'VT', 1),
('Le Thi T', '2002-9-2', 'MKT', 0);