create column table "MKTG_PLANNING_TOOL"."HL3_EXPECTED_OUTCOMES_DETAIL" (
        "HL3_EXPECTED_OUTCOMES_DETAILS_ID" bigint not null primary key generated by default as IDENTITY,
        "HL3_EXPECTED_OUTCOMES_ID" bigint NOT NULL,
        "EXPECTED_OUTCOME_LEVEL_ID" bigint NOT NULL,
        "EURO_VALUE" DECIMAL(19,2) NOT NULL DEFAULT 0,
        "VOLUME_VALUE" DECIMAL(19,2) NOT NULL DEFAULT 0,
        "CREATED_DATE_TZ" timestamp default CURRENT_TIMESTAMP,
        "MODIFIED_DATE_TZ" timestamp,
        "CREATED_USER_ID" bigint not null,
        "MODIFIED_USER_ID" bigint,
        "ENABLED" tinyint default 1,
        "DELETED" tinyint default 0,

        FOREIGN KEY ("CREATED_USER_ID") REFERENCES "MKTG_PLANNING_TOOL"."USER"("USER_ID"),
        FOREIGN KEY ("EXPECTED_OUTCOME_LEVEL_ID") REFERENCES "MKTG_PLANNING_TOOL"."EXPECTED_OUTCOME_LEVEL"("EXPECTED_OUTCOME_LEVEL_ID"),
        FOREIGN KEY ("HL3_EXPECTED_OUTCOMES_ID") REFERENCES "MKTG_PLANNING_TOOL"."HL3_EXPECTED_OUTCOMES"("HL3_EXPECTED_OUTCOMES_ID")
);