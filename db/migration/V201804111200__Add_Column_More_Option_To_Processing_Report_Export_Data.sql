ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (IMP6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIMP_PERCENTAGE6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (IMP7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIMP_PERCENTAGE7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (IMP8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIMP_PERCENTAGE8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (IMP9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIMP_PERCENTAGE9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (IMP10  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIMP_PERCENTAGE10  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (MKTSEG6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZMSEG_PERCENTAGE6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (MKTSEG7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZMSEG_PERCENTAGE7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (MKTSEG8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZMSEG_PERCENTAGE8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (MKTSEG9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZMSEG_PERCENTAGE9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (MKTSEG10  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZMSEG_PERCENTAGE10  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (INDUSTRY6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIND_PERCENTAGE6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (INDUSTRY7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIND_PERCENTAGE7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (INDUSTRY8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIND_PERCENTAGE8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (INDUSTRY9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIND_PERCENTAGE9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (INDUSTRY10  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZIND_PERCENTAGE10  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (SOLUTION6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZSOL_PERCENTAGE6  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (SOLUTION7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZSOL_PERCENTAGE7  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (SOLUTION8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZSOL_PERCENTAGE8  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (SOLUTION9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZSOL_PERCENTAGE9  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (SOLUTION10  NVARCHAR(255));
ALTER TABLE PROCESSING_REPORT_EXPORT_DATA ADD (ZZSOL_PERCENTAGE10  NVARCHAR(255));


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-140', 'Add Column More Option To Processing Report Export Data', 'V201804111200__Add_Column_More_Option_To_Processing_Report_Export_Data.sql');

COMMIT;