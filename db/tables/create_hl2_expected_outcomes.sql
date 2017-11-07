CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HL2_EXPECTED_OUTCOMES" ("HL2_EXPECTED_OUTCOMES_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "HL2_ID" BIGINT CS_FIXED NOT NULL ,
	 "COMMENTS" NVARCHAR(3000),
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("HL2_EXPECTED_OUTCOMES_ID")) UNLOAD PRIORITY 5 AUTO MERGE 
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL2_EXPECTED_OUTCOMES" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL2_EXPECTED_OUTCOMES" ADD FOREIGN KEY ( "HL2_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."HL2" ("HL2_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
