INSERT INTO "MKTG_PLANNING_TOOL"."PLANNING_PURPOSE" (PLANNING_PURPOSE_ID, NAME, TEAM_TYPE_ID, CREATED_USER_ID)
	VALUES(6, 'Other Marketing', 2, 1);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-173', 'Add new Planning Purpose: Other Marketing', 'V201811291245__Add_new_planning_purpose.sql');

     COMMIT;