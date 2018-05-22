UPDATE "MKTG_PLANNING_TOOL"."BUDGET_SPEND_REQUEST"
SET AMOUNT = AMOUNT * 1000;

UPDATE "MKTG_PLANNING_TOOL"."HL1"
SET BUDGET = BUDGET * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL1_VERSION"
SET BUDGET = BUDGET * 1000;

UPDATE "MKTG_PLANNING_TOOL"."HL2"
SET HL2_BUDGET_TOTAL = HL2_BUDGET_TOTAL * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL2_VERSION"
SET HL2_BUDGET_TOTAL = HL2_BUDGET_TOTAL * 1000;

UPDATE "MKTG_PLANNING_TOOL"."HL3"
SET HL3_FNC_BUDGET_TOTAL = HL3_FNC_BUDGET_TOTAL * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL3_VERSION"
SET HL3_FNC_BUDGET_TOTAL = HL3_FNC_BUDGET_TOTAL * 1000;

UPDATE "MKTG_PLANNING_TOOL"."HL4"
SET HL4_FNC_BUDGET_TOTAL_MKT = HL4_FNC_BUDGET_TOTAL_MKT * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL4_IN_CRM_VERSION"
SET HL4_FNC_BUDGET_TOTAL_MKT = HL4_FNC_BUDGET_TOTAL_MKT * 1000;

UPDATE "MKTG_PLANNING_TOOL"."HL5"
SET BUDGET = BUDGET * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL5_IN_CRM_VERSION"
SET BUDGET = BUDGET * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL5_LEGACY"
SET BUDGET = BUDGET * 1000;

UPDATE "MKTG_PLANNING_TOOL"."HL6"
SET BUDGET = BUDGET * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL6_IN_CRM_VERSION"
SET BUDGET = BUDGET * 1000;
UPDATE "MKTG_PLANNING_TOOL"."HL6_LEGACY"
SET BUDGET = BUDGET * 1000;

UPDATE "MKTG_PLANNING_TOOL"."INTERLOCK_REQUEST"
SET REQUESTED_BUDGET = REQUESTED_BUDGET * 1000;


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-155', 'Update Budget Fields to express this value in thousands, as a real value.', 'V201805111500__UpdateBudgetFields.sql');

COMMIT;
