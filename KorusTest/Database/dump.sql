-- CREATE DATABASE
CREATE DATABASE KorusTest
GO

USE KorusTest;
CREATE TABLE dbo.Telephones (
	TelephoneID int IDENTITY(1,1) NOT NULL PRIMARY KEY ,
	Number char(12) NOT NULL);
GO

CREATE TABLE dbo.Contacts  (
	ContactID int IDENTITY(1,1) NOT NULL PRIMARY KEY,  
	FirstName varchar(25) NOT NULL,  
	SurName varchar(25) NOT NULL,  
	Patronymic varchar(25) NULL,  
	TelephoneID int NOT NULL FOREIGN KEY (TelephoneID) REFERENCES Telephones(TelephoneID),
	Address varchar(50) NULL);
GO

-- INSERT TEST DATA
INSERT dbo.Telephones (Number)  VALUES 
	('+79569461851'),
	('+79569461852'),
	('+79569461853'),
	('+79569461854'),
	('+79569461855');
GO

INSERT dbo.Contacts (FirstName, SurName, Patronymic, TelephoneID, Address)  VALUES 
	('Иван', 'Иванов', 'Иванович', 1, 'г. Москва ул. Новоясеневская д.1 кв.65'),
	('Иван', 'Сергеев', 'Сергеевич', 2, 'г. СПб пр. Непокоренных д.8 кв.12'),
	('Сергей', 'Сергеев', 'Иванович', 3, 'г. Новосибирск пр. Ленина д.65 кв.128'),
	('Сергей', 'Иванов', 'Сергеевич', 4, 'г. Москва ул. Ивановская д.12 кв.6'),
	('Сергей', 'Сергеев', 'Сергеевич', 5, 'г. Москва ул. Кучерявая д.3 кв.645');
GO