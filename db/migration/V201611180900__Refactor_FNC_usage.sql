--Alter command to add new columns into HL3 table
ALTER TABLE HL3 ADD (HL3_FNC_BUDGET_TOTAL decimal(19,2) NULL);
ALTER TABLE HL3 ADD (IN_BUDGET TINYINT NULL);

--Alter command to add new columns into HL4 table
ALTER TABLE HL4 ADD (EURO_CONVERSION_ID BIGINT NULL);
ALTER TABLE HL4 ADD (IN_BUDGET TINYINT NULL);
ALTER TABLE HL4 ADD (SPEND_CATEGORY_ID BIGINT NULL);
ALTER TABLE HL4 ADD (HL4_FNC_BUDGET_SPEND_Q1 DECIMAL(19,2) NULL);
ALTER TABLE HL4 ADD (HL4_FNC_BUDGET_SPEND_Q2 DECIMAL(19,2) NULL);
ALTER TABLE HL4 ADD (HL4_FNC_BUDGET_SPEND_Q3 DECIMAL(19,2) NULL);
ALTER TABLE HL4 ADD (HL4_FNC_BUDGET_SPEND_Q4 DECIMAL(19,2) NULL);
ALTER TABLE HL4 ADD (HL4_FNC_BUDGET_TOTAL_MKT DECIMAL(19,2) NULL);

--Update HL3 from HL3_FNC
UPDATE HL3
SET
HL3.HL3_FNC_BUDGET_TOTAL = HL3_FNC.HL3_FNC_BUDGET_TOTAL,
HL3.IN_BUDGET = HL3_FNC.IN_BUDGET
FROM
HL3 INNER JOIN HL3_FNC ON HL3_FNC.HL3_ID = HL3.HL3_ID;

--Update HL4 from HL4_FNC
UPDATE HL4
SET
HL4.EURO_CONVERSION_ID = HL4_FNC.EURO_CONVERSION_ID,
HL4.IN_BUDGET = HL4_FNC.IN_BUDGET,
HL4.SPEND_CATEGORY_ID = HL4_FNC.SPEND_CATEGORY_ID,
HL4.HL4_FNC_BUDGET_SPEND_Q1 = HL4_FNC.HL4_FNC_BUDGET_SPEND_Q1,
HL4.HL4_FNC_BUDGET_SPEND_Q2 = HL4_FNC.HL4_FNC_BUDGET_SPEND_Q2,
HL4.HL4_FNC_BUDGET_SPEND_Q3 = HL4_FNC.HL4_FNC_BUDGET_SPEND_Q3,
HL4.HL4_FNC_BUDGET_SPEND_Q4 = HL4_FNC.HL4_FNC_BUDGET_SPEND_Q4,
HL4.HL4_FNC_BUDGET_TOTAL_MKT = HL4_FNC.HL4_FNC_BUDGET_TOTAL_MKT
FROM
HL4 INNER JOIN HL4_FNC ON HL4_FNC.HL4_ID = HL4.HL4_ID;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V5.0.0-02', 'Refactored FNC tables', 'V201611180900__Refactor_FNC_usage.sql');

COMMIT;