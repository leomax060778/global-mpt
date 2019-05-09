ALTER TABLE "MKTG_PLANNING_TOOL"."DES_TYPE_CAMPAIGN_SUB_TYPE" ADD(SHOW_IN_LEGACY TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-178', 'Add SHOW_IN_LEGACY column to DES_TYPE_CAMPAIGN_SUB_TYPE table', 'V201905021115__Add_show_in_legacy_column_des_type_campaign_sub_type_table.sql');

     COMMIT;