CREATE OR REPLACE FUNCTION get_report_1(integer) RETURNS JSON AS '
SELECT json_agg(t) FROM 
(
SELECT user_id,
       entry_time,
       sum(inter) time_in_building
FROM
  (SELECT e.user_id,
          entry_time::DATE entry_time,
          lead (CASE
                    WHEN zone_out IS NOT NULL THEN entry_time
                END) OVER (PARTITION BY e.user_id
                           ORDER BY entry_time) - CASE
                                                      WHEN zone_in IS NOT NULL THEN entry_time
                                                  END inter
   FROM user_entries e
   INNER JOIN devices d ON e.device_id = d.id
   LEFT JOIN zones z ON d.zone_out = z.id
   LEFT JOIN zones z2 ON d.zone_in = z2.id
   WHERE e.user_id = $1
	 AND (d.zone_out IS NULL
     OR d.zone_in IS NULL)) e
GROUP BY user_id,
         entry_time
ORDER BY e.user_id,
         entry_time) t;' LANGUAGE SQL IMMUTABLE RETURNS NULL ON NULL INPUT;

CREATE OR REPLACE FUNCTION get_report_2(integer) RETURNS JSON AS '
SELECT json_agg(t) FROM (
SELECT entry_day,
       u.name user_name,
       z.name zone_name,
       sum(leave_time - entry_time) time_spent
FROM
  (SELECT ue.user_id,
          ue.device_id,
          ue.entry_time,
          entry_time::date entry_day,
          d.zone_in,
          d.zone_out,
          lead(entry_time, 1) OVER (
                                    ORDER BY entry_time) leave_time
   FROM user_entries ue
   INNER JOIN devices d ON ue.device_id = d.id
   WHERE ue.user_id = $1) t,
     zones z,
     users u
WHERE u.id = t.user_id
  AND z.id = t.zone_in
GROUP BY z.name,
         entry_day,
         u.name
ORDER BY entry_day,
         time_spent DESC) t;' LANGUAGE SQL IMMUTABLE RETURNS NULL ON NULL INPUT;
	
CREATE OR REPLACE FUNCTION get_report_3(integer) RETURNS JSON AS '
SELECT json_agg(t) FROM 
(
SELECT DISTINCT to_char(entry_day, ''dd.mm.yyyy''),
                user_name,
                z.name zone_name
FROM
  (SELECT u.name user_name,
          ue.user_id,
          ue.device_id,
          ue.entry_time,
          entry_time::date entry_day,
          d.zone_in,
          d.zone_out,
          lead(entry_time, 1) OVER (
                                    ORDER BY entry_time) leave_time
   FROM user_entries ue
   INNER JOIN devices d ON ue.device_id = d.id
   INNER JOIN users u ON u.id = ue.user_id
   WHERE ue.user_id = $1
   ORDER BY ue.entry_time) t,
     zones z,
     users u
WHERE u.id = t.user_id
  AND z.id = t.zone_in) t;' LANGUAGE SQL IMMUTABLE RETURNS NULL ON NULL INPUT;