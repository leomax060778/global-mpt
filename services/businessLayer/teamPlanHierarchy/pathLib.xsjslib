$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataPath = mapper.getDataPath();
/** ***********END INCLUDE LIBRARIES*************** */

var CRM_ACRONYM = "CRM";
var levelLabel = {
    1: "PLAN (L1)",
    2: "TEAMS (L2)",
    3: "PRIORITIES/SUB-TEAMS (L3)",
    4: "PROGRAMS/CAMPAIGNS (L4)",
    5: "MARKETING TACTICS (L5)",
    6: "MARKETING SUB-TACTICS (L6)"
};

var LEVEL = {
    'hl2': 2,
    'hl3': 3,
    'hl4': 4,
    'hl5': 5,
    'hl6': 6
};

function getCleanPathByLevelParent(hierarchyLevel, parentId) {
    var result = {};
    var levelPath = "";

    result.PATH_TPH = levelPath;
    result.GRANDPARENT_ID = null;
    result.HIERARCHY_TREE = [];

    var path = dataPath.getPathByLevelParent(hierarchyLevel, parentId);
        
    if (path.length) {
    	result.GRANDPARENT_ID = path[0].GRANDPARENT_ID;
        result.HIERARCHY_TREE = [
        {name: path[0].L1_ACRONYM + path[0].BUDGET_YEAR}
            ];

            if (path[0].L2_ACRONYM)
                result.HIERARCHY_TREE.push({name: path[0].L2_ACRONYM});
            if (path[0].L3_ACRONYM)
                result.HIERARCHY_TREE.push({name: path[0].L3_ACRONYM});
            if (path[0].L4_ACRONYM)
                result.HIERARCHY_TREE.push({name: path[0].L4_ACRONYM});
            if (path[0].L5_ACRONYM)
                result.HIERARCHY_TREE.push({name: path[0].L5_ACRONYM});


            result.PATH_TPH = ""
                + path[0].L1_ACRONYM + path[0].BUDGET_YEAR
                + (parseInt(hierarchyLevel) == 3 && path[0].L2_ACRONYM ? '-' + path[0].L2_ACRONYM : '')
                + (path[0].L3_ACRONYM ? '-' + path[0].L3_ACRONYM : '')
                + (path[0].L4_ACRONYM ? '-' + path[0].L4_ACRONYM : '')
                + (path[0].L5_ACRONYM ? path[0].L5_ACRONYM : '');
    }
    return result;
}

// Get complete path of specific level and parent id of HL
function getPathByLevelParent(hierarchyLevel, parentId, isLegacy) {
    var result = {};
    var levelPath = levelLabel[parseInt(hierarchyLevel)] || "";

    result.PATH_TPH = levelPath;
    result.GRANDPARENT_ID = null;
    result.HIERARCHY_TREE = [];

    // Build the path to return
    if (levelPath.length && parseInt(hierarchyLevel) > 1) {
        var path = isLegacy && parseInt(hierarchyLevel) == 6 ? dataPath.getLegacyPathByLevelParent(hierarchyLevel, parentId) : dataPath.getPathByLevelParent(hierarchyLevel, parentId);
        if (path.length) {
            result.GRANDPARENT_ID = path[0].GRANDPARENT_ID;
            result.CRM_ID = path[0].CRM_ID;
            switch (parseInt(hierarchyLevel)){
                case 2:
                    result.PATH_TPH = levelPath + " for " + path[0].CRM_ID;
                    result.HIERARCHY_TREE.push({name: path[0].L1_ACRONYM + path[0].BUDGET_YEAR});
                    break;
                case 3:
                    result.PATH_TPH = levelPath + " for " + path[0].CRM_ID;
                    result.HIERARCHY_TREE.push({name: path[0].L2_ACRONYM + path[0].BUDGET_YEAR});
                    break;
                case 4:
                    result.PATH_TPH = levelPath + " for " + path[0].CRM_ID;
                    result.HIERARCHY_TREE.push({name: path[0].L2_ACRONYM + path[0].BUDGET_YEAR},{name: path[0].L3_ACRONYM});
                    break;
                case 5:
                    result.PATH_TPH = levelPath + " for " + path[0].CRM_ID;
                    result.HIERARCHY_TREE.push({name: path[0].L2_ACRONYM + path[0].BUDGET_YEAR},{name: path[0].L4_ACRONYM});
                    break;
                case 6:
                    result.PATH_TPH = levelPath + " for " + path[0].CRM_ID;
                    result.HIERARCHY_TREE.push({name: path[0].L2_ACRONYM + path[0].BUDGET_YEAR}, {name: path[0].L4_ACRONYM}, {name: path[0].L5_ACRONYM});
                    break;
            }
        }
    }
    ;
    return result;
}

// Get complete path of specific level and parent id of HL to CRM
function getPathByLevelParentToCRM(levelId, parentId) {
    // with out path refactor
    var result = {};
    var path = dataPath.getPathByLevelParent(levelId, parentId);

    var pathOrgAcronym = dataPath.getPathOrganizationAcronym(levelId, parentId);
    var isOrgAcronym = !pathOrgAcronym[0] ? false : true;
    // throw path[0].PATH_TPH ;
    if (isOrgAcronym) {

        result.PATH_TPH = CRM_ACRONYM + "-" + path[0].PATH_TPH;
    }
    else {
        result.PATH_TPH = CRM_ACRONYM;
    }
    return result;
}

//Get complete path of specific level and parent id of HL to CRM
function getFullPathByLevelParent(level, parentId) {
    // with out path refactor
    var result = {};
    var path = getCleanPathByLevelParent(LEVEL[level], parentId);
        
    result.PATH_TPH = CRM_ACRONYM + "-" + path.PATH_TPH;

    return result;
}

/**
 * Insert the CRM ID of the Parent Level in CRM_PARENT_PATH Table.
 * Uses GET_CRM_ID Stored Procedure, and it is only for L4-L5-L6.
 * @param level (string): can be "hl4", "hl5", "hl6"
 * @param id (integer): ID of the level that needs the parent path (HL4_ID, HL5_ID, HL6_ID)
 * @param parentId (integer): ID of the parent level (HL3_ID, HL4_ID, HL5_ID)
 * @param userId (integer): ID of the User that is performing the action
 * @param parentLegacyPath (string): PATH of the parent level when it is a legacy record (Eq: CRM-MX19-TST)
 */
function insParentPath(level, id, parentId, userId, parentLegacyPath) {
    var parentPath = '';
    if(parentLegacyPath) {
        parentPath = parentLegacyPath;
    } else {
        var path = dataPath.getPathByLevelParent(LEVEL[level], parentId)[0];
        parentPath = path.CRM_ID;
    }

    dataPath.insParentPath(level, id, parentPath, userId);
}

function updParentPath(level, hl4Id, parentPath, userId){
    return dataPath.updParentPath(level, hl4Id, parentPath, userId);
}

function getPathByLevelParentForCrm(level, parentId) {
    var path = dataPath.getPathByLevelParent(LEVEL[level], parentId)[0];

    var deprecatedParentPath = "CRM-" + path.L1_ACRONYM + path.BUDGET_YEAR + "-"
        + (LEVEL[level] == 2 ? path.L2_ACRONYM : '')
        + (path.L3_ACRONYM || '')
        + (path.L4_ACRONYM ? '-' + path.L4_ACRONYM : '')
        + (path.L5_ACRONYM || '');
    var parentPath = path.CRM_ID;

    return {deprecatedParentPath: deprecatedParentPath, parentPath: parentPath};
}

function getPathByLevelHlId(level, HL_id){
    return dataPath.getPathByLevelHlId(level, HL_id);
}
