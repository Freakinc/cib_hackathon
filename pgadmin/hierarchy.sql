WITH RECURSIVE a as(
	select zones.*,  1 as Hlevel, cast(zones.name as text) path from zones
	where parent_id is null
	union all
	select b.*, a.Hlevel + 1 Hlevel, cast(path || '\' || b.name as text) path 
		from zones b 
		inner join a 
		on (b.parent_id = a.id) 
	where  a.Hlevel <= 3
	)
select * from a
 order by path 