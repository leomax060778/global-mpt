CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."USER_SESSION_TOKEN" ("USER_SESSION_TOKEN_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "TOKEN" NVARCHAR(255),
	 "TOKEN_CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "TOKEN_VALID_UNTIL_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "TOKEN_DURATION" INTEGER CS_INT NOT NULL ,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("USER_SESSION_TOKEN_ID")) UNLOAD PRIORITY 5 AUTO MERGE