UPDATE CONFIGURATION SET
VALUE = 24
WHERE KEY = 'deltaTimeLastUpdate';

--***************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-112', 'Update Delta Time Last Update value in Configuration Table', 'V201801081055__Update_Delta_Time_Last_Update.sql');

COMMIT;