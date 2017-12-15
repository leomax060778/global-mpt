CREATE PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_UPD_PROCESSING_REPORT_EXPORT_DATA" (
)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER

	AS
BEGIN
DECLARE va_result bigint;
 DECLARE CURSOR c_export_hl4 FOR
  SELECT HL_ID from PROCESSING_REPORT_EXPORT_DATA
  where OBJECT_TYPE = 'MPL';

 DECLARE CURSOR c_export_hl5 FOR
  SELECT HL_ID from PROCESSING_REPORT_EXPORT_DATA
  where OBJECT_TYPE = 'CPG';

 DECLARE CURSOR c_export_hl6 FOR
  SELECT HL_ID from PROCESSING_REPORT_EXPORT_DATA
  where OBJECT_TYPE = 'CPT';

 FOR cur_row1 as c_export_hl4 DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_PROCESSING_REPORT_EXPORT_DATA" (cur_row1.HL_ID, 'HL4', va_result);
 END FOR;

 FOR cur_row2 as c_export_hl5 DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_PROCESSING_REPORT_EXPORT_DATA" (cur_row2.HL_ID, 'HL5', va_result);
 END FOR;

 FOR cur_row3 as c_export_hl6 DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_PROCESSING_REPORT_EXPORT_DATA" (cur_row3.HL_ID, 'HL6', va_result);
 END FOR;

END;


call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_UPD_PROCESSING_REPORT_EXPORT_DATA"();

drop procedure "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_UPD_PROCESSING_REPORT_EXPORT_DATA";

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-100', 'Get_Upd_Processing_Report_Export_Data call to UPD_PROCESSING_REPORT_EXPORT_DATA procedure and update data', 'V201712131455__Fix_Upd_Processing_Report_Export_Shopping_Cart_Approver_Data.sql');

COMMIT;