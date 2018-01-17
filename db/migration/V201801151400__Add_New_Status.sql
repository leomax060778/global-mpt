INSERT INTO "MKTG_PLANNING_TOOL"."HL5_STATUS_DETAIL" (HL5_STATUS_DETAIL_ID, DETAIL, CREATED_USER_ID)
VALUES (8, 'In CRM-Need New Budget Approval', 1);

INSERT INTO "MKTG_PLANNING_TOOL"."HL6_STATUS_DETAIL" (HL6_STATUS_DETAIL_ID, DETAIL, CREATED_USER_ID)
VALUES (8, 'In CRM-Need New Budget Approval', 1);

--***************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-116', 'Add new status for execution levels', 'V201801151400__Add_New_Status.sql');

COMMIT;