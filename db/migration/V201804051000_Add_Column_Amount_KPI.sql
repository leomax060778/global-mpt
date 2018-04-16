ALTER TABLE HL5_CATEGORY_OPTION ADD (AMOUNT_KPI DECIMAL(19,2) NOT NULL DEFAULT 0);
ALTER TABLE HL6_CATEGORY_OPTION ADD (AMOUNT_KPI DECIMAL(19,2) NOT NULL DEFAULT 0);
ALTER TABLE HL5_COUNTRY_CATEGORY_OPTION ADD (AMOUNT_KPI DECIMAL(19,2) NOT NULL DEFAULT 0);
ALTER TABLE HL6_COUNTRY_CATEGORY_OPTION ADD (AMOUNT_KPI DECIMAL(19,2) NOT NULL DEFAULT 0);

--add script to set same percentage from amount column to amount_kpi column
update HL5_CATEGORY_OPTION
set amount_kpi = amount
where enabled = 1 and deleted = 0;

update HL6_CATEGORY_OPTION
set amount_kpi = amount
where enabled = 1 and deleted = 0;

update HL5_COUNTRY_CATEGORY_OPTION
set amount_kpi = amount
where enabled = 1 and deleted = 0;

update HL6_COUNTRY_CATEGORY_OPTION
set amount_kpi = amount
where enabled = 1 and deleted = 0;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-135', 'add new column in HL5_CATEGORY_OPTION/HL6_CATEGORY_OPTION table for amount_kpi', 'V201804051000_Add_Column_Amount_KPI.sql');

COMMIT;

