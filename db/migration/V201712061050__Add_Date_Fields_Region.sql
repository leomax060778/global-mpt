

-- Add new column
ALTER TABLE "MKTG_PLANNING_TOOL"."REGION" ADD (TIME_ZONE_OFFSET NVARCHAR(10) NOT NULL DEFAULT ' ');
ALTER TABLE "MKTG_PLANNING_TOOL"."REGION" ADD (START_TIME INTEGER NOT NULL DEFAULT 0 );
ALTER TABLE "MKTG_PLANNING_TOOL"."REGION" ADD (END_TIME INTEGER NOT NULL DEFAULT 0 );


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-94', 'Add columns to support dates to region', 'V201712061050__Add_Date_Fields_Region.sql');

COMMIT;