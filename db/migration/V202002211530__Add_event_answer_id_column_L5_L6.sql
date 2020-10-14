ALTER TABLE "MKTG_PLANNING_TOOL"."HL5" ADD(EVENT_ANSWER_ID BIGINT NULL);
ALTER TABLE "MKTG_PLANNING_TOOL"."HL6" ADD(EVENT_ANSWER_ID BIGINT NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-192', 'Add Column EVENT_ANSWER_ID to HL5 - HL6 Tables', 'V202002211530__Add_event_answer_id_column_L5_L6.sql');

COMMIT;