UPDATE "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY"
SET PROCESSING_REPORT_EXPORT_KEY = 'INTPLAN'
WHERE UPPER(NAME) = UPPER('AUDIENCE INTEGRATED PLANS');

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-93', 'Processing Report Key For Integrated Plans Category', 'V201711301225__Processing_Report_Key_For_Integrated_Plans.sql');

COMMIT;