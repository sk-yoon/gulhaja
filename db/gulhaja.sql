

create user 'gulhaja'@'%' identified by '1234';
grant all privileges on display.* to 'gulhaja'@'%';

grant all privileges on display.* to gulhaja@localhost identified  by '1234';

flush privileges;


create table EBOOK
(
	ID int auto_increment		primary key,
	SEQ int null,
	TITLE varchar(100) charset utf8mb3 null,
	AFFILIATION varchar(100) charset utf8mb3 null,
	GRADE varchar(50) charset utf8mb3 null,
	WRITER varchar(50) charset utf8mb3 null,
	FILENAME varchar(100) charset utf8mb3 null,
	SHOW_YN varchar(5) charset utf8mb3 null,
	FILE blob null
);


create table WRITTER
(
	ID int auto_increment primary key,
	NAME varchar(100) null,
	AFFILIATION nvarchar(100) null,
	GRADE nvarchar(100) null,
	WRITER_NO nvarchar(100) null
);





truncate table EBOOK;

select * from EBOOK order by seq;

INSERT INTO display.EBOOK (SEQ, TITLE, AFFILIATION, GRADE, FILENAME, FILE, WRITER, SHOW_YN) VALUES (1, '발명왕 개미', '', '', 'dasol_1.pdf', null, '주다솔', 'Y');
INSERT INTO display.EBOOK (SEQ, TITLE, AFFILIATION, GRADE, FILENAME, FILE, WRITER, SHOW_YN) VALUES (2, '우리반 반성문 대소동', '', '', 'reflection_1.pdf', null, '민채', 'Y');
INSERT INTO display.EBOOK (SEQ, TITLE, AFFILIATION, GRADE, FILENAME, FILE, WRITER, SHOW_YN) VALUES (3, '변덕쟁이 엄마','', '', 'mom_1.pdf', null, '주다솔', 'Y');
INSERT INTO display.EBOOK (SEQ, TITLE, AFFILIATION, GRADE, FILENAME, FILE, WRITER, SHOW_YN) VALUES (4, '호랑이를 잡은 사냥꾼', '', '', 'tiger_1.pdf', null, '이건우', 'Y');

update EBOOK set SEQ = 3 where SEQ = 5