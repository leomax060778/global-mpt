CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HL6" ("HL6_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "HL6_CRM_DESCRIPTION" NVARCHAR(100) NOT NULL ,
	 "ACRONYM" NVARCHAR(25) NOT NULL ,
	 "BUDGET" DECIMAL(19,
	2) CS_FIXED NOT NULL ,
	 "HL5_ID" BIGINT CS_FIXED NOT NULL ,
	 "ROUTE_TO_MARKET_ID" BIGINT CS_FIXED,
	 "CAMPAIGN_OBJECTIVE_ID" BIGINT CS_FIXED,
	 "CAMPAIGN_TYPE_ID" BIGINT CS_FIXED,
	 "CAMPAIGN_SUBTYPE_ID" BIGINT CS_FIXED,
	 "MARKETING_PROGRAM_ID" BIGINT CS_FIXED,
	 "MARKETING_ACTIVITY_ID" BIGINT CS_FIXED,
	 "ACTUAL_START_DATE" LONGDATE CS_LONGDATE,
	 "ACTUAL_END_DATE" LONGDATE CS_LONGDATE,
	 "SHOW_ON_DG_CALENDAR" TINYINT CS_INT DEFAULT 0,
	 "BUSINESS_OWNER_ID" BIGINT CS_FIXED,
	 "EMPLOYEE_RESPONSIBLE_ID" BIGINT CS_FIXED,
	 "COST_CENTER_ID" BIGINT CS_FIXED,
	 "IN_BUDGET" TINYINT CS_INT NOT NULL ,
	 "BUDGET_SPEND_Q1" DECIMAL(19,
	2) CS_FIXED NOT NULL ,
	 "BUDGET_SPEND_Q2" DECIMAL(19,
	2) CS_FIXED NOT NULL ,
	 "BUDGET_SPEND_Q3" DECIMAL(19,
	2) CS_FIXED NOT NULL ,
	 "BUDGET_SPEND_Q4" DECIMAL(19,
	2) CS_FIXED NOT NULL ,
	 "EURO_CONVERSION_ID" BIGINT CS_FIXED NOT NULL ,
	 "HL6_STATUS_DETAIL_ID" BIGINT CS_FIXED NOT NULL ,
	 "SALES_ORGANIZATION_ID" BIGINT CS_FIXED,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 "DISTRIBUTION_CHANNEL_ID" BIGINT CS_FIXED,
	 "VENUE" NVARCHAR(255),
	 "CITY" NVARCHAR(255),
	 "COUNTRY" NVARCHAR(255),
	 "URL" NVARCHAR(255),
	 "RESULTS_CAMPAIGN_Q1" DECIMAL(19,
	2) CS_FIXED DEFAULT 0 NOT NULL ,
	 "RESULTS_CAMPAIGN_Q2" DECIMAL(19,
	2) CS_FIXED DEFAULT 0 NOT NULL ,
	 "RESULTS_CAMPAIGN_Q3" DECIMAL(19,
	2) CS_FIXED DEFAULT 0 NOT NULL ,
	 "RESULTS_CAMPAIGN_Q4" DECIMAL(19,
	2) CS_FIXED DEFAULT 0 NOT NULL ,
	 "PLANNED_START_DATE" LONGDATE CS_LONGDATE,
	 "PLANNED_END_DATE" LONGDATE CS_LONGDATE,
	 "STREET" NVARCHAR(255),
	 "POSTAL_CODE" NVARCHAR(20),
	 "PRIORITY_ID" BIGINT CS_FIXED,
	 "NUMBER_OF_PARTICIPANTS" NVARCHAR(255),
	 "REGION" NVARCHAR(255),
	 "EVENT_OWNER" NVARCHAR(255),
	 "IMPORTED" TINYINT CS_INT,
	 "IMPORT_ID" BIGINT CS_FIXED,
	 "CO_FUNDED" TINYINT CS_INT DEFAULT 0 NOT NULL ,
	 "ALLOW_BUDGET_ZERO" TINYINT CS_INT DEFAULT 0,
	 "IS_POWER_USER" TINYINT CS_INT DEFAULT 1,
	 "DELETED_TOKEN" NVARCHAR(255),
	 "EMPLOYEE_RESPONSIBLE_USER" NVARCHAR(7),
	 "PERSON_RESPONSIBLE" NVARCHAR(7),
	 PRIMARY KEY ("HL6_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
CREATE INDEX "IDX_HL6_ACRONYM" ON "MKTG_PLANNING_TOOL"."HL6" ( "ACRONYM" ASC )
;
CREATE UNIQUE INDEX "UK_HL6_CRM_ID" ON "MKTG_PLANNING_TOOL"."HL6" ( "HL5_ID" ASC,
	 "ACRONYM" ASC,
	 "DELETED_TOKEN" ASC )
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD FOREIGN KEY ( "HL6_STATUS_DETAIL_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."HL6_STATUS_DETAIL" ("HL6_STATUS_DETAIL_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD FOREIGN KEY ( "ROUTE_TO_MARKET_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."ROUTE_TO_MARKET" ("ROUTE_TO_MARKET_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD FOREIGN KEY ( "SALES_ORGANIZATION_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."SALE_ORGANIZATION" ("SALES_ORGANIZATION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD FOREIGN KEY ( "EURO_CONVERSION_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."CURRENCY" ("EURO_CONVERSION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD CONSTRAINT "IMPORT_ID_L6" FOREIGN KEY ( "IMPORT_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."IMPORT_L5_L6" ("IMPORT_L5_L6_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
