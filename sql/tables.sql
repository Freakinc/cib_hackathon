DO $$ 
  DECLARE 
    r RECORD;
BEGIN
  FOR r IN 
    (
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
		and table_name not in ('spatial_ref_sys', 'geography_columns', 'geometry_columns')
    ) 
  LOOP
     EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.table_name) || ' CASCADE';
  END LOOP;
END $$ ;

create table zones
(
	id serial,
	parent_id integer,
	name varchar(250),
	type varchar(64),
	coordinates geometry,
	json varchar(500)
);

create table devices
(
	id serial,
	zone_in integer,
	zone_out integer,
	zone_id integer,
	coordinates geometry
);

create table users
(
	id serial,
	name varchar(250),
	work_place geometry,
	zone_id integer,
	router_id integer,
	json varchar(500)
);

create table user_entries
(
	id serial,
	user_id integer,
	device_id integer,
	entry_time timestamp	
);

create table routers
(
	id serial,
	coordinates geometry,
	radius integer,
	zone_id integer,
	json varchar(500)
);

create table events
(
	type varchar(64),
	user_id integer,
	event_time timestamp,
	event varchar(64),
	router_id integer
);

create table incidents
(
	id serial,
	user_id integer,
	distance integer,
	type varchar(64)
);