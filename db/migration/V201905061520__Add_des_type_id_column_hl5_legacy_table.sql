ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_LEGACY" ADD(DES_TYPE_ID BIGINT NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-180', 'Add DES_TYPE_ID column to HL5_LEGACY table', 'V201905061520__Add_des_type_id_column_hl5_legacy_table.sql');

     COMMIT;