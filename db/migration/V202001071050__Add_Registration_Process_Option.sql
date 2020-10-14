--The Created User ID is Eddie Rivas
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (9, 'Other', 85);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-191', 'Add Other as Registration Process Option', 'V202001071050__Add_Registration_Process_Option.sql');

COMMIT;
