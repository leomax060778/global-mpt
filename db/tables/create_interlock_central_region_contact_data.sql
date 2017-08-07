CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."INTERLOCK_CENTRAL_REGION_CONTACT_DATA" (
		"INTERLOCK_CENTRAL_REGION_CONTACT_DATA_ID" bigint not null primary key generated by default as IDENTITY,
        "BMO_LEADS" NVARCHAR(255),
        "EMPLOYEE_NUMBER" NVARCHAR(255),
        "EMAIL" NVARCHAR(255) NOT NULL,
        "CONTACT_TYPE" INT NOT NULL, -- 0 = CENTRAL TEAM - 1 = REGIONAL TEAM
        "CONTACT_TYPE_ID" BIGINT, --ID FROM REGIONAL OR CENTRAL TEAM
        
        
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")     
);