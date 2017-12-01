update hl4_status_detail set DETAIL = 'Create In CRM' where DETAIL = 'Load Data Entry';
update hl5_status_detail set DETAIL = 'Create In CRM' where DETAIL = 'Load Data Entry';
update hl6_status_detail set DETAIL = 'Create In CRM' where DETAIL = 'Load Data Entry';

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-86', 'Renamed Load Data Entry to Create In CRM', 'V201711141400__Renamed_Load_Data_Entry_to_Create_In_CRM.sql');

COMMIT;