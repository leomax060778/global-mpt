UPDATE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_FIELD"
SET FIELD_NAME = 'TARGET_AUDIENCE',
    FIELD_TYPE = 'select'
WHERE DYNAMIC_FORM_FIELD_ID = 101;

UPDATE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_FIELD"
SET FIELD_NAME = 'TARGET_AUDIENCE',
    FIELD_TYPE = 'select'
WHERE DYNAMIC_FORM_FIELD_ID = 112;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-188', 'Change Target Audience Dynamic Form Field Name for HL5/HL6', 'V201911281610__Change_Target_Audience_Dynamic_Form_Field_Name.sql');

COMMIT;
