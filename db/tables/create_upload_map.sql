CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."UPLOAD_MAP" ("UPLOAD_MAP_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "TYPE" INTEGER CS_INT,
	 "COLUMN_NAME" NVARCHAR(255),
	 "CSV_COLUMN_NAME" NVARCHAR(255),
	 "DATA_TYPE" NVARCHAR(25),
	 "FOREIGN_TABLE_NAME" NVARCHAR(255),
	 "FOREIGN_COLUMN_REFERENCE" NVARCHAR(255),
	 "FOREIGN_COLUMN_FILTER" NVARCHAR(255),
	 "OTHER_CONDITION" NVARCHAR(1000),
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("UPLOAD_MAP_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."UPLOAD_MAP" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
