/*

Run this migration file after creating the following SPs

INS_HL4_IN_CRM_VERSION
INS_HL5_IN_CRM_VERSION
INS_HL6_IN_CRM_VERSION
INS_HL4_ALLOCATION_CATEGORY_OPTION_IN_CRM_VERSION
INS_HL5_ALLOCATION_CATEGORY_OPTION_IN_CRM_VERSION
INS_HL5_ALLOCATION_COUNTRY_CATEGORY_OPTION_IN_CRM_VERSION
INS_HL6_ALLOCATION_CATEGORY_OPTION_IN_CRM_VERSION
INS_HL6_ALLOCATION_COUNTRY_CATEGORY_OPTION_IN_CRM_VERSION

*/

CREATE PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL4_HL5_HL6_IN_CRM_VERSION" (
)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER

	AS
BEGIN
    DECLARE va_result bigint;

    DECLARE CURSOR c_hl4 FOR
    SELECT HL4_ID from HL4
    where HL4_STATUS_DETAIL_ID = 3
    AND ENABLED = 1 AND DELETED = 0;

    DECLARE CURSOR c_hl5 FOR
    SELECT HL5_ID from HL5
    where HL5_STATUS_DETAIL_ID = 3
    AND ENABLED = 1 AND DELETED = 0;

    DECLARE CURSOR c_hl6 FOR
    SELECT HL6_ID from HL6
    where HL6_STATUS_DETAIL_ID = 3
    AND ENABLED = 1 AND DELETED = 0;

    FOR cur_row3 as c_hl4 DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL4_IN_CRM_VERSION" (cur_row3.HL4_ID, va_result);
    END FOR;

    FOR cur_row1 as c_hl5 DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL5_IN_CRM_VERSION" (cur_row1.HL5_ID, va_result);
    END FOR;

    FOR cur_row2 as c_hl6 DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL6_IN_CRM_VERSION" (cur_row2.HL6_ID, va_result);
    END FOR;
END;

CREATE PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL4_HL5_HL6_CATEGORY_OPTION_IN_CRM_VERSION" (
)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER

	AS
BEGIN
    DECLARE va_result bigint;

    DECLARE CURSOR c_hl4_in_crm_version FOR
    SELECT HL4_ID, HL4_IN_CRM_VERSION_ID from HL4_IN_CRM_VERSION;

    DECLARE CURSOR c_hl5_in_crm_version FOR
    SELECT HL5_ID, HL5_IN_CRM_VERSION_ID from HL5_IN_CRM_VERSION;

    DECLARE CURSOR c_hl6_in_crm_version FOR
    SELECT HL6_ID, HL6_IN_CRM_VERSION_ID from HL6_IN_CRM_VERSION;

    FOR cur_row7 as c_hl4_in_crm_version DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL4_ALLOCATION_CATEGORY_OPTION_IN_CRM_VERSION" (cur_row7.HL4_ID, cur_row7.HL4_IN_CRM_VERSION_ID, va_result);
    END FOR;

    FOR cur_row3 as c_hl5_in_crm_version DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL5_ALLOCATION_CATEGORY_OPTION_IN_CRM_VERSION" (cur_row3.HL5_ID, cur_row3.HL5_IN_CRM_VERSION_ID, va_result);
    END FOR;

    FOR cur_row4 as c_hl5_in_crm_version DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL5_ALLOCATION_COUNTRY_CATEGORY_OPTION_IN_CRM_VERSION" (cur_row4.HL5_ID, cur_row4.HL5_IN_CRM_VERSION_ID, va_result);
    END FOR;

    FOR cur_row5 as c_hl6_in_crm_version DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL6_ALLOCATION_CATEGORY_OPTION_IN_CRM_VERSION" (cur_row5.HL6_ID, cur_row5.HL6_IN_CRM_VERSION_ID, va_result);
    END FOR;

    FOR cur_row6 as c_hl6_in_crm_version DO
    call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::INS_HL6_ALLOCATION_COUNTRY_CATEGORY_OPTION_IN_CRM_VERSION" (cur_row6.HL6_ID, cur_row6.HL6_IN_CRM_VERSION_ID, va_result);
    END FOR;
END;


call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL4_HL5_HL6_IN_CRM_VERSION"();
call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL4_HL5_HL6_CATEGORY_OPTION_IN_CRM_VERSION"();

drop procedure "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL4_HL5_HL6_IN_CRM_VERSION";
drop procedure "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL4_HL5_HL6_CATEGORY_OPTION_IN_CRM_VERSION";

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-144', 'Processing report - Implement new mechanism to identify the changes - Update In Crm Version', 'V2001804241200__Processing report_Implement_New_Mechanism_To_Identify_Changes_Update_In_Crm_Version.sql');

COMMIT;

