create column table "MKTG_PLANNING_TOOL"."PARTNER_TYPE"
(
        "PARTNER_TYPE_ID" bigint not null PRIMARY KEY generated by default as IDENTITY,
        "TYPE_NAME" nvarchar(100) not null,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);