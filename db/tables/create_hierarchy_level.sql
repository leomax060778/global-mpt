CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HIERARCHY_LEVEL" ("HIERARCHY_LEVEL_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "DESCRIPTION" NVARCHAR(255) NOT NULL ,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("HIERARCHY_LEVEL_ID")) UNLOAD PRIORITY 5 AUTO MERGE