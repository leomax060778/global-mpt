INSERT INTO "MKTG_PLANNING_TOOL"."CONFIGURATION"(KEY,VALUE,DESCRIPTION,CREATED_USER_ID)
    VALUES('defaultContactApprover','I827547','Default Contact to replace Approvers with Data Protection in Interlock and Spend Budget Requests',1);
    -- ********************* IMPORTANT read below ******************************************
    -- The user ID may be change in PROD, please take care and see if it`s correct before run the script.
    -- *************************************************************************************

    -- *************************************************************************************
    -- Update schema version
    INSERT INTO "MKTG_PLANNING_TOOL"."SCHEMA_VERSION"(VERSION, DESCRIPTION, SCRIPT)
    VALUES('V5.0.0-139', 'add row to define a default approver', 'V201804161300__Add_Default_Aprrover_To_Configuration.sql');

    COMMIT;