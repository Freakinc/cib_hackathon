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
     EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.table_name);
  END LOOP;
END $$ ;

insert into users(id, name, zone_id, router_id, work_place) values(1, 'Ilshat', 8, 8, 'POINT(125 5)');
insert into users(id, name, zone_id, router_id, work_place) values(2, 'Vladislav', 8, 8, 'POINT(130 5)');
insert into users(id, name, zone_id, router_id, work_place) values(3, 'Efim', 8, 10, 'POINT(145 5)');
insert into users(id, name, zone_id, router_id, work_place) values(4, 'Aleksandr', 8, 10, 'POINT(150 5)');
insert into users(id, name, zone_id, router_id, work_place) values(5, 'Vitaliy', 8, 21, 'POINT(75 25)');
update users set json = ST_AsGeoJSON(work_place);

insert into zones(id, name, type, parent_id, coordinates) values (1, 'Staropetergofskiy', 'building', null, 'POLYGON((0 0, 250 0, 250 30, 0 30, 0 0))');
insert into zones(id, name, type, parent_id, coordinates) values (2, 'Floor 1', 'floor', 1, 'POLYGON((0 0, 250 0, 250 30, 0 30, 0 0))');
insert into zones(id, name, type, parent_id, coordinates) values (3, 'Floor 2', 'floor', 1, 'POLYGON((0 0, 250 0, 250 30, 0 30, 0 0))');
insert into zones(id, name, type, parent_id, coordinates) values (4, 'Floor 3', 'floor', 1, 'POLYGON((0 0, 250 0, 250 30, 0 30, 0 0))');

insert into zones(id, name, type, parent_id, coordinates) values (5, 'Hall 1', 'hall', 2, 'POLYGON((0 0, 125 0, 125 30, 0 30, 0 0))');
insert into zones(id, name, type, parent_id, coordinates) values (6, 'Kitchen', 'kitchen', 2, 'POLYGON((125 15, 250 15, 250 30, 125 30, 125 15))');
insert into zones(id, name, type, parent_id, coordinates) values (7, 'Conf room Moscow', 'conf', 2, 'POLYGON((125 0, 250 0, 250 15, 125 15, 125 0))');

insert into zones(id, name, type, parent_id, coordinates) values (8, 'Open Space 1', 'open_space', 3, 'POLYGON((50 0, 250 0, 250 30, 50 30, 50 0))');
insert into zones(id, name, type, parent_id, coordinates) values (9, 'Hall 2', 'room', 3, 'POLYGON((0 0, 50 0, 50 30, 0 30, 0 0))');
insert into zones(id, name, type, parent_id, coordinates) values (10, 'Conf room Saint-Petesburg', 'conf', 8, 'POLYGON((200 10, 250 10, 250 30, 200 30, 200 10))');
insert into zones(id, name, type, parent_id, coordinates) values (11, 'Conf room KZ', 'conf', 8, 'POLYGON((200 0, 250 0, 250 10, 200 10, 200 0))');

insert into zones(id, name, type, parent_id, coordinates) values (12, 'Hall 3', 'hall', 4, 'POLYGON((0 0, 50 0, 50 30, 0 30, 0 0))');
insert into zones(id, name, type, parent_id, coordinates) values (13, 'Open Space 2', 'open_space', 4, 'POLYGON((50 0, 250 0, 250 30, 50 30, 50 0))');
insert into zones(id, name, type, parent_id, coordinates) values (14, 'Kitchen', 'kitchen', 13, 'POLYGON((200 0, 250 0, 250 30, 200 30, 200 0))');
insert into zones(id, name, type, parent_id, coordinates) values (15, 'Conf room Dungeon', 'conf', 13, 'POLYGON((50 15, 100 15, 100 30, 50 30, 50 15))');

update zones set json = ST_AsGeoJSON(coordinates);

--truncate table devices;
insert into devices(id, zone_in, zone_out) values (1, 5, null);
insert into devices(id, zone_in, zone_out) values (2, null, 5);
insert into devices(id, zone_in, zone_out) values (3, 5, 6);
insert into devices(id, zone_in, zone_out) values (4, 6, 5);
insert into devices(id, zone_in, zone_out) values (5, 5, 7);
insert into devices(id, zone_in, zone_out) values (6, 7, 5);

insert into devices(id, zone_in, zone_out) values (7, 9, 8);
insert into devices(id, zone_in, zone_out) values (8, 8, 9);
insert into devices(id, zone_in, zone_out) values (9, 8, 10);
insert into devices(id, zone_in, zone_out) values (10, 10, 8);
insert into devices(id, zone_in, zone_out) values (11, 8, 11);
insert into devices(id, zone_in, zone_out) values (12, 11, 8);

insert into devices(id, zone_in, zone_out) values (13, 12, 13);
insert into devices(id, zone_in, zone_out) values (14, 13, 12);
insert into devices(id, zone_in, zone_out) values (15, 13, 14);
insert into devices(id, zone_in, zone_out) values (16, 14, 13);
insert into devices(id, zone_in, zone_out) values (17, 13, 15);
insert into devices(id, zone_in, zone_out) values (18, 15, 13);

insert into user_entries(user_id, device_id, entry_time) values(1, 1, current_timestamp);
insert into user_entries(user_id, device_id, entry_time) values(1, 4, now() + interval '5 minutes');
insert into user_entries(user_id, device_id, entry_time) values(1, 3, now() + interval '25 minutes');
insert into user_entries(user_id, device_id, entry_time) values(1, 7, now() + interval '125 minutes');
insert into user_entries(user_id, device_id, entry_time) values(1, 8, now() + interval '225 minutes');
insert into user_entries(user_id, device_id, entry_time) values(1, 2, now() + interval '425 minutes');

insert into user_entries(user_id, device_id, entry_time) values(1, 1, now() - interval '1 day');
insert into user_entries(user_id, device_id, entry_time) values(1, 2, now() - interval '1 day' + interval '8 hours');

insert into routers (coordinates, radius, zone_id)
(
select 'POINT('||a * 15   || ' 10)' rposition, 15 radius, 8 zone_id from  generate_series(1, 16) a
union all
select 'POINT('||a * 15   || ' 20)' rposition, 15 radius, 8 zone_id from  generate_series(1, 16) a
);
update routers set json = ST_AsGeoJSON(coordinates);
 
insert into events(type, user_id, event_time, event, router_id) values('router', 1, now(), 'connect', 8);
insert into events(type, user_id, event_time, event, router_id) values('pc', 1, now() + interval '5 minutes', 'login', null);
insert into events(type, user_id, event_time, event, router_id) values('pc', 1, now() + interval '55 minutes', 'block', null);
insert into events(type, user_id, event_time, event, router_id) values('router', 1, now() + interval '65 minutes', 'connect', 22);
insert into events(type, user_id, event_time, event, router_id) values('pc', 1, now() + interval '75 minutes', 'login', null);

