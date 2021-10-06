drop table places;
create table places(
id serial primary key,
name varchar(64) not null,
description varchar(255),
type varchar(64),
coordinates geometry
);

drop table users;
create table users(
id serial primary key,
name varchar(64) not null,
surname varchar(64),
age integer);

drop table user_place;
create table user_place(
	user_id integer,
	place_id integer,
)


