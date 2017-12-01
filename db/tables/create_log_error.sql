CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."LOG_ERROR" ("ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "TIME_STAMP" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "NAME_ERROR" NVARCHAR(255),
	 "MESSAGE" NVARCHAR(1000),
	 "STACK" TEXT SYNC PHRASE INDEX RATIO 0.000000 FUZZY SEARCH INDEX OFF SEARCH ONLY OFF FAST PREPROCESS ON TEXT MINING OFF TEXT ANALYSIS OFF TOKEN SEPARATORS '\/;,.:-_()[]<>!?*@+{}="&#$~|',
	 "DETAILS" TEXT SYNC PHRASE INDEX RATIO 0.000000 FUZZY SEARCH INDEX OFF SEARCH ONLY OFF FAST PREPROCESS ON TEXT MINING OFF TEXT ANALYSIS OFF TOKEN SEPARATORS '\/;,.:-_()[]<>!?*@+{}="&#$~|',
	 "USER_ID" BIGINT CS_FIXED,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 PRIMARY KEY ("ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."LOG_ERROR" ADD FOREIGN KEY ( "MODIFIED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
