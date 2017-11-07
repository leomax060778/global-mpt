/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataExpectedOutcome = mapper.refactorL5L6_getDataExpectedOutcome();
var dataExpectedOutcomeLevel = mapper.getDataExpectedOutcomeLevel();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/
var EXPECTED_OUTCOMES_NOT_FOUND = "Expected Outcomes can not be found.";
var EXPECTED_OUTCOME_NAME_NOT_FOUND = "Expected Outcome Name not found";
var EXPECTED_OUTCOME_IN_USE = "Expected Outcome can not be deleted because it is in use.";
var EXPECTED_OUTCOME_ALREADY_EXIST = "A Expected Outcome with the same Name already exist.";
var LEVEL_NOT_SUPPORTED = "Level is not supported.";

var map = {
    'IN_EXPECTED_OUTCOME_ID': 'EXPECTED_OUTCOME_ID',
    'IN_NAME': 'EXPECTED_OUTCOME_NAME'
};

var HIERARCHY_LEVEL = {
    HL1: 6,
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

var getExpectedOutcomeByHlIdMap = {
    HL1: dataExpectedOutcome.getExpectedOutcomeByHL1Id,
    HL2: dataExpectedOutcome.getExpectedOutcomeByHL1Id,//getExpectedOutcomeByHl2Id,
    HL3: dataExpectedOutcome.getExpectedOutcomeByHl2Id,//getExpectedOutcomeByHl3Id,
    HL4: dataExpectedOutcome.getExpectedOutcomeByHl3Id
};

var getExpectedOutcomeDetailByIdMap = {
    HL1: dataExpectedOutcome.getHL1ExpectedOutcomeDetailById,
    HL2: dataExpectedOutcome.getHL1ExpectedOutcomeDetailById,//getHl2ExpectedOutcomeDetailById,
    HL3: dataExpectedOutcome.getHl2ExpectedOutcomeDetailById,//getHl3ExpectedOutcomeDetailById,
    HL4: dataExpectedOutcome.getHl3ExpectedOutcomeDetailById
};

var getExpectedOutcomeDetailMap = {
    HL1: dataExpectedOutcome.getHL1ExpectedOutcomeDetailById,
    HL2: dataExpectedOutcome.getHl2ExpectedOutcomeDetailById,
    HL3: dataExpectedOutcome.getHl3ExpectedOutcomeDetailById,
    HL4: dataExpectedOutcome.getHl4ExpectedOutcomeDetailById,
    HL5: dataExpectedOutcome.getHl5ExpectedOutcomeDetailById,
    HL6: dataExpectedOutcome.getHl6ExpectedOutcomeDetailById
};

var hlExpectedOutcomesIdMap = {
    HL1: 'HL1_EXPECTED_OUTCOMES_ID',
    HL2: 'HL1_EXPECTED_OUTCOMES_ID',//'HL2_EXPECTED_OUTCOMES_ID',
    HL3: 'HL2_EXPECTED_OUTCOMES_ID',//'HL3_EXPECTED_OUTCOMES_ID',
    HL4: 'HL3_EXPECTED_OUTCOMES_ID'
};

function getAllExpectedOutcomes() {
    return dataExpectedOutcome.getAllExpectedOutcomes();
}

function getExpectedOutcomeById(expectedOutcomeId) {
    if (!expectedOutcomeId)
        throw ErrorLib.getErrors().CustomError("",
            "expectedOutcomeServices/handleget/getExpectedOutcomeById",
            EXPECTED_OUTCOMES_NOT_FOUND);
    return dataExpectedOutcome.getExpectedOutcomeById(expectedOutcomeId);
}

function insertExpectedOutcome(expectedOutcome, userId) {
    expectedOutcome = uiToServerParser(expectedOutcome);
    validate(expectedOutcome);

    return dataExpectedOutcome.insertExpectedOutcome(expectedOutcome.EXPECTED_OUTCOME_NAME, userId);
}

function updateExpectedOutcome(expectedOutcome, userId) {
    expectedOutcome = uiToServerParser(expectedOutcome);
    if (!expectedOutcome.EXPECTED_OUTCOME_ID || !Number(expectedOutcome.EXPECTED_OUTCOME_ID))
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handlePut/updateExpectedOutcome", EXPECTED_OUTCOMES_NOT_FOUND);

    validate(expectedOutcome);
    return dataExpectedOutcome.updateExpectedOutcome(expectedOutcome.EXPECTED_OUTCOME_ID, expectedOutcome.EXPECTED_OUTCOME_NAME, userId);
}

function deleteExpectedOutcome(expectedOutcome, userId) {
    expectedOutcome = uiToServerParser(expectedOutcome);
    if (!expectedOutcome.EXPECTED_OUTCOME_ID || !Number(expectedOutcome.EXPECTED_OUTCOME_ID))
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handleDelete/deleteExpectedOutcome", EXPECTED_OUTCOMES_NOT_FOUND);

    if (dataExpectedOutcome.getExpectedOutcomeInUseByExpectedOutcomeId(expectedOutcome.EXPECTED_OUTCOME_ID).length)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handleDelete/deleteExpectedOutcome", EXPECTED_OUTCOME_IN_USE);

    return dataExpectedOutcome.deleteExpectedOutcome(expectedOutcome.EXPECTED_OUTCOME_ID, userId);
}

function validate(expectedOutcome) {
    if (!expectedOutcome.EXPECTED_OUTCOME_NAME)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handlePost/validateExpectedOutcome", EXPECTED_OUTCOME_NAME_NOT_FOUND);

    var expectedOutcomeFromDb = dataExpectedOutcome.getExpectedOutcomeByName(expectedOutcome.EXPECTED_OUTCOME_NAME);
    if (expectedOutcomeFromDb && expectedOutcomeFromDb.EXPECTED_OUTCOME_ID != expectedOutcome.EXPECTED_OUTCOME_ID)
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handlePost/validateExpectedOutcome", EXPECTED_OUTCOME_ALREADY_EXIST);

    return true;
}

function uiToServerParser(object) {
    var data = JSON.stringify(object, function (key, value) {
        if (Array.isArray(value)) {
            return value;
        } else if (value && typeof value === 'object') {
            var replacement = {};
            Object.keys(value).forEach(function (k) {
                replacement[map[k] || k] = value[k];
            });
            return replacement;
        }
        return value;
    });

    data = JSON.parse(data);

    return data;
}

function getOutcomesLevelByOptionNameOutcomeIdAndLevelId(optionName, expectedOutcomeId, hlName) {
    return dataExpectedOutcomeLevel.getOutcomesLevelByOptionNameOutcomeIdAndLevelId(optionName, expectedOutcomeId, hlName);
}

function getExpectedOutcomesByParentIdLevel(parentId, level) {
    var result = [];

    if (!hlExpectedOutcomesIdMap[level.toUpperCase()])
        throw ErrorLib.getErrors().CustomError("", "expectedOutcomeServices/handleGet/getExpectedOutcomesByParentIdLevel", LEVEL_NOT_SUPPORTED);

    var expectedOutcomes = getExpectedOutcomeByHlIdMap[level.toUpperCase()](parentId);
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (eo) {
            var aux = util.extractObject(eo);
            var expectedOutcomesId = aux[hlExpectedOutcomesIdMap[level.toUpperCase()]];
            var detail = getExpectedOutcomeDetailByIdMap[level.toUpperCase()](expectedOutcomesId);
            aux.detail = addParentKpiDataToDetail(parentId, level, detail);
            result.push(aux);
        });

    } else {
        result.push({COMMENT: '', detail: []});
    }
    return result[0];
}

function getExpectedOutcomesByHL1Id(hl1_id, fromGrid) {
    var result = {COMMENTS: '', KPIS: []};
    var expectedOutcomes = dataExpectedOutcome.getHL1ExpectedOutcomeDetailById(hl1_id);
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (elem) {
            result.COMMENTS = elem.COMMENTS;
            if(elem.OUTCOMES_TYPE_ID){
                result.KPIS.push({
                    OUTCOMES_TYPE_NAME: elem.OUTCOMES_TYPE_NAME,
                    OUTCOMES_TYPE_ID: elem.OUTCOMES_TYPE_ID,
                    OUTCOMES_NAME: elem.OUTCOMES_NAME,
                    OUTCOMES_ID: elem.OUTCOMES_ID,
                    EURO_VALUE: elem.EURO_VALUE,
                    VOLUME_VALUE: elem.VOLUME_VALUE
                })
            }
        });
        if (result.KPIS.length) {
            result.KPIS = addParentKpiDataToDetail(hl1_id, 'HL2', result.KPIS, fromGrid);
        }
    }

    return result;
}

function getExpectedOutcomesByHl2Id(hl2_id, hl1_id, fromGrid) {
    var result = {COMMENTS: '', KPIS: []};
    var expectedOutcomes = dataExpectedOutcome.getHl2ExpectedOutcomeDetailById(hl2_id);
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (elem) {
            result.COMMENTS = elem.COMMENTS;
            if(elem.OUTCOMES_TYPE_ID){
                result.KPIS.push({
                    OUTCOMES_TYPE_NAME: elem.OUTCOMES_TYPE_NAME,
                    OUTCOMES_TYPE_ID: elem.OUTCOMES_TYPE_ID,
                    OUTCOMES_NAME: elem.OUTCOMES_NAME,
                    OUTCOMES_ID: elem.OUTCOMES_ID,
                    EURO_VALUE: elem.EURO_VALUE,
                    VOLUME_VALUE: elem.VOLUME_VALUE
                })
            }
        });

        if (result.KPIS.length) {
            result.KPIS = fromGrid ? addParentKpiDataToDetail(hl2_id, 'HL3', result.KPIS, fromGrid) : addParentKpiDataToDetail(hl1_id, 'HL2', result.KPIS);
        } else {
            result.parentValues = getExpectedOutcomeTotalAvailableByHlIdLevelId(hl1_id, 'HL2');
        }
    }

    return result;
}

function getExpectedOutcomesByHl3Id(hl3_id, hl2_id, fromGrid) {
    var result = {COMMENTS: '', KPIS: []};
    var expectedOutcomes = dataExpectedOutcome.getHl3ExpectedOutcomeDetailById(hl3_id);
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (elem) {
            result.COMMENTS = elem.COMMENTS;
            if(elem.OUTCOMES_TYPE_ID){
                result.KPIS.push({
                    OUTCOMES_TYPE_NAME: elem.OUTCOMES_TYPE_NAME,
                    OUTCOMES_TYPE_ID: elem.OUTCOMES_TYPE_ID,
                    OUTCOMES_NAME: elem.OUTCOMES_NAME,
                    OUTCOMES_ID: elem.OUTCOMES_ID,
                    EURO_VALUE: elem.EURO_VALUE,
                    VOLUME_VALUE: elem.VOLUME_VALUE
                })
            }
        });

        if (result.KPIS.length) {
            result.KPIS = fromGrid ? addParentKpiDataToDetail(hl3_id, 'HL4', result.KPIS, fromGrid) : addParentKpiDataToDetail(hl2_id, 'HL3', result.KPIS);
        } else {
            result.parentValues = getExpectedOutcomeTotalAvailableByHlIdLevelId(hl2_id, 'HL3');
        }
    }

    return result;
}

function getExpectedOutcomesByHl4Id(hl4_id, hl3_id) {
    var expectedOutcomes = dataExpectedOutcome.getExpectedOutcomeByHl4Id(hl4_id);
    var result = [];
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (eo) {
            var aux = util.extractObject(eo);
            var detail = dataExpectedOutcome.getExpectedOutcomeDetailById(aux.HL4_EXPECTED_OUTCOMES_ID);
            if (detail.length) {
                aux.detail = addParentKpiDataToDetail(hl3_id, 'HL4', detail);
            } else {
                aux.detail = [];
                aux.parentValues = getExpectedOutcomeTotalAvailableByHlIdLevelId(hl3_id, 'HL4');
            }
            result.push(aux);
        });
    } else {
        result.push({COMMENT: '', detail: []});
    }
    return result[0];
}

function getExpectedOutcomesByHl5Id(hl5_id, hl4_id) {
    return getExpectedOutcomesByHlIdParentId(hl5_id, hl4_id, 'HL5', 'HL6');
    /*var result = {COMMENTS: '', KPIS: []};
    var expectedOutcomes = dataExpectedOutcome.getHl5ExpectedOutcomeDetailById(hl5_id);
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (elem) {
            result.COMMENTS = elem.COMMENTS;
            if(elem.OUTCOMES_TYPE_ID){
                result.KPIS.push({
                    OUTCOMES_TYPE_NAME: elem.OUTCOMES_TYPE_NAME,
                    OUTCOMES_TYPE_ID: elem.OUTCOMES_TYPE_ID,
                    OUTCOMES_NAME: elem.OUTCOMES_NAME,
                    OUTCOMES_ID: elem.OUTCOMES_ID,
                    EURO_VALUE: elem.EURO_VALUE,
                    VOLUME_VALUE: elem.VOLUME_VALUE
                })
            }
        });

        if (result.KPIS.length) {
            result.KPIS = addParentKpiDataToDetail(hl4_id, 'HL5', result.KPIS);
        } else {
            result.parentValues = getExpectedOutcomeTotalAvailableByHlIdLevelId(hl4_id, 'HL5');
        }
    }

    return result;*/
}

function getExpectedOutcomesByHl6Id(hl6_id, hl5_id) {
    return getExpectedOutcomesByHlIdParentId(hl6_id, hl5_id, 'HL6');
    /*var result = {COMMENTS: '', KPIS: []};
    var expectedOutcomes = dataExpectedOutcome.getHl5ExpectedOutcomeDetailById(hl6_id);
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (elem) {
            result.COMMENTS = elem.COMMENTS;
            if(elem.OUTCOMES_TYPE_ID){
                result.KPIS.push({
                    OUTCOMES_TYPE_NAME: elem.OUTCOMES_TYPE_NAME,
                    OUTCOMES_TYPE_ID: elem.OUTCOMES_TYPE_ID,
                    OUTCOMES_NAME: elem.OUTCOMES_NAME,
                    OUTCOMES_ID: elem.OUTCOMES_ID,
                    EURO_VALUE: elem.EURO_VALUE,
                    VOLUME_VALUE: elem.VOLUME_VALUE
                })
            }
        });

        if (result.KPIS.length) {
            result.KPIS = addParentKpiDataToDetail(hl5_id, 'HL6', result.KPIS);
        } else {
            result.parentValues = getExpectedOutcomeTotalAvailableByHlIdLevelId(hl5_id, 'HL6');
        }
    }

    return result;*/
}

function getExpectedOutcomeTotalAvailableByHlIdLevelId(parentId, level, childId) {
    var totalAvailable = dataExpectedOutcomeLevel.getExpectedOutcomeTotalAvailableByHlIdLevelId(parentId, level, childId || 0);

    var result = {};
    totalAvailable.forEach(function (kpi) {
        if (!result[kpi.EXPECTED_OUTCOME_ID])
            result[kpi.EXPECTED_OUTCOME_ID] = {};

        result[kpi.EXPECTED_OUTCOME_ID][kpi.EXPECTED_OUTCOME_OPTION_ID] = {
            PARENT_TOTAL_VALUE: kpi.PARENT_TOTAL_VALUE,
            PARENT_TOTAL_VOLUME: kpi.PARENT_TOTAL_VOLUME,
            VALUE_AVAILABLE_TO_ALLOCATE: kpi.VALUE_AVAILABLE_TO_ALLOCATE,
            VOLUME_AVAILABLE_TO_ALLOCATE: kpi.VOLUME_AVAILABLE_TO_ALLOCATE,
            ALLOCATED_VALUE: kpi.ALLOCATED_VALUE,
            ALLOCATED_VOLUME: kpi.ALLOCATED_VOLUME
        }
    });
    return result;
}

function addParentKpiDataToDetail(parentId, level, detail, fromGrid) {
    var totalAvailable = getExpectedOutcomeTotalAvailableByHlIdLevelId(parentId, level);
    return addTotalAvailable(detail, totalAvailable, fromGrid);
}

function addTotalAvailable(detail, totalAvailable, fromGrid) {
    detail = JSON.parse(JSON.stringify(detail));
    detail.forEach(function (elem) {
        elem.PARENT_TOTAL_VALUE = null;
        elem.PARENT_TOTAL_VOLUME = null;
        elem.VALUE_AVAILABLE_TO_ALLOCATE = null;
        elem.VOLUME_AVAILABLE_TO_ALLOCATE = null;

        if (totalAvailable) {
            if (totalAvailable[elem.OUTCOMES_TYPE_ID] && totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID]) {
                elem.PARENT_TOTAL_VALUE = totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].PARENT_TOTAL_VALUE || null;
                elem.PARENT_TOTAL_VOLUME = totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].PARENT_TOTAL_VOLUME || null;
                elem.VALUE_AVAILABLE_TO_ALLOCATE = totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].VALUE_AVAILABLE_TO_ALLOCATE > 0
                    ? totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].VALUE_AVAILABLE_TO_ALLOCATE : 0;
                elem.VOLUME_AVAILABLE_TO_ALLOCATE = totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].VOLUME_AVAILABLE_TO_ALLOCATE > 0
                    ? totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].VOLUME_AVAILABLE_TO_ALLOCATE : 0;

                if (fromGrid) {
                    elem.ALLOCATED_VALUE = totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].ALLOCATED_VALUE || null;
                    elem.ALLOCATED_VOLUME = totalAvailable[elem.OUTCOMES_TYPE_ID][elem.OUTCOMES_ID].ALLOCATED_VOLUME || null;
                }
            }
        }
    });

    return detail;
}

function filterKpiByLevel(kpis, level){
    var mapEOL = expectedOutcomesLevelLib.getKpiTypeOptionMapByHlId(HIERARCHY_LEVEL[level]);
    var result = {COMMENTS: '', KPIS: []};
    result.COMMENTS = kpis.COMMENTS || '';
    kpis.KPIS.forEach(function (kpi) {
        if(!!mapEOL[kpi.OUTCOMES_TYPE_ID][kpi.OUTCOMES_ID])
            kpi.EURO_VALUE = 0;
            kpi.VOLUME_VALUE = 0;
            result.KPIS.push(kpi);
    });


    result.KPIS = kpis.KPIS.filter(function (kpi) {
        return !!mapEOL[kpi.OUTCOMES_TYPE_ID][kpi.OUTCOMES_ID];
    });

    return result;
}

function getExpectedOutcomesByHlIdParentId(hlId, parentId, level, nextLevel, fromGrid){
    var result = {COMMENTS: '', KPIS: []};
    var expectedOutcomes = getExpectedOutcomeDetailMap[level.toUpperCase()](hlId);
    if (expectedOutcomes && expectedOutcomes.length) {
        expectedOutcomes.forEach(function (elem) {
            result.COMMENTS = elem.COMMENTS;
            if(elem.OUTCOMES_TYPE_ID){
                result.KPIS.push({
                    OUTCOMES_TYPE_NAME: elem.OUTCOMES_TYPE_NAME,
                    OUTCOMES_TYPE_ID: elem.OUTCOMES_TYPE_ID,
                    OUTCOMES_NAME: elem.OUTCOMES_NAME,
                    OUTCOMES_ID: elem.OUTCOMES_ID,
                    EURO_VALUE: elem.EURO_VALUE,
                    VOLUME_VALUE: elem.VOLUME_VALUE
                })
            }
        });
        if(level != 'HL4' && level != 'HL5' && level != 'HL6') {
            if (result.KPIS.length) {
                if (parentId)
                    result.KPIS = fromGrid ? addParentKpiDataToDetail(hlId, nextLevel.toUpperCase(), result.KPIS, fromGrid)
                        : addParentKpiDataToDetail(parentId, level.toUpperCase(), result.KPIS);
                else {
                    result.KPIS = addParentKpiDataToDetail(hlId, nextLevel.toUpperCase(), result.KPIS, fromGrid);
                }

            } else if (parentId) {
                result.parentValues = getExpectedOutcomeTotalAvailableByHlIdLevelId(parentId, level.toUpperCase());
            }
        }
    }

    return result;
}