CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HL6_PARTNER" ("HL6_PARTNER_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "PARTNER_NAME" NVARCHAR(512),
	 "PARTNER_TYPE_ID" BIGINT CS_FIXED NOT NULL ,
	 "HL6_ID" BIGINT CS_FIXED NOT NULL ,
	 "REGION_ID" BIGINT CS_FIXED,
	 "VALUE" DECIMAL(19,
	6) CS_FIXED,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 "INTEL_PROJECT_ID" NVARCHAR(255),
	 "CLAIM_ID" NVARCHAR(255),
	 "COMMENTS" NVARCHAR(3000),
	 "COMPANY_NAME" NVARCHAR(255),
	 "COMPANY_ADDRESS" NVARCHAR(255),
	 "INVOICE_NUMBER" NVARCHAR(255),
	 "BUDGET_SPEND_REQUEST_ID" BIGINT CS_FIXED,
	 "CURRENCY_ID" BIGINT CS_FIXED NOT NULL ,
	 PRIMARY KEY ("HL6_PARTNER_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_PARTNER" ADD FOREIGN KEY ( "HL6_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."HL6" ("HL6_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_PARTNER" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_PARTNER" ADD FOREIGN KEY ( "PARTNER_TYPE_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."PARTNER_TYPE" ("PARTNER_TYPE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_PARTNER" ADD FOREIGN KEY ( "REGION_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."REGION" ("REGION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6_PARTNER" ADD FOREIGN KEY ( "CURRENCY_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."CURRENCY" ("EURO_CONVERSION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
