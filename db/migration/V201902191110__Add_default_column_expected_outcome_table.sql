ALTER TABLE "MKTG_PLANNING_TOOL"."EXPECTED_OUTCOME" ADD(DEFAULT TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-177', 'Add DEFAULT column to EXPECTED_OUTCOME table', 'V201902191110__Add_default_column_expected_outcome_table.sql');

     COMMIT;