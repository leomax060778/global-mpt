ALTER TABLE "MKTG_PLANNING_TOOL"."HL4_PARTNER" ADD ("VALUE_AUX" DECIMAL(19,6));

UPDATE "MKTG_PLANNING_TOOL"."HL4_PARTNER"
SET VALUE_AUX = VALUE;

RENAME COLUMN "MKTG_PLANNING_TOOL"."HL4_PARTNER"."VALUE" TO "VALUE_BKP";
RENAME COLUMN "MKTG_PLANNING_TOOL"."HL4_PARTNER"."VALUE_AUX" TO "VALUE";

ALTER TABLE "MKTG_PLANNING_TOOL"."HL4_PARTNER" DROP ("VALUE_BKP");

---------------------
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" ADD ("EURO_VALUE_AUX" DECIMAL(19,6));
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" ADD ("VOLUME_VALUE_AUX" DECIMAL(19,6));

UPDATE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL"
SET EURO_VALUE_AUX = EURO_VALUE
, VOLUME_VALUE_AUX = VOLUME_VALUE;

RENAME COLUMN "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL"."EURO_VALUE" TO "EURO_VALUE_BKP";
RENAME COLUMN "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL"."VOLUME_VALUE" TO "VOLUME_VALUE_BKP";

RENAME COLUMN "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL"."EURO_VALUE_AUX" TO "EURO_VALUE";
RENAME COLUMN "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL"."VOLUME_VALUE_AUX" TO "VOLUME_VALUE";

ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" DROP ("EURO_VALUE_BKP");
ALTER TABLE "MKTG_PLANNING_TOOL"."HL5_EXPECTED_OUTCOMES_DETAIL" DROP ("VOLUME_VALUE_BKP");
-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-34', 'Change DataType Precision', 'V201704070920__ChangeDataType_Precision.sql');

COMMIT;