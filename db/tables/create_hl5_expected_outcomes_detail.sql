CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" ("HL5_EXPECTED_OUTCOMES_DETAILS_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "HL5_EXPECTED_OUTCOMES_ID" BIGINT CS_FIXED NOT NULL ,
	 "OUTCOMES_ID_BKP" BIGINT CS_FIXED,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 "OUTCOMES_ID" BIGINT CS_FIXED,
	 "EURO_VALUE" DECIMAL(19,
	6) CS_FIXED,
	 "VOLUME_VALUE" DECIMAL(19,
	6) CS_FIXED,
	 PRIMARY KEY ("HL5_EXPECTED_OUTCOMES_DETAILS_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
COMMENT ON COLUMN "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL"."OUTCOMES_ID" is 'FK to EXPECTED_OUTCOME_LEVEL'
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" ADD FOREIGN KEY ( "HL5_EXPECTED_OUTCOMES_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES" ("HL5_EXPECTED_OUTCOMES_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" ADD FOREIGN KEY ( "OUTCOMES_ID_BKP" ) REFERENCES "MKTG_PLANNING_TOOL"."OUTCOMES" ("OUTCOMES_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" ADD CONSTRAINT "HL5_OUTCOMES_ID" FOREIGN KEY ( "OUTCOMES_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."EXPECTED_OUTCOME_LEVEL" ("EXPECTED_OUTCOME_LEVEL_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
