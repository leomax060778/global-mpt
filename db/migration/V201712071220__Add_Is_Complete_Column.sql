ALTER TABLE HL5 ADD (IS_COMPLETE TINYINT NOT NULL DEFAULT 0);
ALTER TABLE HL6 ADD (IS_COMPLETE TINYINT NOT NULL DEFAULT 0);

UPDATE HL5
SET IS_COMPLETE = 1
WHERE ENABLED = 1 AND DELETED = 0
AND HL5_STATUS_DETAIL_ID IN (2,3,4);

UPDATE HL6
SET IS_COMPLETE = 1
WHERE ENABLED = 1 AND DELETED = 0
AND HL6_STATUS_DETAIL_ID IN (2,3,4);

--*******************Add multi tactic field to L5*****************
ALTER TABLE HL5 ADD (MULTI_TACTIC TINYINT NOT NULL DEFAULT 0);
--***************************************************************

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-96', 'Add column to indicates if L5/L6 is complete', 'V201712071220__Add_Is_Complete_Column.sql');

COMMIT;