ALTER TABLE SEGMENTATION_FORM ADD (ACCEPT_TERMS_STATE TINYINT DEFAULT 0);

update SEGMENTATION_FORM set
ACCEPT_TERMS_STATE = 1
where FORM_STATUS_DETAIL_ID = 2;

--drop procedure from BD
DROP PROCEDURE "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::DELETE_CONSTRAINT" ;
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-110', 'Add Column To Segmentation Form', 'V201801041633__Add_Column_To_Segmentation_Form.sql');

COMMIT;