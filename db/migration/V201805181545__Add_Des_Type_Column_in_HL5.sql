
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5" ADD (DES_TYPE_ID bigint);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-157', 'Add Des_Type Column in HL5', 'V20180518__Add_Des_Type_Column_in_HL5.sql');

COMMIT;

