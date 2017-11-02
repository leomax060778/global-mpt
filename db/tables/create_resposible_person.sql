CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."RESPONSIBLE_PERSON" (
		"RESPONSIBLE_PERSON_ID" bigint not null primary key generated by default as IDENTITY,
        "FULL_NAME" NVARCHAR(255) NOT NULL,
        "EMPLOYEE_NUMBER" NVARCHAR(255) NOT NULL,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);