--Add new flag to store the Hidden state instead of calculate it based on the allocation connection
ALTER TABLE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_ALLOCATION" ADD(HIDDEN TINYINT);

--At the beggining, all data stored in dynamic form allocation is hidden
UPDATE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_ALLOCATION" dff
SET dff.HIDDEN = 1;

--Adding the NOT NULL property to the HIDDEN column
ALTER TABLE "MKTG_PLANNING_TOOL"."DYNAMIC_FORM_ALLOCATION" ALTER (HIDDEN TINYINT NOT NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
     VALUES('V5.0.0-176', 'Add HIDDEN column to Dynamic Form Allocation', 'V201812270825__Add_hidden_column_dynamic_form_allocation.sql');

     COMMIT;