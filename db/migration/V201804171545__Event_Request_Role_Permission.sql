--all permissions for SupAdmin and read/view and create for ADMIN
insert into "MKTG_PLANNING_TOOL"."RESOURCE" (NAME,CREATED_USER_ID,OBJECT_NAME) values('Events Management',1,'Events Management');

--***************************************************************************************
-- Add permissions for SuperAdmin

-- Permission to View/Read the Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'SuperAdmin'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'View/Read'), 1 from dummy;
-- Permission to Create/Edit in Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'SuperAdmin'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Create/Edit'), 1 from dummy;
-- Permission to Delete in Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id, enabled)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'SuperAdmin'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Delete' and enabled = 1), 1, 0 from dummy;

--***************************************************************************************
-- Add permissions for Admin

-- Permission to View/Read the Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Admin'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'View/Read'), 1 from dummy;
-- Permission to Create/Edit News in Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Admin'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Create/Edit'), 1 from dummy;
-- Permission to Delete News in Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id, enabled)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Admin'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Delete' and enabled = 1), 1, 0 from dummy;

--***************************************************************************************
-- Add permissions for Campaign Manager
-- Permission to View/Read the Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Campaign Manager'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'View/Read'), 1 from dummy;
-- Permission to Create/Edit News in Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Campaign Manager'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Create/Edit'), 1 from dummy;
-- Permission to Delete News in Events Management
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id, enabled)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Campaign Manager'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Delete' and enabled = 1), 1, 0 from dummy;

--***************************************************************************************
-- Add permissions disabled for Data Entry
-- Permission disabled to View/Read the Data Entry
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id, enabled)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Data Entry'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'View/Read'), 1, 0 from dummy;
-- Permission disabled to Create/Edit in Data Entry
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id, enabled )
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Data Entry'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Create/Edit'), 1, 0 from dummy;
-- Permission disabled to Delete in Data Entry
INSERT INTO "MKTG_PLANNING_TOOL"."ROLE_PERMISSION"(role_id, resource_id, permission_id, created_user_id, enabled)
select (select role_id from "MKTG_PLANNING_TOOL"."ROLE" where name = 'Data Entry'), (select resource_id from "MKTG_PLANNING_TOOL"."RESOURCE" where name='Events Management'), (select permission_id from "MKTG_PLANNING_TOOL"."PERMISSION" where name = 'Delete' and enabled = 1), 1, 0 from dummy;


-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-142', 'Create Event Request Role Permission', 'V201804171545__Event_Request_Role_Permission.sql');

COMMIT;