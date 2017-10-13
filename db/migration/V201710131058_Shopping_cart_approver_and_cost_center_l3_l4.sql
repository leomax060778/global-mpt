alter table "MKTG_PLANNING_TOOL"."HL3" add(COST_CENTER nvarchar(10) null);
alter table "MKTG_PLANNING_TOOL"."HL4" add(COST_CENTER nvarchar(10) null);
alter table "MKTG_PLANNING_TOOL"."HL3" add(SHOPPING_CART_APPROVER nvarchar(10) null);
alter table "MKTG_PLANNING_TOOL"."HL4" add(SHOPPING_CART_APPROVER nvarchar(10) null);



-- Update schema version
INSERT INTO "MKTG_PLANNING_TOOL"."SCHEMA_VERSION"(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-72', 'Add new fields to l3 and l4', 'V201710131058_Shopping_cart_approver_and_cost_center_l3_l4.sql');

COMMIT;