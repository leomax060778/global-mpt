-- IMPORTANT: please run first the following query to make sure the CONSTRAINT NAME is CORRECT
-- SELECT * FROM "SYS"."CONSTRAINTS" WHERE SCHEMA_NAME = 'MKTG_PLANNING_TOOL' AND TABLE_NAME = 'ALLOCATION_OPTION' AND COLUMN_NAME = 'CRM_KEY';

ALTER TABLE "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION" DROP CONSTRAINT UK_ALLOCATION_OPTION_CRM_KEY;

-- *************************************************************************************
-- Update schema version
INSERT INTO "MKTG_PLANNING_TOOL"."SCHEMA_VERSION"(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-78', 'Drop CRM_KEY constraint in Alocation Option', 'V201710200930__Allocation_Option_Drop_constraint_CRM_KEY.sql');

COMMIT;