--IMPORTANT: execute the following query first to make sure that the NAME OF the RESTRICTION is CORRECT, on the ALLOCATION_OPTION table.
--SELECT * FROM "SYS"."CONSTRAINTS" WHERE SCHEMA_NAME = 'MKTG_PLANNING_TOOL' AND TABLE_NAME = 'ALLOCATION_OPTION' AND COLUMN_NAME = 'CRM_KEY';

--If it exists, it will be necessary to eliminate the CONSTRAINT, with the following commented line and recreate it with the script defined in this file.
--ALTER TABLE "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" DROP CONSTRAINT UK_ALLOCATION_OPTION_CRM_KEY;

ALTER TABLE "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" ADD CONSTRAINT UK_ALLOCATION_OPTION_CRM_KEY UNIQUE(NAME, CRM_KEY, DELETED_TOKEN);

--we need to update the field DELETED_TOKEN, for the deleted records
update "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION"
set DELETED_TOKEN = (SELECT CAST(SYSUUID AS VARCHAR) AS "SYS_UNIQUE_NUMBER" FROM DUMMY)
where deleted = 1;

-- *************************************************************************************
-- Update schema version
INSERT INTO "MKTG_PLANNING_TOOL"."SCHEMA_VERSION"(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-98', 'Add constraint in Alocation Option', 'V201712111415__Add_Uk_Allocation_Option_Crm_Key_Constraint.sql');

COMMIT;
