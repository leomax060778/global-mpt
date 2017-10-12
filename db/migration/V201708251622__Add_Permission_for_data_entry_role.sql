INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(ROLE_ID, RESOURCE_ID, PERMISSION_ID, CREATED_USER_ID)
	VALUES(3,11,9, 1);


	INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(ROLE_ID, RESOURCE_ID, PERMISSION_ID, CREATED_USER_ID)
	VALUES(3,11,10, 1);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-57', 'Added Permission for data entry role', 'V201708251622__Add_Permission_for_data_entry_role.sql');

COMMIT;