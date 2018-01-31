ALTER TABLE HL5 ADD ("FORECAST_AT_L5" TINYINT);

UPDATE HL5 SET FORECAST_AT_L5 = CASE WHEN MULTI_TACTIC = 0 THEN 1 ELSE 0 END;

--ALTER TABLE HL5 DROP ("MULTI_TACTIC"); TODO Other Migration

--***************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-118', 'Change MULTI_TACTIC to FORECAST_AT_L5', '201801231330__Invert_Multi_Tactic.sql');

COMMIT;