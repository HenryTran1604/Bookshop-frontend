create database jdbc_th;
create table `jdbc_th`.`Supplier` (
	`SupplierID` int auto_increment primary key,
    `SupplierName` varchar(50),
    `Address` varchar(50)
);
create table `jdbc_th`.`Laptop` (
	`LaptopID` int auto_increment primary key,
    `Model` varchar(50),
	`Brand` varchar(50),
    `SupplierID` int,
    `Price` int,
    constraint PK_Laptop_Supplier foreign key (`SupplierID`) references `Supplier`(`SupplierID`)
);

insert into `jdbc_th`.`Supplier`(`SupplierName`, `Address`)
values('FPT', 'Ha Noi'),
('Thegioididong', 'TPHCM'),
('Hacom', 'Da Nang'),
('Phong Vu', 'Ha Noi'),
('Memoryzone', 'Binh Duong'),
('Comstore', 'Hai Phong');

insert into `jdbc_th`.`Laptop`(`Model`, `Brand`, `SupplierID`, `Price`)
values('Dell Vostro 5568', 'Dell', 1, 15000000),
('Asus Zenbook X14', 'Asus', 2, 12000000),
('Thinkpad 480T', 'Lenovo', 6, 10000000),
('Acer Aspire 3 A315-59-314F', 'Acer', 3, 7000000),
('Dell alien A212F3', 'Dell', 4, 20000000),
('Samsung S12DEEW12', 'Samsung', 1, 19000000),
('Dell Inspriron 5128', 'Dell', 3, 14500000),
('Asus Zenbook X18F', 'Asus', 5, 12000000),
('Thinkpad 460Ts', 'Lenovo', 2, 10000000),
('Acer Aspire 6 XP2', 'Acer', 4, 7000000),
('Dell Carbon genX', 'Dell', 4, 20000000),
('Samsung WD1203', 'Samsung', 1, 19000000);

