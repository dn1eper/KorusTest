# KorusTest
### Задача
1. База данных для хранения контактов и телефонов на SQL (Microsoft SQL Server).
2. Web сервис доступа к Базе данных.
3. HTML страница с таблицей отображения данных контактов (ФИО, адрес, телефоны).

Тестовая база содержит 2 таблицы Contacts и Telephones. 
В таблице Contacts хранятся ФИО контактов и их адреса. В таблице Telephones – телефонные номера контактов, связь с таблицей контактов осуществляется по внешнему ключу.
На HTML странице находится таблица представления контактов. При открытии страницы происходит загрузка в таблицу всех имеющихся данных в БД. Телефоны контакта записываются в одну ячейку строки данного контакта в таблице, к телефонам применяется маска +X(XXX)XXX-XX-XX. В БД телефонные номера должны храниться в чистом формате +XXXXXXXXXXX.
Должна быть реализована возможность добавлять новые контакты и изменять существующие. Интерфейсно это можно сделать прям в таблице или с переходом на отдельную форму создания\редактирования контакта. Также должна быть возможность добавлять\изменять телефонные номера по существующим контактам.
Отправка данных на сервер должна осуществляться в фоне без перезагрузки страницы.

### Технические требования:
*	Веб-сервис  реализован на ASP.NET Web API 2
*	Страница, отображающая данные HTML
*	Логика работы с таблицей реализована на JavaScript. С использовванием jQuery
*	Вызов web-сервиса для получения\отправки данных реализованы на JavaScript c технологией AJAX. С использованием jQuery
*	К таблице применены стили Bootstrap 

### Результат
Решение Visual Studio, содержащее следующие компоненты:
1. HTML страницу с файлами скриптов и стилей.
2. Web сервис доступа к базе.
3. SQL-скрипт создания базы данных с таблицей контактов и заполнения демонстрационных данных. 