CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."SEGMENTATION_FORM_SEGMENTATION_TACTIC" ("SEGMENTATION_FORM_SEGMENTATION_TACTIC_ID" BIGINT CS_FIXED GENERATED BY DEFAULT AS IDENTITY NOT NULL ,
	 "SEGMENTATION_FORM_ID" BIGINT CS_FIXED NOT NULL ,
	 "SEGMENTATION_TACTIC_ID" BIGINT CS_FIXED NOT NULL ,
	 "CREATED_DATE_TZ" LONGDATE CS_LONGDATE DEFAULT CURRENT_TIMESTAMP,
	 "MODIFIED_DATE_TZ" LONGDATE CS_LONGDATE,
	 "CREATED_USER_ID" BIGINT CS_FIXED NOT NULL ,
	 "MODIFIED_USER_ID" BIGINT CS_FIXED,
	 "ENABLED" TINYINT CS_INT DEFAULT 1,
	 "DELETED" TINYINT CS_INT DEFAULT 0,
	 PRIMARY KEY ("SEGMENTATION_FORM_SEGMENTATION_TACTIC_ID")) UNLOAD PRIORITY 5 AUTO MERGE
;
ALTER TABLE "MKTG_PLANNING_TOOL"."SEGMENTATION_FORM_SEGMENTATION_TACTIC" ADD FOREIGN KEY ( "SEGMENTATION_FORM_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."SEGMENTATION_FORM" ("SEGMENTATION_FORM_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."SEGMENTATION_FORM_SEGMENTATION_TACTIC" ADD FOREIGN KEY ( "SEGMENTATION_TACTIC_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."SEGMENTATION_TACTIC" ("SEGMENTATION_TACTIC_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "MKTG_PLANNING_TOOL"."SEGMENTATION_FORM_SEGMENTATION_TACTIC" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "MKTG_PLANNING_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
