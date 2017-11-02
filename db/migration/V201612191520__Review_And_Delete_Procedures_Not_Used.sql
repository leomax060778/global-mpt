DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_ALL_OBJECTIVE_CAMPAIGN_TYPE_BY_OBJECTIVE";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_ALL_ORIGIN_PLAN";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_CRM_BY_ID";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_HL3_FILTER";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_OBJECTIVE_CAMPAIGN_TYPE_BY_OBJECTIVE_CAMPAIGN_SUB_TYPE_CAMPAIGN_TYPE";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_ORIGIN_PARENT";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_PLAN_BY_BUDGET_YEAR_ID";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_OBJECTIVE_CAMPAIGN_TYPE";
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::GET_ROUTE_BY_HL3_ID";

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V5.0.0-08', 'Review And Delete Procedures Not Used', 'V201612191520__Review_And_Delete_Procedures_Not_Used.sql');

COMMIT;