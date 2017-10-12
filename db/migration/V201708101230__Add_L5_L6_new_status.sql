INSERT INTO HL5_STATUS_DETAIL (detail, created_user_id) VALUES ('Valid for CRM', 1);
INSERT INTO HL6_STATUS_DETAIL (detail, created_user_id) VALUES ('Valid for CRM', 1);

alter table HL6 alter ("ROUTE_TO_MARKET_ID" BIGINT null);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V5.0.0-53', 'Add L5 L6 New Status', 'V201708101230__Add_L5_L6_new_status.sql');

COMMIT;