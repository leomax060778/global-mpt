CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."INTERLOCK_CENTRAL_REGION_CONTACT_DATA" ("INTERLOCK_CENTRAL_REGION_CONTACT_DATA_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "BMO_LEADS" NVARCHAR(255),
	 "EMPLOYEE_NUMBER" NVARCHAR(255),
	 "EMAIL" NVARCHAR(255) NOT NULL ,
	 "CONTACT_TYPE" INTEGER CS_INT NOT NULL ,
	 "CONTACT_TYPE_ID" BIGINT CS_FIXED,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("INTERLOCK_CENTRAL_REGION_CONTACT_DATA_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."INTERLOCK_CENTRAL_REGION_CONTACT_DATA" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
