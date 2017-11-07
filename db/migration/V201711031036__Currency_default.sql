
ALTER TABLE "MKTG_PLANNING_TOOL"."CURRENCY" ADD (DEFAULT_CURRENCY TINYINT NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-81', 'Add Default currency', 'V201711031030__Currency_default.sql');

COMMIT;