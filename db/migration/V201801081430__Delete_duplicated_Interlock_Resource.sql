-- Please find and set the RESOURCE_ID from "RESOURCE" table
-- DELETE FROM "MKTG_PLANNING_TOOL"."RESOURCE" WHERE resource_id = 17;

--***************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-113', 'Delete duplicated Interlock resource', 'V201801081430__Delete_duplicated_Interlock_Resource.sql');

COMMIT;