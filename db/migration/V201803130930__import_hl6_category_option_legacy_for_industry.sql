insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-MWCEXGEVT') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-MWCEXMEET') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-MWCEXNTW') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-MWCEXSCN') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-MWCEXSTUPF') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-NRFEXCOLD') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-NRFEXMEET') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-NRFEXNTW') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-NRFEXSCN') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-NRFEXSPONS') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-NRFEXWARM') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-SAPRER_PER') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-EVE-SELEM06REG') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-GOLFBGCON') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-GOLFBGDAY') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-GOLFBGDAYS') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-GOLFGPCON') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-GOLFGPDAY') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-GOLFGPINV') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-GOLFGPINV2') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHEQEX') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHNHLAPP') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHSACX') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHSJSCR') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHSLCX') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHSLEX') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHSOEX') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TECHTEEX') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TENWTAAMP') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TENWTACTR') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Cross Industry'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-XM18-SPO-TENWTAHOS') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-YE18-SIB-EXCHSP') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-YE18-SIB-EXCMTG') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-YE18-SIB-EXCSCN') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-YE18-SIB-SPN_SE') T2;
insert into "MKTG_PLANNING_TOOL"."HL6_CATEGORY_OPTION_LEGACY"(ALLOCATION_CATEGORY_OPTION_LEVEL_ID, HL6_LEGACY_ID, AMOUNT, CREATED_USER_ID) select T1.ALLOCATION_CATEGORY_OPTION_LEVEL_ID, T2.HL6_LEGACY_ID ,100,1 from (select acol.ALLOCATION_CATEGORY_OPTION_LEVEL_ID from "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" acol inner join  "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY" ac on ac.ALLOCATION_CATEGORY_ID = acol.ALLOCATION_CATEGORY_ID inner join "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ao on ao.ALLOCATION_OPTION_ID = acol.ALLOCATION_OPTION_ID where ACOL.HIERARCHY_LEVEL_ID = 3 AND ACOL.ENABLED = 1 AND ACOL.DELETED = 0 AND AC.ENABLED = 1 AND AC.DELETED = 0 AND AO.ENABLED = 1 AND AO.DELETED = 0 AND UPPER(AC.NAME) = UPPER('Industries')AND UPPER(AO.NAME) = trim(UPPER(' Retail'))) T1, (select hl6_legacy_id from HL6_LEGACY where upper(path)='CRM-YE18-SIB-SPN_SGN') T2;


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-150', 'hl6_category_option_legacy for Industry', 'V201803130930__import_hl6_category_option_legacy_for_industry.sql');

COMMIT;