ALTER TABLE "MKTG_PLANNING_TOOL"."HL5" ADD (EVENT_SUMMARY NVARCHAR(1000));
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD (EVENT_SUMMARY NVARCHAR(1000));

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-189', 'Add Event Summary column to HL5 and HL6 tables', 'V202001061435__Add_HL5_HL6_Event_Summary_column.sql');

COMMIT;
