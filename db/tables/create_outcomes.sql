create column table "MKTG_PLANNING_TOOL"."OUTCOMES"
(
        "OUTCOMES_ID" bigint not null PRIMARY KEY generated by default as IDENTITY,
        "OUTCOMES_NAME" nvarchar(255) NOT NULL,
        "OUTCOMES_TYPE_HIERARCHY_LEVEL_ID" bigint NOT NULL,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID"),
        FOREIGN KEY ("OUTCOMES_TYPE_HIERARCHY_LEVEL_ID") REFERENCES "MKTG_PLANNING_TOOL"."OUTCOMES_TYPE_HIERARCHY_LEVEL"("OUTCOMES_TYPE_HIERARCHY_LEVEL_ID")
);