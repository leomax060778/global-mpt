ALTER TABLE "MKTG_PLANNING_TOOL"."DES_TYPE" ADD (MPT_IS_REQUIRED TINYINT DEFAULT 0);

UPDATE "MKTG_PLANNING_TOOL"."DES_TYPE"
SET MPT_IS_REQUIRED = 1
WHERE NAME = 'SAP Hosted - Webinars (on-demand)';

UPDATE "MKTG_PLANNING_TOOL"."DES_TYPE"
SET MPT_IS_REQUIRED = 1
WHERE NAME = '3rd party hosted - Webinars (on-demand)';

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-194', 'Add Column MPT_IS_REQUIRED to DES_TYPE Table', 'V202004241515__Add_column_mpt_is_required_des_type_table.sql');

COMMIT;
