CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."L5_PARTNER_BUDGET_SPEND_REQUEST" (
        "L5_PARTNER_BUDGET_SPEND_REQUEST_ID" bigint not null primary key generated by default as IDENTITY,
        "HL5_PARTNER_ID" bigint NOT NULL,
        "BUDGET_SPEND_REQUEST_ID" bigint NOT NULL,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID"),
        FOREIGN KEY ("BUDGET_SPEND_REQUEST_ID") REFERENCES "MKTG_PLANNING_TOOL"."BUDGET_SPEND_REQUEST"("BUDGET_SPEND_REQUEST_ID"),
        FOREIGN KEY ("HL5_PARTNER_ID") REFERENCES "MKTG_PLANNING_TOOL"."HL5_PARTNER"("PARTNER_ID")
);