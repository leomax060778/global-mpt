INSERT INTO "MKTG_PLANNING_TOOL"."HL4_STATUS_DETAIL"(HL4_STATUS_DETAIL_ID, DETAIL) values (7, 'Valid for CRM');

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-101', 'New Status Valid for CRM into table hl4_status_detail', 'V201712151035__New_Status_Valid_for_CRM_hl4_status_detail.sql');

COMMIT;