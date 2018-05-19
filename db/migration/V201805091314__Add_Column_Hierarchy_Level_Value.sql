ALTER TABLE HIERARCHY_LEVEL ADD (HIERARCHY_LEVEL_VALUE bigint DEFAULT 0);


UPDATE HIERARCHY_LEVEL
SET HIERARCHY_LEVEL_VALUE = (CASE
                      WHEN DESCRIPTION = 'HL1'
                                           THEN 1
                      WHEN DESCRIPTION = 'HL2'
                                           THEN 2
                      WHEN DESCRIPTION = 'HL3'
                                           THEN 3
                      WHEN DESCRIPTION = 'HL4'
                                           THEN 4
                      WHEN DESCRIPTION = 'HL5'
                                           THEN 5
                      WHEN DESCRIPTION = 'HL6'
                                           THEN 6
                    END);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-154', 'add column Hierarchy Level Value to table HIERARCHY_LEVEL', 'V201805091314__Add_Column_Hierarchy_Level_Value.sql');

COMMIT;

