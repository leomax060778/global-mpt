ALTER TABLE "MKTG_PLANNING_TOOL"."SEGMENTATION_FORM" ALTER (HL4_ID BIGINT null);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-165', 'Support Null HL4_ID Segmentation Form', 'V201807121609_Support_Null_HL4ID_Segmentation_Form.sql');

COMMIT;
