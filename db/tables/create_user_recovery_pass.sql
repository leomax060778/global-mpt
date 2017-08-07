CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."USER_RECOVERY_TOKEN"
(
	USER_RECOVERY_TOKEN_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	USER_ID BIGINT NOT NULL,
	PASSWORD NVARCHAR(255),
	TOKEN NVARCHAR(255),
	TOKEN_CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	TOKEN_VALID_UNTIL_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	TOKEN_DURATION INTEGER NOT NULL,
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1, 
	DELETED TINYINT DEFAULT 0
);

ALTER TABLE "MKTG_PLANNING_TOOL"."USER_RECOVERY_TOKEN" ADD FOREIGN KEY ( "USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
