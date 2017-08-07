CREATE COLUMN TABLE "MKTG_PLANNING_TOOL"."BUDGET_SPEND_REQUEST_MESSAGE" (
        "BUDGET_SPEND_REQUEST_MESSAGE_ID" bigint not null primary key generated by default as IDENTITY,
        "BUDGET_SPEND_REQUEST_ID" BIGINT NOT NULL,
        "BUDGET_SPEND_REQUEST_ORIGIN_ID" BIGINT NOT NULL,
        "MESSAGE" NVARCHAR(3000) NOT NULL,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,
        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID")
);