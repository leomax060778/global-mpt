INSERT INTO "MKTG_PLANNING_TOOL"."HL5_COUNTRY_CATEGORY_OPTION" (HL5_ID, ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID, updated, amount, created_user_id)
select hl5.hl5_id,
t.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID,
0 as updated,
0 as amount,
1 as created_user_id
from hl5
inner join hl4 on hl5.hl4_id = hl4.hl4_id
inner join hl3 on hl4.hl3_id = hl3.hl3_id
inner join (
select hl2.hl2_id, acol.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID
from "MKTG_PLANNING_TOOL"."ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2" chl2
inner join "MKTG_PLANNING_TOOL"."ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL" acol
on acol.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID = chl2.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID and acol.enabled = 1 and acol.deleted = 0
inner join hl2 on hl2.hl2_id = chl2.hl2_id and hl2.enabled = 1 and hl2.deleted = 0
inner join hl1 on hl2.hl1_id = hl1.hl1_id
inner join budget_year bby on bby.budget_year_id = hl1.budget_year_id and bby.budget_year = 2018
where ACOL.hierarchy_level_id = 2
AND hl2.hl2_id in (871,885,880,907,875,883,917,886)
) T on T.HL2_ID = hl3.hl2_id
where hl5.enabled = 1 and hl5.deleted = 0;



INSERT INTO "MKTG_PLANNING_TOOL"."HL6_COUNTRY_CATEGORY_OPTION" (HL6_ID, ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID, updated, amount, created_user_id)
select hl6.hl6_id,
t.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID,
0 as updated,
0 as amount,
1 as created_user_id
from hl6
inner join hl5 on hl6.hl5_id = hl5.hl5_id
inner join hl4 on hl5.hl4_id = hl4.hl4_id
inner join hl3 on hl4.hl3_id = hl3.hl3_id
inner join (
select hl2.hl2_id, acol.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID
from "MKTG_PLANNING_TOOL"."ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2" chl2
inner join "MKTG_PLANNING_TOOL"."ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL" acol
on acol.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID = chl2.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID and acol.enabled = 1 and acol.deleted = 0
inner join hl2 on hl2.hl2_id = chl2.hl2_id and hl2.enabled = 1 and hl2.deleted = 0
inner join hl1 on hl2.hl1_id = hl1.hl1_id
inner join budget_year bby on bby.budget_year_id = hl1.budget_year_id and bby.budget_year = 2018
where ACOL.hierarchy_level_id = 3
AND hl2.hl2_id in (871,885,880,907,875,883,917,886)
) T on T.HL2_ID = hl3.hl2_id
where hl6.enabled = 1 and hl6.deleted = 0;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-124', 'Add Countries Category To L5 L6', 'V201803051236__Add_Countries_Category_To_L5_L6.sql');

COMMIT;