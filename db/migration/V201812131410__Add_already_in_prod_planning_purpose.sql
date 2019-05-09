INSERT INTO "MKTG_PLANNING_TOOL"."PLANNING_PURPOSE" (PLANNING_PURPOSE_ID, NAME, TEAM_TYPE_ID, CREATED_USER_ID)
	VALUES(7, 'Industry Marketing', 2, 1)

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-174', 'Add new Planning Purpose already in Prod: Industry Marketing', 'V201812131410__Add_already_in_prod_planning_purpose.sql');

     COMMIT;