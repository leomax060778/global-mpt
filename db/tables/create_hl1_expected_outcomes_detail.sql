CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HL1_EXPECTED_OUTCOMES_DETAIL" ("HL1_EXPECTED_OUTCOMES_DETAILS_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "HL1_EXPECTED_OUTCOMES_ID" BIGINT CS_FIXED NOT NULL ,
	 "EXPECTED_OUTCOME_LEVEL_ID" BIGINT CS_FIXED NOT NULL ,
	 "EURO_VALUE" DECIMAL(19,
	2) CS_FIXED DEFAULT 0 NOT NULL ,
	 "VOLUME_VALUE" DECIMAL(19,
	2) CS_FIXED DEFAULT 0 NOT NULL ,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("HL1_EXPECTED_OUTCOMES_DETAILS_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL1_EXPECTED_OUTCOMES_DETAIL" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL1_EXPECTED_OUTCOMES_DETAIL" ADD FOREIGN KEY ( "EXPECTED_OUTCOME_LEVEL_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."EXPECTED_OUTCOME_LEVEL" ("EXPECTED_OUTCOME_LEVEL_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL1_EXPECTED_OUTCOMES_DETAIL" ADD FOREIGN KEY ( "HL1_EXPECTED_OUTCOMES_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."HL1_EXPECTED_OUTCOMES" ("HL1_EXPECTED_OUTCOMES_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
