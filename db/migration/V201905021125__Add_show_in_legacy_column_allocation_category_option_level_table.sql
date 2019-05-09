ALTER TABLE "MKTG_PLANNING_TOOL"."ALLOCATION_CATEGORY_OPTION_LEVEL" ADD(SHOW_IN_LEGACY TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-179', 'Add SHOW_IN_LEGACY column to ALLOCATION_CATEGORY_OPTION_LEVEL table', 'V201905021125__Add_show_in_legacy_column_allocation_category_option_level_table.sql');

     COMMIT;