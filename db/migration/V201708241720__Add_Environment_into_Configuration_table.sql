-- IMPORTANT: remember to change the VALUE depending on the environment in wich the migration will be executed
INSERT INTO "MKTG_PLANNING_TOOL"."CONFIGURATION"(KEY, VALUE, DESCRIPTION, CREATED_USER_ID)
	VALUES('Environment', 'Staging', 'Specified the environment in wich the tool is running. Can be: Development, Staging or Production.', 1);
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-56', 'Added Environment into the Configuration table', 'V201708241720__Add_Environment_into_Configuration_table.sql');

COMMIT;