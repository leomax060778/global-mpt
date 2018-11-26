CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."PLANNING_PURPOSE_OPTION"(
	PLANNING_PURPOSE_OPTION_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	NAME NVARCHAR(255),
	PLANNING_PURPOSE_ID BIGINT,
    ENABLED TINYINT DEFAULT 1,
    DELETED TINYINT DEFAULT 0,

	CREATED_USER_ID BIGINT,
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_USER_ID BIGINT,
	MODIFIED_DATE_TZ TIMESTAMP

);

ALTER TABLE "MKTG_PLANNING_TOOL"."PLANNING_PURPOSE_OPTION" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE "MKTG_PLANNING_TOOL"."PLANNING_PURPOSE_OPTION" ADD FOREIGN KEY ( "PLANNING_PURPOSE_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."PLANNING_PURPOSE" ("PLANNING_PURPOSE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT;