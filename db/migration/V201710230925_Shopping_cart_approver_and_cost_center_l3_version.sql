alter table "MKTG_PLANNING_TOOL"."HL3_VERSION" add(COST_CENTER nvarchar(10) null);
alter table "MKTG_PLANNING_TOOL"."HL3_VERSION" add(SHOPPING_CART_APPROVER nvarchar(10) null);

-- Update schema version
INSERT INTO "MKTG_PLANNING_TOOL"."SCHEMA_VERSION"(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-72', 'Add new fields to l3 version table', 'V201710230925_Shopping_cart_approver_and_cost_center_l3_version.sql');

COMMIT;