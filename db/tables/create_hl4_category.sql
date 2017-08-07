create column table "MKTG_PLANNING_TOOL"."HL4_CATEGORY" (
    "HL4_CATEGORY_ID" bigint not null primary key generated by default as IDENTITY,
    "HL4_ID" bigint NOT NULL, -- hl4 (L4)
    "CATEGORY_ID" bigint NOT NULL,
    "NOT_APPLICABLE" tinyint not null;
    "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
    "MODIFIED_DATE_TZ" timestamp,
    "CREATED_USER_ID" bigint not null,
    "MODIFIED_USER_ID" bigint,
    "ENABLED" tinyint default 1,
    "DELETED" tinyint default 0,
    "IN_PROCESSING_REPORT" tinyint not null,
    FOREIGN KEY ("hl4_id") REFERENCES "MKTG_PLANNING_TOOL"."HL4"("hl4_id"),
    FOREIGN KEY ("category_id") REFERENCES "MKTG_PLANNING_TOOL"."CATEGORY"("category_id"),
    FOREIGN KEY ("created_user_id") REFERENCES "MKTG_PLANNING_TOOL"."USER"("user_id")
);