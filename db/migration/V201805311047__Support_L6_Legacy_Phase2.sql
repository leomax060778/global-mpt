-- --           -- --
-- -- IMPORTANT -- --
-- --           -- --
-- THIS MIGRATION CONTAINS TWO PARTS, PLEASE READ THE INSTRUCTIONS FOR THE SECOND PART, STARING IN LINE 146
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_LEGACY" ADD (ENABLE_ACTIONS tinyint DEFAULT 1);


UPDATE "MKTG_PLANNING_TOOL"."HL6_LEGACY" SET ENABLE_ACTIONS = 0 WHERE HL6_ID IS NULL;
UPDATE "MKTG_PLANNING_TOOL"."HL6_LEGACY" SET ENABLE_ACTIONS = 1 WHERE HL6_ID IS NOT NULL;

INSERT INTO "MKTG_PLANNING_TOOL"."HL6" (
ACRONYM,
ACTUAL_END_DATE,
ACTUAL_START_DATE,
ALLOW_BUDGET_ZERO,
AUX_MARKETING_ACTIVITY_ID,
BUDGET,
BUDGET_SPEND_Q1,
BUDGET_SPEND_Q2,
BUDGET_SPEND_Q3,
BUDGET_SPEND_Q4,
BUSINESS_OWNER_ID,
CAMPAIGN_OBJECTIVE_ID,
CAMPAIGN_SUBTYPE_ID,
CAMPAIGN_TYPE_ID,
CITY,
CO_FUNDED,
COST_CENTER_ID,
COUNTRY,
COUNTRY_ID,
CREATED_DATE_TZ,
CREATED_USER_ID,
DELETED,
DELETED_TOKEN,
DELETION_REASON,
DISTRIBUTION_CHANNEL_ID,
EMPLOYEE_RESPONSIBLE_ID,
EMPLOYEE_RESPONSIBLE_USER,
ENABLED,
EURO_CONVERSION_ID,
EVENT_OWNER,
HL6_CRM_DESCRIPTION,
HL6_STATUS_DETAIL_ID,
IN_BUDGET,
IS_COMPLETE,
IS_POWER_USER,
MARKETING_ACTIVITY_ID,
MARKETING_PROGRAM_ID,
MODIFIED_DATE_TZ,
MODIFIED_USER_ID,
NUMBER_OF_PARTICIPANTS,
PERSON_RESPONSIBLE,
PLANNED_END_DATE,
PLANNED_START_DATE,
POSTAL_CODE,
PRIORITY_ID,
REGION,
RESULTS_CAMPAIGN_Q1,
RESULTS_CAMPAIGN_Q2,
RESULTS_CAMPAIGN_Q3,
RESULTS_CAMPAIGN_Q4,
ROUTE_TO_MARKET_ID,
SALES_ORGANIZATION_ID,
SHOW_ON_DG_CALENDAR,
STREET,
URL,
VENUE,
HL5_ID,
PARENT_PATH
)
 SELECT
SUBSTRING(T.PATH, (SELECT LENGTH(hl_temp.PATH) FROM "MKTG_PLANNING_TOOL"."HL5_LEGACY" hl_temp WHERE hl_temp.HL5_LEGACY_ID = T.HL5_LEGACY_ID) + 1 ),
T.ACTUAL_END_DATE,
T.ACTUAL_START_DATE,
T.ALLOW_BUDGET_ZERO,
T.AUX_MARKETING_ACTIVITY_ID,
T.BUDGET,
T.BUDGET_SPEND_Q1,
T.BUDGET_SPEND_Q2,
T.BUDGET_SPEND_Q3,
T.BUDGET_SPEND_Q4,
T.BUSINESS_OWNER_ID,
T.CAMPAIGN_OBJECTIVE_ID,
T.CAMPAIGN_SUBTYPE_ID,
T.CAMPAIGN_TYPE_ID,
T.CITY,
T.CO_FUNDED,
T.COST_CENTER_ID,
T.COUNTRY,
T.COUNTRY_ID,
T.CREATED_DATE_TZ,
T.CREATED_USER_ID,
T.DELETED,
T.DELETED_TOKEN,
T.DELETION_REASON,
T.DISTRIBUTION_CHANNEL_ID,
T.EMPLOYEE_RESPONSIBLE_ID,
T.EMPLOYEE_RESPONSIBLE_USER,
T.ENABLED,
T.EURO_CONVERSION_ID,
T.EVENT_OWNER,
T.HL6_CRM_DESCRIPTION,
T.HL6_STATUS_DETAIL_ID,
T.IN_BUDGET,
T.IS_COMPLETE,
T.IS_POWER_USER,
T.MARKETING_ACTIVITY_ID,
T.MARKETING_PROGRAM_ID,
T.MODIFIED_DATE_TZ,
T.MODIFIED_USER_ID,
T.NUMBER_OF_PARTICIPANTS,
T.PERSON_RESPONSIBLE,
T.PLANNED_END_DATE,
T.PLANNED_START_DATE,
T.POSTAL_CODE,
T.PRIORITY_ID,
T.REGION,
T.RESULTS_CAMPAIGN_Q1,
T.RESULTS_CAMPAIGN_Q2,
T.RESULTS_CAMPAIGN_Q3,
T.RESULTS_CAMPAIGN_Q4,
T.ROUTE_TO_MARKET_ID,
T.SALES_ORGANIZATION_ID,
T.SHOW_ON_DG_CALENDAR,
T.STREET,
T.URL,
T.VENUE,
NULL,
T5.PATH
FROM "MKTG_PLANNING_TOOL"."HL6_LEGACY" T, "MKTG_PLANNING_TOOL"."HL5_LEGACY" T5 WHERE T.HL6_ID IS NULL AND T.HL5_LEGACY_ID = T5.HL5_LEGACY_ID;



UPDATE "MKTG_PLANNING_TOOL"."HL6_LEGACY" LEGACY
 SET HL6_ID = AUX.HL6_ID
FROM (
 SELECT HL6.HL6_ID , CONCAT (HL6.PARENT_PATH, HL6.ACRONYM) AS PATH
  FROM "MKTG_PLANNING_TOOL"."HL6" HL6, "MKTG_PLANNING_TOOL"."HL6_LEGACY" HL6L
  WHERE HL6.HL5_ID IS NULL
  AND HL6L.PATH = CONCAT (HL6.PARENT_PATH, HL6.ACRONYM)
 ) AUX, "MKTG_PLANNING_TOOL"."HL6_LEGACY" LEGACY
WHERE LEGACY.PATH = AUX.PATH;



-- IMPORTANT : IN ORDER TO BE ABLE TO DROP ALL NECESSARY COLUMNS, WE HAVE TO DELETE TWO FK:

-- STEP 1: RUN THE FOLLOWING QUERY:
--- *----
-- select * from "PUBLIC"."REFERENTIAL_CONSTRAINTS" WHERE TABLE_NAME = 'HL6_LEGACY'; -- Seach the constrait name for Status ID &  Currency
--- *----

-- STEP 2: RETRIEVE THE RIGHT CONSTRAINT_NAME  FOR Status ID and Currency , examples:  _SYS_CONSTRAINT_1079122_#17_#F0; -- Status ID SYS_CONSTRAINT_1079122_#13_#F0; -- Currency
-- ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_LEGACY"  DROP CONSTRAINT {CONSTRAINT_NAME}; -- Status ID
-- ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_LEGACY"  DROP CONSTRAINT {CONSTRAINT_NAME}; -- Currency

-- STEP 3: RUN THE FOLLOWING QUERY:
-- ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_LEGACY" DROP ("HL6_CRM_DESCRIPTION"
--                                                                              ,"PATH"
--                                                                              ,"BUDGET"
--                                                                              ,"ROUTE_TO_MARKET_ID"
--                                                                              ,"CAMPAIGN_OBJECTIVE_ID"
--                                                                              ,"CAMPAIGN_TYPE_ID"
--                                                                              ,"CAMPAIGN_SUBTYPE_ID"
--                                                                              ,"MARKETING_PROGRAM_ID"
--                                                                              ,"MARKETING_ACTIVITY_ID"
--                                                                              ,"ACTUAL_START_DATE"
--                                                                              ,"ACTUAL_END_DATE"
--                                                                              ,"SHOW_ON_DG_CALENDAR"
--                                                                              ,"BUSINESS_OWNER_ID"
--                                                                              ,"EMPLOYEE_RESPONSIBLE_ID"
--                                                                              ,"COST_CENTER_ID"
--                                                                              ,"IN_BUDGET"
--                                                                              ,"BUDGET_SPEND_Q1"
--                                                                              ,"BUDGET_SPEND_Q2"
--                                                                              ,"BUDGET_SPEND_Q3"
--                                                                              ,"BUDGET_SPEND_Q4"
--                                                                              ,"EURO_CONVERSION_ID"
--                                                                              ,"HL6_STATUS_DETAIL_ID"
--                                                                              ,"SALES_ORGANIZATION_ID"
--                                                                              ,"DISTRIBUTION_CHANNEL_ID"
--                                                                              ,"VENUE"
--                                                                              ,"CITY"
--                                                                              ,"COUNTRY"
--                                                                              ,"URL"
--                                                                              ,"RESULTS_CAMPAIGN_Q1"
--                                                                              ,"RESULTS_CAMPAIGN_Q2"
--                                                                              ,"RESULTS_CAMPAIGN_Q3"
--                                                                              ,"RESULTS_CAMPAIGN_Q4"
--                                                                              ,"PLANNED_START_DATE"
--                                                                              ,"PLANNED_END_DATE"
--                                                                              ,"STREET"
--                                                                              ,"POSTAL_CODE"
--                                                                              ,"PRIORITY_ID"
--                                                                              ,"NUMBER_OF_PARTICIPANTS"
--                                                                              ,"REGION"
--                                                                              ,"EVENT_OWNER"
--                                                                              ,"CO_FUNDED"
--                                                                              ,"ALLOW_BUDGET_ZERO"
--                                                                              ,"IS_POWER_USER"
--                                                                              ,"DELETED_TOKEN"
--                                                                              ,"EMPLOYEE_RESPONSIBLE_USER"
--                                                                              ,"PERSON_RESPONSIBLE"
--                                                                              ,"IS_COMPLETE"
--                                                                              ,"DELETION_REASON"
--                                                                              ,"COUNTRY_ID"
--                                                                              ,"AUX_MARKETING_ACTIVITY_ID");
--

-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-159', 'Support L6 Legacy L6 Phase2', 'V201805311047__Support_L6_Legacy_Phase2.sql');

COMMIT;