CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."HL1_VERSION" ("HL1_ID" BIGINT CS_FIXED NOT NULL ,
	 "VERSION" INTEGER CS_INT NOT NULL ,
	 "ACRONYM" NVARCHAR(25) NOT NULL ,
	 "DESCRIPTION" NVARCHAR(255),
	 "BUDGET" DECIMAL(19,
	2) CS_FIXED NOT NULL ,
	 "BUDGET_YEAR_ID" BIGINT CS_FIXED NOT NULL ,
	 "REGION_ID" BIGINT CS_FIXED,
	 "SUBREGION_ID" BIGINT CS_FIXED,
	 "CRT_RELATED" TINYINT CS_INT DEFAULT 0 NOT NULL ,
	 "IMPLEMENT_EXECUTION_LEVEL" TINYINT CS_INT DEFAULT 0 NOT NULL ,
	 "TEAM_TYPE_ID" BIGINT CS_FIXED NOT NULL ,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 PRIMARY KEY INVERTED VALUE ("HL1_ID",
	 "VERSION")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL1_VERSION" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."HL1_VERSION" ADD FOREIGN KEY ( "HL1_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."HL1" ("HL1_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
