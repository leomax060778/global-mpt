ALTER TABLE "MKTG_PLANNING_TOOL"."REQUEST_ACCESS" ALTER ("REQUEST_ACCESS_STATUS_ID" BIGINT  NOT NULL DEFAULT 1);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-92', 'Fix Request Access', 'V201711271015__Fix_Request_Access.sql');

COMMIT;