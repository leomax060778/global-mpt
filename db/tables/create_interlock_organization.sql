CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."INTERLOCK_ORGANIZATION" (
        "INTERLOCK_ORGANIZATION_ID" bigint not null primary key generated by default as IDENTITY,
        "NAME" nvarchar(255) not null,

        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);