CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."SERVICE_REQUEST_CATEGORY_OPTION_LEVEL" ("SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "SERVICE_REQUEST_CATEGORY_ID" BIGINT CS_FIXED NOT NULL ,
	 "SERVICE_REQUEST_OPTION_ID" BIGINT CS_FIXED NOT NULL ,
	 "HIERARCHY_LEVEL_ID" BIGINT CS_FIXED NOT NULL ,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."SERVICE_REQUEST_CATEGORY_OPTION_LEVEL" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."SERVICE_REQUEST_CATEGORY_OPTION_LEVEL" ADD FOREIGN KEY ( "SERVICE_REQUEST_CATEGORY_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."SERVICE_REQUEST_CATEGORY" ("SERVICE_REQUEST_CATEGORY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."SERVICE_REQUEST_CATEGORY_OPTION_LEVEL" ADD FOREIGN KEY ( "SERVICE_REQUEST_OPTION_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."SERVICE_REQUEST_OPTION" ("SERVICE_REQUEST_OPTION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."SERVICE_REQUEST_CATEGORY_OPTION_LEVEL" ADD FOREIGN KEY ( "HIERARCHY_LEVEL_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."HIERARCHY_LEVEL" ("HIERARCHY_LEVEL_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
