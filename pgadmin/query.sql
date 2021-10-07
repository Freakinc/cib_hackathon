select * from users;
select * from zones z;
select * from devices;
select * from user_entries order by entry_time;
select * from routers;
select * from events order by event_time;

select ST_Distance()
select ST_Distance(coordinates, work_place) - r.radius q
from events e, routers r, users u
where e.type = 'router'
and e.router_id = r.id
and e.user_id = u.id;

public.spheroid_in()

select 
entry_day,
u.name user_name,
z.name zone_name,
sum(leave_time - entry_time) time_spent
from(
select ue.user_id, ue.device_id, ue.entry_time, date(entry_time) entry_day, d.zone_in, d.zone_out, lead(entry_time, 1 ) over (order by entry_time) leave_time
from user_entries ue inner join devices d
on ue.device_id = d.id
) t, zones z, users u
where u.id = t.user_id and z.id = t.zone_in
group by z.name, entry_day, u.name
;

select 
distinct  entry_day,
z.name zone_name
from(
select ue.user_id, ue.device_id, ue.entry_time, date(entry_time) entry_day, d.zone_in, d.zone_out, lead(entry_time, 1 ) over (order by entry_time) leave_time
from user_entries ue inner join devices d
on ue.device_id = d.id
) t, zones z, users u
where u.id = t.user_id and z.id = t.zone_in
order by entry_day;

select get_report_1(1);
select get_report_2(1);
select get_report_3(1);
