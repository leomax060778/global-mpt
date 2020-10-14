/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var data = mapper.getDataEventPlanningForm();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var optionLib = mapper.getAllocationOptionLib();
/*************************************************/
var USER_ID_NOT_FOUND = "The User ID can not be found";
var LOB_CATEGORY_ID = 5; //Production value
var MARKETING_SEGMENT_CATEGORY_ID = 9; //Production value
var hierarchyLevelMap = util.getHierarchyLevelEnum();

function getAllRegistrationProcess(userId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "eventPlanningFormService/handleGet/getAllRegistrationProcess", USER_ID_NOT_FOUND);
    }

    return data.getAllRegistrationProcess();
}

function getAllTargetAudience(userId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "eventPlanningFormService/handleGet/getAllTargetAudience", USER_ID_NOT_FOUND);
    }

    return data.getAllTargetAudience();
}

function getAllAffiliatedWithLargerEvent(userId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "eventPlanningFormService/handleGet/getAllAffiliatedWithLargerEvent", USER_ID_NOT_FOUND);
    }

    return data.getAllAffiliatedWithLargerEvent();
}

function getAllEventPlanningFormReport(hl1Id, hl2Id, hl3Id, budgetYearId, regionId, userId) {
    var result = JSON.parse(JSON.stringify(data.getAllEventPlanningFormReport(hl1Id, hl2Id, hl3Id, budgetYearId, regionId)));
    var optionsForLobL5 = optionLib.getAssignedOptionByCategoryIdByLevelId(LOB_CATEGORY_ID, hierarchyLevelMap.HL5); //LOB - HL5
    var optionsForLobL6 = optionLib.getAssignedOptionByCategoryIdByLevelId(LOB_CATEGORY_ID, hierarchyLevelMap.HL6); //LOB - HL6
    var optionsForSegmenttL5 = optionLib.getAssignedOptionByCategoryIdByLevelId(MARKETING_SEGMENT_CATEGORY_ID, hierarchyLevelMap.HL5); //Marketing Segment - HL5
    var optionsForSegmenttL6 = optionLib.getAssignedOptionByCategoryIdByLevelId(MARKETING_SEGMENT_CATEGORY_ID, hierarchyLevelMap.HL6); //Marketing Segment - HL6
    //The starting point of the Options
    var orderCounter = result && result.LEVEL_COLLECTION && result.LEVEL_COLLECTION.length ?
        Object.keys(result.LEVEL_COLLECTION[0]).length + 1 : 0;
    //Obtain All options assigned by configuration in L5/L6
    var lobs = optionsForLobL5.concat(optionsForLobL6);
    var lobIds = [];
    var segments = optionsForSegmenttL5.concat(optionsForSegmenttL6);
    var segmentIds = [];
    //Init maps for Option labels and the relation using Option ID
    var optionLabels = {};
    var optionKeysMap = {};
    //Imit maps to assign each option with its corresponding record.
    var lobOptions = {
        'HL5': {},
        'HL6': {}
    };
    var segmentOptions = {
        'HL5': {},
        'HL6': {}
    };

    //Force to always have the current LOB and Segment options
    //Add Ids to an array separated by category to give them an specific order bellow. It doesn't care if they are
    //repeated, because the existence makes the difference
    lobs.forEach(function(lob){
        optionLabels[lob.ALLOCATION_OPTION_ID] = lob.NAME;
        lobIds.push(Number(lob.ALLOCATION_OPTION_ID));
    });
    segments.forEach(function(segment){
        optionLabels[segment.ALLOCATION_OPTION_ID] = segment.NAME;
        segmentIds.push(Number(segment.ALLOCATION_OPTION_ID));
    });

    //Map LOB options: ALLOCATION_OPTION_ID -> Label
    //Add LOB options to the corresponding record L5/L6: HL5_ID -> OPTIONS[] - HL6_ID -> OPTIONS[]
    result.LOB_CATEGORY_COLLECTION.forEach(function(lob){
        var optionFormatted = {};
        optionFormatted.OPTION_NAME = lob.OPTION_NAME;
        optionFormatted.ALLOCATION_OPTION_ID = lob.ALLOCATION_OPTION_ID;
        optionFormatted.AMOUNT = lob.AMOUNT;

        //Complete options with the ones that are not configured but still in some records (E.Q: removed options)
        optionLabels[lob.ALLOCATION_OPTION_ID] = lob.OPTION_NAME;

        switch (lob.HIERARCHY_LEVEL_ID) {
            case 2:
                if(!lobOptions.HL5[lob.HL_ID]){
                    lobOptions.HL5[lob.HL_ID] = {
                        OPTIONS: []
                    };
                }
                (lobOptions.HL5[lob.HL_ID].OPTIONS).push(optionFormatted);
                break;
            case 3:
                if(!lobOptions.HL6[lob.HL_ID]){
                    lobOptions.HL6[lob.HL_ID] = {
                        OPTIONS: []
                    };
                }
                (lobOptions.HL6[lob.HL_ID].OPTIONS).push(optionFormatted);
                break;
        }
    });

    //Map Marketing Segment options: ALLOCATION_OPTION_ID -> Label
    //Add Marketing Segment options to the corresponding record L5/L6: HL5_ID -> OPTIONS[] - HL6_ID -> OPTIONS[]
    result.SEGMENT_CATEGORY_COLLECTION.forEach(function(segment){
        var optionFormatted = {};
        optionFormatted.OPTION_NAME = segment.OPTION_NAME;
        optionFormatted.ALLOCATION_OPTION_ID = segment.ALLOCATION_OPTION_ID;
        optionFormatted.AMOUNT = segment.AMOUNT;

        //Complete options with the ones that are not configured but still in some records (E.Q: removed options)
        optionLabels[segment.ALLOCATION_OPTION_ID] = segment.OPTION_NAME;

        switch (segment.HIERARCHY_LEVEL_ID) {
            case 2:
                if(!segmentOptions.HL5[segment.HL_ID]){
                    segmentOptions.HL5[segment.HL_ID] = {
                        OPTIONS: []
                    };
                }
                (segmentOptions.HL5[segment.HL_ID].OPTIONS).push(optionFormatted);
                break;
            case 3:
                if(!segmentOptions.HL6[segment.HL_ID]){
                    segmentOptions.HL6[segment.HL_ID] = {
                        OPTIONS: []
                    };
                }
                (segmentOptions.HL6[segment.HL_ID].OPTIONS).push(optionFormatted);
                break;
        }
    });

    //Change the Key of the Option Labels map to identify them by category.
    var orderOptionLabels = {};
    Object.keys(optionLabels).forEach(function(optionIdKey){
        var category = getCategory(lobIds, segmentIds, Number(optionIdKey));
        orderOptionLabels["ORDER" + category + orderCounter + "_" + optionIdKey] = optionLabels[optionIdKey];
        //Map the OptionID to the generated Key
        optionKeysMap[optionIdKey] = "ORDER" + category + orderCounter + "_" + optionIdKey;
        orderCounter++;
    });

    //Apply alphabetic order of Labels
    const orderedOptionLabels = {};
    Object.keys(orderOptionLabels).sort().forEach(function(key) {
        orderedOptionLabels[key] = orderOptionLabels[key];
    });

    var reportTree = [];
    var hl6MapByHl5Id = {};

    //Add ordered Options to each row
    //Add corresponding Amounts to each option of each row
    //Save all HL5 in an array as base of the Tree
    //Map HL6 by its parent HL5_ID
    result.LEVEL_COLLECTION.forEach(function(levelParsed){
        Object.keys(orderedOptionLabels).forEach(function(key){
            levelParsed[key] = "N/A";
        });

        switch (levelParsed.HIERARCHY_LEVEL_ID) {
            case 2:
                if(lobOptions.HL5[levelParsed.HL_ID] &&
                    lobOptions.HL5[levelParsed.HL_ID].OPTIONS &&
                    lobOptions.HL5[levelParsed.HL_ID].OPTIONS.length){

                    lobOptions.HL5[levelParsed.HL_ID].OPTIONS.forEach(function(option){
                        levelParsed[optionKeysMap[option.ALLOCATION_OPTION_ID]] = Number(option.AMOUNT);
                    });
                }
                if(segmentOptions.HL5[levelParsed.HL_ID] && segmentOptions.HL5[levelParsed.HL_ID].OPTIONS && segmentOptions.HL5[levelParsed.HL_ID].OPTIONS.length){
                    segmentOptions.HL5[levelParsed.HL_ID].OPTIONS.forEach(function(option){
                        levelParsed[optionKeysMap[option.ALLOCATION_OPTION_ID]] = Number(option.AMOUNT);
                    });
                }

                reportTree.push(levelParsed);
                break;
            case 3:
                if(!hl6MapByHl5Id[levelParsed.HL_PARENT_LEVEL_ID]){
                    hl6MapByHl5Id[levelParsed.HL_PARENT_LEVEL_ID] = {};
                }

                hl6MapByHl5Id[levelParsed.HL_PARENT_LEVEL_ID][levelParsed.HL_ID] = levelParsed;

                if(lobOptions.HL6[levelParsed.HL_ID] && lobOptions.HL6[levelParsed.HL_ID].length){
                    orderCounter = lobStartIn;
                    lobOptions.HL6[levelParsed.HL_ID].forEach(function(option){
                        hl6MapByHl5Id[levelParsed.HL_PARENT_LEVEL_ID][levelParsed.HL_ID][optionKeysMap[option.ALLOCATION_OPTION_ID]] = Number(option.AMOUNT);
                    });
                }
                if(segmentOptions.HL6[levelParsed.HL_ID] && segmentOptions.HL6[levelParsed.HL_ID].length){
                    segmentOptions.HL6[levelParsed.HL_ID].forEach(function(option){
                        hl6MapByHl5Id[levelParsed.HL_PARENT_LEVEL_ID][levelParsed.HL_ID][optionKeysMap[option.ALLOCATION_OPTION_ID]] = Number(option.AMOUNT);
                    });
                }
                break;
        }
    });

    //Add HL6 Childrens to each HL5 to build the final Tree.
    reportTree.forEach(function(hl5){
        hl5.CHILDREN = formatHl6ForReport(hl6MapByHl5Id[hl5.HL_ID]);
    });

    return {
        report: reportTree,
        optionLabels: orderedOptionLabels
    };
}

function getCategory(lobIds, segmentIds, optionKey){
    return (lobIds.indexOf(optionKey) !== -1) ? "LOB" : (segmentIds.indexOf(optionKey) !== -1) ? "SEG" : "ZZZ";
}

function formatHl6ForReport(hl6Map){
    return !!hl6Map ? Object.keys(hl6Map).map(function (key) {
        return hl6Map[key]
    }) : [];
}
