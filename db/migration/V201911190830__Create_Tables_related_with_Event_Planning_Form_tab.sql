-- *********** Affiliation with Larger Event ********** --
CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."AFFILIATED_WITH_LARGER_EVENT"(
	"AFFILIATED_WITH_LARGER_EVENT_ID" bigint not null primary key generated by default as IDENTITY,
	"NAME" NVARCHAR(255) NOT NULL,

	"CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
    "MODIFIED_DATE_TZ" timestamp,
    "CREATED_USER_ID" bigint not null,
    "MODIFIED_USER_ID" bigint,
    "ENABLED" tinyint default 1,
    "DELETED" tinyint default 0,

	FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);

-- Insert basic information. The Created User ID is Eddie Rivas
INSERT INTO "MKTG_PLANNING_TOOL"."AFFILIATED_WITH_LARGER_EVENT" (AFFILIATED_WITH_LARGER_EVENT_ID, NAME, CREATED_USER_ID)
    VALUES (1, 'Yes', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."AFFILIATED_WITH_LARGER_EVENT" (AFFILIATED_WITH_LARGER_EVENT_ID, NAME, CREATED_USER_ID)
    VALUES (2, 'No', 85);

-- *********** Target Audience ********** --
CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE"(
	"TARGET_AUDIENCE_ID" bigint not null primary key generated by default as IDENTITY,
	"NAME" NVARCHAR(255) NOT NULL,

	"CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
    "MODIFIED_DATE_TZ" timestamp,
    "CREATED_USER_ID" bigint not null,
    "MODIFIED_USER_ID" bigint,
    "ENABLED" tinyint default 1,
    "DELETED" tinyint default 0,

	FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);

-- Insert basic information. The Created User ID is Eddie Rivas
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (1, 'C-level', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (2, 'Consultant', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (3, 'Customer', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (4, 'Developer', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (5, 'Influencer', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (6, 'Net New', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (7, 'Partner', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (8, 'SAP Employee', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."TARGET_AUDIENCE" (TARGET_AUDIENCE_ID, NAME, CREATED_USER_ID)
    VALUES (9, 'User', 85);

-- *********** Registration Tool ********** --
CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS"(
	"REGISTRATION_PROCESS_ID" bigint not null primary key generated by default as IDENTITY,
	"NAME" NVARCHAR(255) NOT NULL,

	"CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
    "MODIFIED_DATE_TZ" timestamp,
    "CREATED_USER_ID" bigint not null,
    "MODIFIED_USER_ID" bigint,
    "ENABLED" tinyint default 1,
    "DELETED" tinyint default 0,

	FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);

-- Insert basic information. The Created User ID is Eddie Rivas
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (1, 'SAP Hosted - Approved vendor (WEG, Scherer)', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (2, 'SAP Hosted - ON24 (not recommended)', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (3, 'SAP Hosted - Events.sap.com', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (4, 'SAP Hosted - Webinar.sap.com', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (5, 'SAP Hosted - Hybrid registration', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (6, 'SAP Hosted - No Agency required', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (7, 'SAP Attended - Collected at event', 85);
INSERT INTO "MKTG_PLANNING_TOOL"."REGISTRATION_PROCESS" (REGISTRATION_PROCESS_ID, NAME, CREATED_USER_ID)
    VALUES (8, 'None (registration not required)', 85);


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-182', 'Create tables related with the Event Planning Form Tab in HL5 and HL6', 'V201911190830__Create_Tables_related_with_Event_Planning_Form_tab.sql');

COMMIT;
