drop table zones;
create table zones
(
	id serial,
	parent_id integer,
	name varchar(250),
	type varchar(64),
	coordinates geometry
);


drop table points;
create table points
(
	point_id serial,
	zone_in integer,
	zone_out integer,
	coordinates geometry
);

drop table users;
create table users
(
	id serial,
	name varchar(250),
	work_place geometry
);

drop table user_points;
create table user_points
(
	id serial,
	user_id integer,
	point_id integer,
	entry_time date	
);
