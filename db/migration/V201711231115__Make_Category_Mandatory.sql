
ALTER TABLE "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" ADD (MAKE_CATEGORY_MANDATORY TINYINT DEFAULT 1);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-90', 'Make Category Mandatory', 'V201711231115__Make_Category_Mandatory.sql');

COMMIT;