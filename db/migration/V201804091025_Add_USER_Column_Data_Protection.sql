ALTER TABLE "MKTG_PLANNING_TOOL"."USER" ADD (DATA_PROTECTION_ENABLED TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-136', 'Add Data Protection Flag in USER Table', 'V201804091025_Add_USER_Column_Data_Protection.sql');

COMMIT;