ALTER TABLE MARKETING_PROGRAM ADD (SHOW_VALIDATION_WIZARD TINYINT NOT NULL DEFAULT 0);

UPDATE MARKETING_PROGRAM SET
SHOW_VALIDATION_WIZARD = 1
WHERE MARKETING_PROGRAM.NAME LIKE '%NGP';

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-99', 'Add Show Wizard Checkbox To Marketing Program', 'V201712121317__Add_Show_Wizard_Checkbox_To_Marketing_Program.sql');

COMMIT;