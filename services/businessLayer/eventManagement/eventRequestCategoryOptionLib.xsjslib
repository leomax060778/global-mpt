/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataEventRequestCategoryOption = mapper.dataEventRequestCategoryOption();
var util = mapper.getUtil();
/**********************************************************************/

function getEventRequestCategoryOptions(eventRequestId) {
    var categoryOptionList = dataEventRequestCategoryOption.getEventRequestCategoryOptions(eventRequestId);
    var result = {};
    categoryOptionList.forEach(function (categoryOption) {
        if (!result[categoryOption.CATEGORY_NAME]) {
            result[categoryOption.CATEGORY_NAME] = {
                CATEGORY_ID: categoryOption.CATEGORY_ID,
                CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY,
                OPTIONS: []
            }
        }
        result[categoryOption.CATEGORY_NAME].OPTIONS.push({
            OPTION_ID: categoryOption.OPTION_ID,
            OPTION_NAME: categoryOption.OPTION_NAME,
            CATEGORY_ID: categoryOption.CATEGORY_ID,
            PERCENTAGE: categoryOption.PERCENTAGE,
            EVENT_REQUEST_CATEGORY_OPTION_ID: categoryOption.EVENT_REQUEST_CATEGORY_OPTION_ID,
            MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY
        });
    });
    return util.objectToArray(result);
}

function insertEventRequestCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    //**********************The level is hardcoded due to Event reuqest use L5 allocation**********************//
    var mapCOL = util.getMapCategoryOption('hl5');
    data.CATEGORIES.forEach(function (category) {
        category.OPTIONS.forEach(function (option) {
            var categoryOptionLevelId = mapCOL[category.CATEGORY_ID][option.OPTION_ID];
            categoryOptionBulk.push({
                IN_EVENT_REQUEST_ID: data.EVENT_REQUEST_ID
                , IN_ALLOCATION_CATEGORY_OPTION_LEVEL_ID: categoryOptionLevelId
                , IN_PERCENTAGE: Number(option.PERCENTAGE) || 0
                , IN_USER_ID: userId
            });
        });
    });

    if (categoryOptionBulk.length) {
        dataEventRequestCategoryOption.insertEventRequestCategoryOption(categoryOptionBulk);
    }

    return true;
}

function updateEventRequestCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    //**********************The level is hardcoded due to Event reuqest use L5 allocation**********************//
    var mapCOL = util.getMapCategoryOption('hl5');
    data.CATEGORIES.forEach(function (category) {
        category.OPTIONS.forEach(function (option) {
            var categoryOptionLevelId = mapCOL[category.CATEGORY_ID][option.OPTION_ID];
            categoryOptionBulk.push({
                IN_EVENT_REQUEST_ID: data.EVENT_REQUEST_ID
                , IN_ALLOCATION_CATEGORY_OPTION_LEVEL_ID: categoryOptionLevelId
                , IN_PERCENTAGE: Number(option.PERCENTAGE) || 0
                , IN_USER_ID: userId
            });
        });
    });

    if (categoryOptionBulk.length) {
        dataEventRequestCategoryOption.updateEventRequestCategoryOption(categoryOptionBulk);
    }

    return true;
}
