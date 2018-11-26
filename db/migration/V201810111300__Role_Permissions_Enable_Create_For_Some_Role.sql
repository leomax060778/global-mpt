ALTER TABLE "MKTG_PLANNING_TOOL"."ROLE_PERMISSION" ADD (ENABLE_CREATE TINYINT DEFAULT 0);

UPDATE "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"
SET ENABLE_CREATE = 1
WHERE ROLE_ID = 1;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-168', 'New column ENABLE_CREATE. This means storing an extra permission to create records', 'V201810111300__Role_Permissions_Enable_Create_For_Some_Role.sql');

COMMIT;