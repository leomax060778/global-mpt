CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HL4_STATUS_DETAIL" ("HL4_STATUS_DETAIL_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "DETAIL" NVARCHAR(255) NOT NULL ,
	 PRIMARY KEY ("HL4_STATUS_DETAIL_ID")) UNLOAD PRIORITY 5 AUTO MERGE 