-- *********** Master Table between  OBJECTIVE AND ALLOCATION_CATEGORY_OPTION_LEVEL ********** --
CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."OBJECTIVE_ALLOCATION_ASSOCIATION"(
	"OBJECTIVE_ALLOCATION_ASSOCIATION_ID" bigint not null primary key generated by default as IDENTITY,
	"OBJECTIVE_CRM_KEY" NVARCHAR(15) NOT NULL,
	"ALLOCATION_CATEGORY_ID" BIGINT NOT NULL,
	"ALLOCATION_OPTION_ID" BIGINT NOT NULL,
	"HIERARCHY_LEVEL_ID" BIGINT NOT NULL,

	"CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
    "MODIFIED_DATE_TZ" timestamp,
    "CREATED_USER_ID" bigint not null,
    "MODIFIED_USER_ID" bigint,
    "ENABLED" tinyint default 1,
    "DELETED" tinyint default 0,

	FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID"),
	FOREIGN KEY ("ALLOCATION_CATEGORY_ID") REFERENCES "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY"("ALLOCATION_CATEGORY_ID"),
	FOREIGN KEY ("ALLOCATION_OPTION_ID") REFERENCES "MKTG_PLANNING_TOOL"."ALLOCATION_OPTION"("ALLOCATION_OPTION_ID")
);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-197', 'Add OBJECTIVE_ALLOCATION_ASSOCIATION Table', 'V202009180900__Add_Objective_Allocation_Association_support.sql');

COMMIT;
