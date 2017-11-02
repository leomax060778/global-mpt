create column table "MKTG_PLANNING_TOOL"."HL4_SALE_OTHER_REGION"(
        "HL4_SALE_OTHER_REGION_ID" bigint not null primary key generated by default as IDENTITY,
        "HL4_ID" bigint not null,
        "AMOUNT" DECIMAL(19,2),
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("HL4_ID") REFERENCES "MKTG_PLANNING_TOOL"."HL4"("HL4_ID"),
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);