ALTER TABLE BUDGET_YEAR ADD (REQUIRE_DYNAMIC_FORM TINYINT NOT NULL DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-170', 'New column REQUIRE_DYNAMIC_FORM to store if the Budget Year uses Dynamic Forms or not', 'V201810221115__Alter_Budget_Year_Add_Require_Dynamic_Form.sql');

COMMIT;