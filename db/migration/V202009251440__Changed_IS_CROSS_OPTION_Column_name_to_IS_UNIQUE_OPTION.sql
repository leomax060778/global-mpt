RENAME COLUMN ALLOCATION_OPTION.IS_CROSS_OPTION TO IS_UNIQUE_OPTION;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-199', 'Changed IS_CROSS_OPTION Column name to IS_UNIQUE_OPTION in ALLOCATION_OPTION Table', 'V202009251440__Changed_IS_CROSS_OPTION_Column_name_to_IS_UNIQUE_OPTION.sql');

COMMIT;
