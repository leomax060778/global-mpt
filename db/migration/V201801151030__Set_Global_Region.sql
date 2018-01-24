UPDATE HL1 SET
REGION_ID = T.REGION_ID
FROM HL1, (SELECT REGION_ID FROM REGION WHERE IS_GLOBAL_REGION = 1) T
WHERE HL1.TEAM_TYPE_ID = 2 AND HL1.REGION_ID IS NULL
AND HL1.ENABLED = 1 AND HL1.DELETED = 0;

--***************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-115', 'Set Global region to Central teams', 'V201801151030__Set_Global_Region.sql');

COMMIT;