UPDATE "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY"
SET PROCESSING_REPORT_EXPORT_KEY = 'MKTSEG'
WHERE UPPER(NAME) = 'MARKETING SEGMENT';

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-102', 'update allocation category processing_report_export_key', 'V201712151640__Update_Allocation_Category_Processing_Report_Export_Key.sql');

COMMIT;