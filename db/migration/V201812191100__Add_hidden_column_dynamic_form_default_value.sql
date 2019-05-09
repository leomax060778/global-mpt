--Add new flag to store the Hidden state instead of calculate it based on the default value connection
ALTER TABLE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_DEFAULT_VALUE" ADD(HIDDEN TINYINT);

--At the beggining, all data stored in default values is hidden
UPDATE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_DEFAULT_VALUE" dff
SET dff.HIDDEN = 1;

--Adding the NOT NULL property to the HIDDEN column
ALTER TABLE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_DEFAULT_VALUE" ALTER (HIDDEN TINYINT NOT NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-175', 'Add HIDDEN column to Dynamic Form Default value', 'V201812191100__Add_hidden_column_dynamic_form_default_value.sql');

     COMMIT;