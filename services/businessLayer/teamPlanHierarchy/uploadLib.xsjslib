$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataUpload = mapper.getDataUpload();
var util = mapper.getUtil();
var categoryLib = mapper.getAllocationCategoryLib();
var expectedLib = mapper.getExpectedOutcomesOptionLib();
var ErrorLib = mapper.getErrors();
var blLevel5 = mapper.getLevel5();
var blLevel6 = mapper.getLevel6();
var blLevel1 = mapper.getLevel1();
var blLevel3 = mapper.getLevel3();
var blLevel2 = mapper.getLevel2();
var blcurrency = mapper.getCurrency();
var dataL4 = mapper.getDataLevel4();
var dataL5 = mapper.getDataLevel5();
/** ***********END INCLUDE LIBRARIES*************** */

var MSG_HL4_NOT_FOUND = "Hl4 not found.";
var MSG_HL5_NOT_FOUND = "Hl5 not found.";
var MSG_FK_MAP_NOT_FOUND = "Foreign key map, not found.";
var MSG_NOT_FOUND = ", not found.";
var MSG_INVALID_DATE_FORMAT = "Invalid date format";
var MSG_RECORD_WITHOUT_PARENT = "This record does not have a value parent.";
var MSG_ACRONYM_NOT_FOUND = "Acronym does not match with Parent.";
//Mapper//
var map = {};
var mapKPY = {};
var mapCategory = {};

var hierarchyLevel = {
    "hl1": 6,
    "hl2": 5,
    "hl3": 4,
    "hl4": 1,
    "hl5": 2,
    "hl6": 3
};

//map to asosciate hierarchy_level_id and business layer method to create new l5 or l6
var mapInsertHierarchyLevelInsert = {
    2: blLevel5.insertHl5FromUpload,
    3: blLevel6.insertHl6FromUpload,
    6: blLevel1.insertHl1FromUpload,
    5: blLevel2.insertHl2FromUpload,
    4: blLevel3.insertHl3FromUpload
};

//get map excel upload file configuration for static relation between field on database tables and excel column header
function getMapHLExcel() {
    return dataUpload.getMapHLExcel();
}

function getMapHL1Excel() {
    return dataUpload.getMapHL1Excel();
}

//get object value from map from a key
function getValue(element_key) {
    return map.filter(function (elem) {
        return elem.COLUMN_NAME.trim() == element_key.trim()
    })[0];
}

function getValueKPI(element_key) {
    return map.filter(function (elem) {
        return elem.CSV_COLUMN_NAME == element_key
    })[0];
}

//define a map for all expected outcomes options on database
//the main fields are:
//TYPE: 0 to L5, 1 to L6
//MAP_L5_L6_ID: unique expected outcome option id
//CSV_COLUMN_NAME: column name in csv file related to expected outcome option with the same name in database
//COLUMN_NAME: Same as above field
//DATA_TYPE: needed to cast use or custom handler
//FOREIGN_TABLE_NAME: Referenced table (only for static configuration)
//FOREIGN_COLUMN_REFERENCE: Referenced field in above table needed to extract value (only for static configuration)
//FOREIGN_COLUMN_FILTER: needed table column name to find foreign register
function getMapKPY() {
    var rdo = [];
    var expectedOutcomes = expectedLib.getAllExpectedOutcomeOptionIncludeDeleted();
    expectedOutcomes.forEach(function (exp) {

        var objL5 = {};
        objL5.MAP_L5_L6_ID = exp.expected_outcome_option_id;
        objL5.TYPE = 0;
        objL5.COLUMN_NAME = exp.NAME;
        objL5.CSV_COLUMN_NAME = exp.NAME;
        objL5.DATA_TYPE = "decimal";
        objL5.FOREIGN_TABLE_NAME = "";
        objL5.FOREIGN_COLUMN_REFERENCE = "";
        objL5.FOREIGN_COLUMN_FILTER = "";
        objL5.OTHER_CONDITION = "";

        var objL6 = {};
        objL6.MAP_L5_L6_ID = exp.expected_outcome_option_id;
        objL6.TYPE = 1;
        objL6.COLUMN_NAME = exp.NAME;
        objL6.CSV_COLUMN_NAME = exp.NAME;
        objL6.DATA_TYPE = "decimal";
        objL6.FOREIGN_TABLE_NAME = "";
        objL6.FOREIGN_COLUMN_REFERENCE = "";
        objL6.FOREIGN_COLUMN_FILTER = "";
        objL6.OTHER_CONDITION = "";

        rdo.push(objL5);
        rdo.push(objL6);
    });
    mapKPY = rdo;
    return rdo;
}

//define a map for all categories on database
//the main fields are:
//TYPE: 0 to L5, 1 to L6
//MAP_L5_L6_ID: unique id category
//CSV_COLUMN_NAME: column name related to category with the same name
//COLUMN_NAME: Same as above field
//DATA_TYPE: needed to cast use or custom handler
//FOREIGN_TABLE_NAME: Referenced table (only for static configuration)
//FOREIGN_COLUMN_REFERENCE: Referenced field in above table needed to extract value (only for static configuration)
//FOREIGN_COLUMN_FILTER: needed table column name to find foreign register
function getMapCategories() {
    var rdo = [];
    var categories = categoryLib.getAllAllocationCategory();
    categories.forEach(function (cat) {

        var objL5 = {};
        objL5.MAP_L5_L6_ID = cat.CATEGORY_ID;
        objL5.TYPE = 0;
        objL5.COLUMN_NAME = cat.NAME;
        objL5.CSV_COLUMN_NAME = cat.NAME;
        objL5.DATA_TYPE = "decimal";
        objL5.FOREIGN_TABLE_NAME = "";
        objL5.FOREIGN_COLUMN_REFERENCE = "";
        objL5.FOREIGN_COLUMN_FILTER = "";

        var objL6 = {};
        objL6.MAP_L5_L6_ID = cat.CATEGORY_ID;
        objL6.TYPE = 1;
        objL6.COLUMN_NAME = cat.NAME;
        objL6.CSV_COLUMN_NAME = cat.NAME;
        objL6.DATA_TYPE = "decimal";
        objL6.FOREIGN_TABLE_NAME = "";
        objL6.FOREIGN_COLUMN_REFERENCE = "";
        objL6.FOREIGN_COLUMN_FILTER = "";

        rdo.push(objL5);
        rdo.push(objL6);
    });
    mapCategory = rdo;
    return rdo;
}

//create a complete map with Excel, Categories and expected outcomes (KPI)
function getMapHLExcelComplete() {
    var rdo = this.getMapHLExcel();
    //concat is slower, but easier to read
    //rdo = rdo.concat(getMapCategories());
    //rdo = rdo.concat(getMapKPY());
    //uncomment for faster concat!
    Array.prototype.push.apply(rdo, getMapCategories());
    Array.prototype.push.apply(rdo, getMapKPY());
    map = rdo;
    return rdo;
}

//create a complete map with Excel, Categories and expected outcomes (KPI)
function getMapHL1ExcelComplete() {
    var rdo = this.getMapHL1Excel();
    map = rdo;
    return rdo;
}

//check if is a category by name
function isCategory(key) {
    for (var i = 0; i < mapCategory.length; i++) {
        var category = mapCategory[i];
        if (category.COLUMN_NAME == key) {
            return true;
        }
    }
    return false;
}

//insert dictionary register in database
//insertDictionaryL5L6
function insertDictionary(payload, userId) {

    for (var i = 0; i < payload.length; i++) {

        var path = payload[i]["ACRONYM"];
        var level = payload[i]["OBJECT_TYPE"];

        Object.keys(payload[i]).forEach(function (key) {
            if (key != "ACRONYM" && key != "OBJECT_TYPE") {

                dataUpload.insertDictionary(path, key, payload[i][key], level, userId);
            }
        });
    }
    return true;
}

//insert dictionary register in database
//insertDictionaryL5L6

/**
 * @deprecated
 */
function insertDictionaryHl1(payload, userId) {

    dataUpload.deleteDictionary(userId);
    for (var i = 0; i < payload.length; i++) {

        var path = payload[i]["ACRONYM"];
        var level = "hl1";
        Object.keys(payload[i]).forEach(function (key) {
            if (key != "ACRONYM" && key != "OBJECT_TYPE") {
                dataUpload.insertDictionary(path, key, payload[i][key], level, userId);
            }
        });
    }
    var arrAcronym = dataUpload.getDictionaryPathByUser(userId);
    return level1Processor(userId, arrAcronym, 1);
}

function mapKeyForLevel(level, key) {
    if (map) {
        var res = map.filter(function (elem) {
            return (elem.CSV_COLUMN_NAME == key && (elem.DATA_TYPE == level || elem.DATA_TYPE == "KPI" ))
        });
        if (res.length > 0)
            return res[0].COLUMN_NAME;
    }
    return null;
}

function getLevelString(level) {
    switch (Number(level)) {
        case 1:
        case 6:
            return "HL1";
            break;
        case 2:
        case 5:
            return "HL2";
            break;
        case 3:
        case 4:
            return "HL3";
            break;
    }
}

function insertDictionaryHL(data, userId) {
    //clean dictionary for this user
    dataUpload.deleteDictionary(userId);

    //Load Mapper to map CSV_COLUMN_NAME TO COLUMN_NAME
    this.getMapForL1L2L3();


    //iterate data
    for (var i = 0; i < data.length; i++) {

        var path = data[i]["CSV_ACRONYM"];
        var level = getLevelString(data[i]["CSV_LEVEL"]);
        var parent = data[i]["CSV_PARENT"];

        Object.keys(data[i]).forEach(function (key) {
            if (key != "CSV_ACRONYM" && key != "OBJECT_TYPE") {
                var newKey = mapKeyForLevel(level, key);
                if (newKey)
                    dataUpload.insertDictionary(path, newKey, data[i][key], level, userId, parent);
            }
        });
    }

    var importId = dataUpload.insertImportHl("", userId);

    var arrAcronymHl1 = dataUpload.getDictionaryPathByUser(userId, 'HL1');
    var rtdo1 = level1Processor(userId, arrAcronymHl1, importId);

    var arrAcronymHl2 = dataUpload.getDictionaryPathByUser(userId, 'HL2');
    var rtdo2 = level2Processor(userId, arrAcronymHl2, importId);

    var arrAcronymHl3 = dataUpload.getDictionaryPathByUser(userId, 'HL3');
    var rtdo3 = level3Processor(userId, arrAcronymHl3, importId);

    rtdo1.success = (rtdo1.success || 0) + (rtdo2.success || 0) + (rtdo3.success || 0);
    rtdo1.fail = (rtdo1.fail || 0) + (rtdo2.fail || 0) + (rtdo3.fail || 0);

    Array.prototype.push.apply(rtdo1.messages, rtdo2.messages);
    Array.prototype.push.apply(rtdo1.messages, rtdo3.messages);

    rtdo1.length = rtdo1.messages.length;
    return rtdo1;
}

function insertDictionaryHlKPI(data, userId) {

    //clean dictionary for this user
    dataUpload.deleteDictionary(userId);

    //Load Mapper to map CSV_COLUMN_NAME TO COLUMN_NAME
    this.getMapForL1L2L3();

    //iterate data
    for (var i = 0; i < data.length; i++) {

        var path = data[i]["CSV_ACRONYM"]  + '&' + i;// payload[i]["CSV_ACRONYM"];
        var level = getLevelString(data[i]["CSV_LEVEL"]);//getLevelKPI(path).Level;

        // throw JSON.stringify(map);
        Object.keys(data[i]).forEach(function (key) {
            if (key != "CSV_ACRONYM" && key !="CSV_LEVEL") {
                var newKey = mapKeyForLevel(level, key);
                dataUpload.insertDictionaryKPI(path, newKey, data[i][key], level, userId, null);
            }
        });
    }

    var arrAcronym = dataUpload.getDictionaryPathByUser(userId, 'HL1');
    var arrAcronymhl2 = dataUpload.getDictionaryPathByUser(userId, 'HL2');
    var arrAcronymhl3 = dataUpload.getDictionaryPathByUser(userId, 'HL3');

    Array.prototype.push.apply(arrAcronym, arrAcronymhl2);
    Array.prototype.push.apply(arrAcronym, arrAcronymhl3);

    return kpiProcessor(userId, arrAcronym, 1);
}

function getMapForL1L2L3() {
    var rdo = dataUpload.getMapForL1L2L3();
    map = rdo;
    return rdo;
}


//return level string
//example:  XM                  -> "hl1"
//       :  CRM-XM17-BRX        -> "hl2"
//       :  CRM-XM17-BRX-ADV    -> "hl3"
function getLevel(path) {

    var rdo = {};
    var acronymArr = path.split("-");


    switch (acronymArr.length) {
        case 2:
            rdo.Level = "HL1";
            rdo.Acronym = acronymArr[1].substr(0, 2);
            break;
        case 3:
            rdo.Level = "HL2";
            rdo.Acronym = acronymArr[2];
            break;
        case 4:
            rdo.Level = "HL3";
            rdo.Acronym = acronymArr[3];
            break;
    }
    return rdo;
}


function getLevelKPI(path) {

    var rdo = {};
    /***fix: extract the serial number from KPI Path*******/
    var aux = path.split("&");
    aux.pop();
    path = aux.join("");
    rdo.PATH = path;
    /****************************************/
    var acronymArr = path.split("-");


    switch (acronymArr.length) {
        case 2:
            rdo.Level = "HL1";
            rdo.Acronym = acronymArr[1].substr(0, 2);
            break;
        case 3:
            rdo.Level = "HL2";
            rdo.Acronym = acronymArr[2];
            break;
        case 4:
            rdo.Level = "HL3";
            rdo.Acronym = acronymArr[3];
            break;
    }
    return rdo;
}

function getForeignId(tableName, columnReference, columnFilter, findValue, otherCondition, operator) {
    return dataUpload.getForeignId(tableName, columnReference, columnFilter, findValue, otherCondition, operator);
}

//get all distinct path from dictionary L5 and L6
function getAllPathFromDictionary(userId) {
    var result = {};
    result.hl5 = getHL5PathFromDictionary(userId);
    result.hl6 = getHL6PathFromDictionary(userId);
    result.IMPORT_ID = dataUpload.insertImport("", userId);


    return result;
}

//get all distinct path from dictionary L5 and L6
function getLevel1PathFromDictionary(userId) {
    var result = {};
    result.hl1 = getHL1PathFromDictionary(userId);
    result.IMPORT_ID = dataUpload.insertImport("", userId);
    return result;
}

//get all distinct path from dictionary for level 1
function getHL1PathFromDictionary(userId) {
    return dataUpload.getHL1PathFromDictionary(userId);
}

//get all distinct path from dictionary for level 5
function getHL5PathFromDictionary(userId) {
    return dataUpload.getHL5PathFromDictionary(userId);
}

//get all distinct path from dictionary for level 6
function getHL6PathFromDictionary(userId) {
    return dataUpload.getHL6PathFromDictionary(userId);
}

function getAcronym(path) {
    var acronym = path.split('-');

    if(acronym.length > 2){
        return acronym[2];
    }
    else{
        return acronym[1].substr(0, 2);
    }
}

//
function level1Processor(userId, arrayPaths, IMPORT_ID) {

    var arrHl = {success: 0, fails: 0, messages: []};

    arrayPaths.forEach(function (obj) {


        try {

            var hl = {};
            hl.IMPORT_ID = IMPORT_ID;
            hl.HIERARCHY_LEVEL_ID = 6;//6 IS HL1


            //get all row by each path
            var row = dataUpload.getDataFromUploadDictionaryByPath(obj.PATH, userId);
            hl.ACRONYM = getAcronym(obj.PATH);
            var budget = 0;

            if (validateHl1(row)) {

                row.forEach(function (cell) {
                    var fieldMapper = getValue(cell.UPLOAD_KEY);

                    if (cell.UPLOAD_KEY == 'REGION_ID') {

                        if (cell.UPLOAD_VALUE == 0) {
                            hl[cell.UPLOAD_KEY] = 0;
                        } else {
                            var value = getForeignId(
                                fieldMapper.FOREIGN_TABLE_NAME,
                                fieldMapper.FOREIGN_COLUMN_REFERENCE,
                                fieldMapper.FOREIGN_COLUMN_FILTER,
                                cell.UPLOAD_VALUE,
                                fieldMapper.OTHER_CONDITION, '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];

                            hl[cell.UPLOAD_KEY] = value;
                        }
                    } else {
                        if (cell.UPLOAD_KEY == 'BUDGET') {
                            budget = Number(parseNumberBudget(cell.UPLOAD_VALUE));
                            hl[cell.UPLOAD_KEY] = budget || 0;
                        } else {
                            if (cell.UPLOAD_KEY == 'ASSOCIATED_USER') {
                                var users = cell.UPLOAD_VALUE.replace(/\"|\r/, "").split(',');
                                var arrUsers = [];
                                if (users.length) {
                                    users.forEach(function (user) {
                                        var value = getForeignId(
                                            fieldMapper.FOREIGN_TABLE_NAME,
                                            fieldMapper.FOREIGN_COLUMN_REFERENCE,
                                            fieldMapper.FOREIGN_COLUMN_FILTER,
                                            user,
                                            fieldMapper.OTHER_CONDITION, '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];

                                        if (value) {
                                            arrUsers.push({USER_ID: value});
                                        }
                                    });
                                }
                                else
                                    arrUsers.push({USER_ID: userId});

                                hl.USERS = arrUsers;
                            } else {
                                if (fieldMapper && fieldMapper.FOREIGN_TABLE_NAME) {//IS A FOREIGN KEY
                                    var value = getForeignId(
                                        fieldMapper.FOREIGN_TABLE_NAME,
                                        fieldMapper.FOREIGN_COLUMN_REFERENCE,
                                        fieldMapper.FOREIGN_COLUMN_FILTER,
                                        cell.UPLOAD_VALUE,
                                        fieldMapper.OTHER_CONDITION, '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];

                                    hl[cell.UPLOAD_KEY] = value;


                                } else {
                                    hl[cell.UPLOAD_KEY] = cell.UPLOAD_VALUE; //common cases
                                }
                            }
                        }
                    }


                });

                //set user
                hl.CREATED_USER_ID = userId;

                if (mapInsertHierarchyLevelInsert[hl.HIERARCHY_LEVEL_ID](hl, userId)) {
                    logImportSuccess(row, IMPORT_ID, userId);
                    arrHl.success++;

                }
            }
        } catch (e) {
            arrHl.fails++;
            if (e && e.code == 456) {
                logImportError(e, IMPORT_ID, userId);
                arrHl.messages.push(e.details);
            } else {
                logImportAnotherError(obj.PATH, obj.HIERARCHY_LEVEL_ID, e, IMPORT_ID, userId);
                //throw e;
            }

        }
    });

    return arrHl;
}

function level2Processor(userId, arrayPaths, IMPORT_ID) {
    var arrHl = {success: 0, fails: 0, messages: []};

    arrayPaths.forEach(function (obj) {
        try {
            var hl = {};
            hl.IMPORT_ID = IMPORT_ID;
            hl.HIERARCHY_LEVEL_ID = 5;//5 IS HL2

            //get all row by each path
            var row = dataUpload.getDataFromUploadDictionaryByPath(obj.PATH, userId);
            var budget = 0;
            if (validateHl2(row)) {
                hl.ACRONYM = getAcronym(obj.PATH);//getLevelString(obj.Level).Acronym;
                hl.PARENT_ID = dataUpload.getParentIdByPath(obj.PARENT, hierarchyLevel["hl1"]).HL_ID;

                row.forEach(function (cell) {
                    var fieldMapper = getValue(cell.UPLOAD_KEY);

                    if (cell.UPLOAD_KEY == 'SUBREGION_ID') {

                        if (cell.UPLOAD_VALUE == 0) {
                            hl[cell.UPLOAD_KEY] = 0;
                        } else {
                            var value = getForeignId(
                                fieldMapper.FOREIGN_TABLE_NAME,
                                fieldMapper.FOREIGN_COLUMN_REFERENCE,
                                fieldMapper.FOREIGN_COLUMN_FILTER,
                                cell.UPLOAD_VALUE,
                                fieldMapper.OTHER_CONDITION, '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];

                            hl[cell.UPLOAD_KEY] = value;
                        }
                    }else if (cell.UPLOAD_KEY == 'BUDGET') {
                        budget = Number(parseNumberBudget(cell.UPLOAD_VALUE));
                        hl[cell.UPLOAD_KEY] = budget || 0;
                    } else {
                        if (cell.UPLOAD_KEY == 'ASSOCIATED_USER') {
                            var users = cell.UPLOAD_VALUE.replace(/\"|\r/, "").split(',');
                            var arrUsers = [];
                            if (users.length) {
                                users.forEach(function (user) {
                                    var value = getForeignId(
                                        fieldMapper.FOREIGN_TABLE_NAME,
                                        fieldMapper.FOREIGN_COLUMN_REFERENCE,
                                        fieldMapper.FOREIGN_COLUMN_FILTER,
                                        user,
                                        fieldMapper.OTHER_CONDITION, '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];

                                    if (value) {
                                        arrUsers.push({USER_ID: value});
                                    }
                                });
                            }
                            else
                                arrUsers.push({USER_ID: userId});

                            hl.USERS = arrUsers;
                            //todo: KPI
                            hl.hl2_expected_outcomes = {};
                            hl.hl2_expected_outcomes.hl2_expected_outcomes_details = [];

                        } else {
                            hl[cell.UPLOAD_KEY] = cell.UPLOAD_VALUE; //common cases
                        }
                    }
                });

                //set user
                hl.CREATED_USER_ID = userId;

                if (mapInsertHierarchyLevelInsert[hl.HIERARCHY_LEVEL_ID](hl, userId)) {
                    logImportSuccess(row, IMPORT_ID, userId);
                    arrHl.success++;
                }
            }
        } catch (e) {
            arrHl.fails++;
            if (e && e.code == 456) {
                logImportError(e, IMPORT_ID, userId);
                arrHl.messages.push(e.details);
            } else {
                logImportAnotherError(obj.PATH, obj.HIERARCHY_LEVEL_ID, e, IMPORT_ID, userId);
                //throw e;
            }
        }
    });

    return arrHl;
}

function processor(userId, arrayPaths, IMPORT_ID) {
    var HLs = [];

    //initialize map
    getMapHLExcelComplete();

     // var arrtest = [];
    arrayPaths.forEach(function (obj) {

        try {
            var hl = {};
            hl.IMPORT_ID = IMPORT_ID;
            hl.categories = [];
            hl.expectedOutcomes = [];
            hl.expected_outcomes_detail = [];
            var kpiIndexMap = {};

            //get all row by each path
            var row = dataUpload.getDataFromDictionaryByPath(obj.PATH, userId);
            var budget = 0;

            if (validate(row)) {

                row.forEach(function (cell) {

                    var fieldMapper = getValue(cell.UPLOAD_KEY);

                    if (cell.HIERARCHY_LEVEL_ID)
                        hl.HIERARCHY_LEVEL_ID = cell.HIERARCHY_LEVEL_ID;

                    if (cell.UPLOAD_KEY == 'HL5_ID' || cell.UPLOAD_KEY == 'HL4_ID') {
                        hl.PARENT = cell.UPLOAD_VALUE;
                    }

                    //complete all foreign Key
                    if (fieldMapper && fieldMapper.FOREIGN_TABLE_NAME) {//IS A FOREIGN KEY
                        var value = getForeignId(
                            fieldMapper.FOREIGN_TABLE_NAME,
                            fieldMapper.FOREIGN_COLUMN_REFERENCE,
                            fieldMapper.FOREIGN_COLUMN_FILTER,
                            fieldMapper.DATA_TYPE == 'KPI' ? fieldMapper.CSV_COLUMN_NAME.replace(/ - Volume| - Value/g, '') : cell.UPLOAD_VALUE,
                            fieldMapper.OTHER_CONDITION, fieldMapper.DATA_TYPE == 'KPI' ? " LIKE" : '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];


                        if (fieldMapper.DATA_TYPE == 'KPI') {
                            var kpi = {};
                            kpi.VOLUME_VALUE = 0;
                            kpi.EURO_VALUE = 0;
                            var isVolume = fieldMapper.CSV_COLUMN_NAME.toLowerCase().indexOf("volume") >= 0;
                            if (isVolume) {
                                kpi.VOLUME_VALUE = cell.UPLOAD_VALUE;
                            }
                            else {
                                kpi.EURO_VALUE = cell.UPLOAD_VALUE;
                            }
                            kpi.EXPECTED_OUTCOME_OPTION_ID = value;
                            //If kpi already exists, update the other value
                            if (kpiIndexMap[value] || kpiIndexMap[value] === 0) {
                                if (isVolume) {
                                    hl.expected_outcomes_detail[kpiIndexMap[value]].VOLUME_VALUE = cell.UPLOAD_VALUE;
                                } else {
                                    hl.expected_outcomes_detail[kpiIndexMap[value]].EURO_VALUE = cell.UPLOAD_VALUE;
                                }
                            } else {
                                //get the index to use later and push the element
                                kpiIndexMap[value] = hl.expected_outcomes_detail.push(kpi) - 1;

                            }
                        }

                        hl[cell.UPLOAD_KEY] = value;

                    } else {
                        if (isCategory(cell.UPLOAD_KEY)) {
                            var objCat = processCategory(cell);
                            if (objCat)
                                hl.categories.push(objCat);
                        } else if (cell.UPLOAD_KEY == 'SHOW_ON_DG_CALENDAR') {
                            var showOnCalendar = cell.UPLOAD_VALUE.replace("\r", "");
                            if (showOnCalendar.indexOf("X") < 0)
                                hl[cell.UPLOAD_KEY] = 0;
                            else
                                hl[cell.UPLOAD_KEY] = 1;
                        }
                        else if (cell.UPLOAD_KEY == 'BUDGET') {
                            budget = Number(parseNumberBudget(cell.UPLOAD_VALUE));
                            if (!processDistributionComplete(row, budget)) {
                                var error = ErrorLib.getErrors().ImportError("", "", "Distribution budget is not complete.");
                                error.row = row;
                                //error.details = "Distribution budget is not complete.";
                                throw error;
                            }
                            hl[cell.UPLOAD_KEY] = budget;
                        }
                        else if (cell.UPLOAD_KEY == 'BUDGET_SPEND_Q1'
                            || cell.UPLOAD_KEY == 'BUDGET_SPEND_Q2'
                            || cell.UPLOAD_KEY == 'BUDGET_SPEND_Q3'
                            || cell.UPLOAD_KEY == 'BUDGET_SPEND_Q4'
                        ) {
                            hl[cell.UPLOAD_KEY] = processDistribution(row, budget, cell.UPLOAD_KEY);
                        }
                        else if (cell.UPLOAD_KEY == 'PLANNED_START_DATE'
                            || cell.UPLOAD_KEY == 'PLANNED_END_DATE'
                            || cell.UPLOAD_KEY == 'ACTUAL_START_DATE'
                            || cell.UPLOAD_KEY == 'ACTUAL_END_DATE'
                        ) {
                            var newDate = cell.UPLOAD_VALUE;
                            if (!new Date(newDate).valueOf()) {
                                var error = ErrorLib.getErrors().ImportError("", "uploadL5L6Lib/processor/", MSG_INVALID_DATE_FORMAT);
                                error.row = row;
                                //error.detail = MSG_INVALID_DATE_FORMAT;
                                throw error;
                            }
                            hl[cell.UPLOAD_KEY] = (new Date(newDate)).toISOString();
                        }
                        else {
                            hl[cell.UPLOAD_KEY] = cell.UPLOAD_VALUE;
                        }
                    }
                });

                //set acronym to L5 or L6
                if (hl.HIERARCHY_LEVEL_ID == 2) {
                    //get last piece of path separete with "_" or "-"
                    if (obj.PATH.indexOf("-") === -1) {
                        if (obj.PATH.indexOf(hl.PARENT) >= 0) {
                            hl.ACRONYM = obj.PATH.substring(hl.PARENT.length);
                        } else {
                            //var error = ErrorLib.getErrors().ImportError("","uploadL5L6Lib/processor",MSG_ACRONYM_NOT_FOUND);
                            var error = ErrorLib.getErrors().ImportError("", ""
                                , MSG_ACRONYM_NOT_FOUND + "path: " + obj.PATH + " parent: " + hl.PARENT);
                            error.row = row;
                            throw error;
                        }
                    }
                    else {
                        var auxAcronym = obj.PATH.split("-");
                        hl.ACRONYM = auxAcronym[auxAcronym.length - 1];
                    }

                }
                else {
                    if (hl.PARENT)
                        hl.ACRONYM = obj.PATH.substring(hl.PARENT.length);
                    else {

                        var error = ErrorLib.getErrors().ImportError("", "", MSG_RECORD_WITHOUT_PARENT);
                        error.row = row;
                        throw error;
                    }
                }

                //set currency


                hl.EURO_CONVERSION_ID = getDefaultCurrencyForBudgetYearByPath(hl);//blcurrency.getCurrencyByDefaultBudgetYearIdAbbr("EUR").EURO_CONVERSION_ID;

                //set status
                //hl.HL5_STATUS_DETAIL_ID = 1; //in progress

                //set user
                hl.CREATED_USER_ID = userId;

                //set in budget false
                hl.IN_BUDGET = 0;
                hl.IMPORT_ID = IMPORT_ID;

                if (hl.HIERARCHY_LEVEL_ID != 2 && hl.HIERARCHY_LEVEL_ID != 3) {
                    var error = ErrorLib.getErrors().ImportError("", "", "This record is incomplete or is not HL5/6");
                    error.row = row;
                    throw error;
                }

                 if (mapInsertHierarchyLevelInsert[hl.HIERARCHY_LEVEL_ID](hl, userId))
                      logImportSuccess(row, IMPORT_ID, userId)

            }
         //arrtest.push(hl);
        } catch (e) {
            if (e && e.code == 456) {
                logImportError(e, IMPORT_ID, userId);
            } else {
                logImportAnotherError(obj.PATH, obj.HIERARCHY_LEVEL_ID, e, IMPORT_ID, userId)
            }
        }

    });
    //throw JSON.stringify(arrtest);

    return true;
}

function getDefaultCurrencyForBudgetYearByPath(hl){
    var currencyId;
    if(hl.HL4_ID)
        currencyId = dataUpload.getDefaultCurrencyForHlLevel(hl.HL4_ID, hierarchyLevel['hl4']).EURO_CONVERSION_ID;
    else
        currencyId = dataUpload.getDefaultCurrencyForHlLevel(hl.HL5_ID, hierarchyLevel['hl5']).EURO_CONVERSION_ID;

    return currencyId;
}

function deleteDictionary(userId) {
    return dataUpload.deleteDictionary(userId);
}

function parseNumberBudget(stringValue) {
    var separator = stringValue[stringValue.length - 3];
    stringValue = stringValue.replace(/\.|,/g, "");

    if (separator === "," || separator === ".") {
        stringValue = stringValue / 100;
    }
    return stringValue;
}

function logImportAnotherError(path, level, error, importId, userId) {
    var separator = "/**/";

    dataUpload.insertLog("", "", 1,
        "logImportAnotherError - PATH: " + path + separator + "HL_ID: " + level + separator + "DETAIL: " + error, importId,
        userId);
}

function processDistribution(row, budgetAsigned, attribute) {
    var percentDistribution = 0;
    if (!budgetAsigned)
        return percentDistribution;

    row.forEach(function (cell) {
        if (cell.UPLOAD_KEY == attribute) {
            if (Number(cell.UPLOAD_VALUE) != 0) {
                percentDistribution = Number(cell.UPLOAD_VALUE) * 100 / budgetAsigned;
            }
        }
    });
    return percentDistribution;
}

function processDistributionComplete(row, budgetAsigned) {
    var distribution = 0;
    row.forEach(function (cell) {
        if (cell.UPLOAD_KEY == 'BUDGET_SPEND_Q1'
            || cell.UPLOAD_KEY == 'BUDGET_SPEND_Q2'
            || cell.UPLOAD_KEY == 'BUDGET_SPEND_Q3'
            || cell.UPLOAD_KEY == 'BUDGET_SPEND_Q4'
        ) {
            distribution = distribution + Number(parseNumberBudget(cell.UPLOAD_VALUE));
        }
    });
    return distribution == budgetAsigned;
}

function validateHl1(row) {
    return true;
    var parent;
    var error = ErrorLib.getErrors().ImportError("", "uploadLib/validateHl1/", "");
    error.row = row;

    var fieldMapper;
    row.forEach(function (cell) {
        if (cell.UPLOAD_KEY == "REGION_ID" || cell.UPLOAD_KEY == "BUDGET_YEAR_ID") {
            id = cell.UPLOAD_VALUE;
            fieldMapper = getValue(cell.UPLOAD_KEY);
        }
    });

    if (fieldMapper && fieldMapper.FOREIGN_TABLE_NAME) {//IS A FOREIGN KEY
        var value = getForeignId(
            fieldMapper.FOREIGN_TABLE_NAME,
            fieldMapper.FOREIGN_COLUMN_REFERENCE,
            fieldMapper.FOREIGN_COLUMN_FILTER,
            parent)[fieldMapper.FOREIGN_COLUMN_REFERENCE];

        if (!value) {
            error.details = fieldMapper.FOREIGN_COLUMN_REFERENCE + MSG_NOT_FOUND;
            throw error;
        }

    } else {
        error.details = MSG_FK_MAP_NOT_FOUND;
        throw error;
    }
    return true;

}

function validate(row) {

    var parent;
    var error = ErrorLib.getErrors().ImportError("", "", "");
    error.row = row;
    var fieldMapper;
    row.forEach(function (cell) {
        if (cell.UPLOAD_KEY == "HL4_ID" || cell.UPLOAD_KEY == "HL5_ID") {
            parent = cell.UPLOAD_VALUE;
            fieldMapper = getValue(cell.UPLOAD_KEY);
        }
    });

    if (fieldMapper && fieldMapper.FOREIGN_TABLE_NAME) {//IS A FOREIGN KEY
        var value = getForeignId(
            fieldMapper.FOREIGN_TABLE_NAME,
            fieldMapper.FOREIGN_COLUMN_REFERENCE,
            fieldMapper.FOREIGN_COLUMN_FILTER,
            parent)[fieldMapper.FOREIGN_COLUMN_REFERENCE];

        if (value) {
            if (row[0].HIERARCHY_LEVEL_ID == 2) {
                var hl4 = dataL4.getHl4ById(value);
                if (!hl4) {
                    error.details = MSG_HL4_NOT_FOUND;
                    //throw JSON.stringify(fieldMapper);
                    throw error
                }
                ;
            }
            else {
                var hl5 = dataL5.getHl5ById(value);
                if (!hl5) {
                    error.details = MSG_HL5_NOT_FOUND;
                    //throw JSON.stringify(fieldMapper);
                    throw error;
                }
            }
        } else {
//            throw JSON.stringify(fieldMapper);
            error.details = fieldMapper.FOREIGN_COLUMN_REFERENCE + MSG_NOT_FOUND;
            throw error;
        }

    } else {
        throw JSON.stringify(fieldMapper);
        error.details = MSG_FK_MAP_NOT_FOUND;
        throw error;
    }
    return true;

}

function logImportError(error, IMPORT_ID, userId) {
    if (!error || error.code != 456) throw error;

    var separator = "/**/";
    var keys = "";
    var values = "";
    var row = error.row;
    var path = "";
    var level = "";
    if (row) {

        for (var i = 0; i < row.length; i++) {
            var cell = row[i];
            if (cell) {
                keys = keys + separator + cell.UPLOAD_KEY;
                values = values + separator + cell.UPLOAD_VALUE;
            }
        }
        if (row[0]) {
            path = row[0].PATH;
            level = row[0].HIERARCHY_LEVEL_ID
        }
    }

    dataUpload.insertLog(keys, values, 1,
        "logImportError - PATH: " + path + separator + "HL_ID: " + level + separator + "DETAIL: " + error.toString(), IMPORT_ID,
        userId);
}

function logImportSuccess(row, IMPORT_ID, userId) {
    var separator = "/**/";
    var keys = "";
    var values = "";
    var path = "";
    var level = "";
    for (var i = 0; i < row.length; i++) {
        var cell = row[i];
        keys = keys + separator + cell.UPLOAD_KEY;
        values = values + separator + cell.UPLOAD_VALUE;
    }

    if (row[0]) {
        path = row[0].PATH;
        level = row[0].HIERARCHY_LEVEL_ID
    }


    return dataUpload.insertLog(keys, values, 0,
        "PATH: " + path + separator + "HL_ID: " + level + separator + "DETAIL: Insert succefully.", IMPORT_ID,
        userId);
}
/*
 "DICTIONARY_L5_L6_ID": "61882",
 "PATH": "CRM-AT17-1AN-SAP_AA02",
 "UPLOAD_KEY": "Show on Calendar",
 "UPLOAD_VALUE": "X\r",
 "HIERARCHY_LEVEL_ID": 0
 * */

function findOption(option, listOptions) {
    for (var i = 0; i < listOptions.length; i++) {
        var obj = listOptions[i];
        if (obj.OPTION_NAME.toUpperCase() == option.NAME.toUpperCase())
            return obj;
    }
    return null;
}

function processCategory(cell) {
    var category = categoryLib.getAllocationCategoryByName(cell.UPLOAD_KEY);
    if (category) {
        var options = categoryLib.getOptionByLevelByCategory(cell.HIERARCHY_LEVEL_ID, category.CATEGORY_ID);
        var parsedOptions = optionParser(cell.UPLOAD_VALUE);
        var parsedOptionsFilter = [];

        for (var i = 0; i < parsedOptions.length; i++) {
            var opt = parsedOptions[i];
            var optionFounded = findOption(opt, options);
            if (optionFounded) {
                parsedOptions[i].OPTION_ID = optionFounded.OPTION_ID;
                parsedOptionsFilter[i] = parsedOptions[i];
            }
        }
        if (parsedOptionsFilter.length) {
            var result = {
                'CATEGORY': category.CATEGORY_ID,
                'OPTIONS': parsedOptionsFilter
            };
            return result;
        }
        else
            return null;
    }
    return null;

}

function optionParser(str) {
    var options = str.split('\u21b5');
    var parseOption = [];
    for (var i = 0; i < options.length; i++) {
        var obj = options[i];
        var parse = obj.trim().split(/ % - /);
        if (parse.length > 1) {

            parseOption[i] = {};
            parseOption[i].NAME = parse[1].trim().replace('\n', "").replace('\"', "");
            parseOption[i].VALUE = parse[0].trim().replace('\n', "").replace('\"', "");

        }
    }
    return parseOption;
}

function getLogByImport(importId) {
    return dataUpload.getLogByImport(importId);
}

function getImports() {
    return dataUpload.getImports();
}

function deleteDataUploadL5L6ByImportId(data, userId) {
    var deleteOk = false;
    //delete all data from L6
    deleteOk = blLevel6.delHl6DataImportByImportId(data.IMPORT_ID);
    deleteOk = deleteOk && blLevel5.delHl5DataImportByImportId(data.IMPORT_ID);

    if (deleteOk)
        deleteOk = updateImportToRollbackState(data.IMPORT_ID, userId);

    return deleteOk;
}

function updateImportToRollbackState(importId, userId) {
    return dataUpload.updateImport(importId, userId) > 0;
}

function level3Processor(userId, arrayPaths, IMPORT_ID) {


    var arrHl = {success: 0, fails: 0, messages: []};

    arrayPaths.forEach(function (obj) {
        try {

            var hl = {};
            var budget = 0;
            hl.IMPORT_ID = IMPORT_ID;
            hl.HIERARCHY_LEVEL_ID = 4;//4 IS HL3
            //get all row by each path
            var row = dataUpload.getDataFromUploadDictionaryByPath(obj.PATH, userId);

            if (validateHl3(row)) {
                hl.ACRONYM = getAcronym(obj.PATH);
                hl.PARENT_ID = dataUpload.getParentIdByPath(obj.PARENT, hierarchyLevel["hl2"]).HL_ID;
                hl.PATH = obj.PATH;

                row.forEach(function (cell) {
                    var fieldMapper = getValue(cell.UPLOAD_KEY);
                    if (cell.UPLOAD_KEY == 'HL3_DESCRIPTION'
                        || cell.UPLOAD_KEY == 'SHOPPING_CART_APPROVER'
                        || cell.UPLOAD_KEY == 'COST_CENTER') {
                        hl[cell.UPLOAD_KEY] = cell.UPLOAD_VALUE;
                    }

                    if (cell.UPLOAD_KEY == 'HL3_FNC_BUDGET_TOTAL') {
                        budget = Number(parseNumberBudget(cell.UPLOAD_VALUE));
                        hl[cell.UPLOAD_KEY] = budget || 0;
                    }

                    if (cell.UPLOAD_KEY == 'ASSOCIATED_USER') {
                        var users = cell.UPLOAD_VALUE.replace(/\"|\r/, "").split(',');
                        var arrUsers = [];
                        if (users.length) {
                            users.forEach(function (user) {
                                var value = getForeignId(
                                    fieldMapper.FOREIGN_TABLE_NAME,
                                    fieldMapper.FOREIGN_COLUMN_REFERENCE,
                                    fieldMapper.FOREIGN_COLUMN_FILTER,
                                    user,
                                    fieldMapper.OTHER_CONDITION, '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];

                                if (value) {
                                    arrUsers.push({USER_ID: value});
                                }
                            });
                        }
                        else
                            arrUsers.push({USER_ID: userId});

                        hl.USERS = arrUsers;
                    }
                });

                //set user
                hl.CREATED_USER_ID = userId;

                if (mapInsertHierarchyLevelInsert[hl.HIERARCHY_LEVEL_ID](hl, userId)) {
                    logImportSuccess(row, IMPORT_ID, userId);
                    arrHl.success++;
                }
            }
        } catch (e) {
            arrHl.fails++;
            if (e && e.code == 456) {
                logImportError(e, IMPORT_ID, userId);
                arrHl.messages.push(e.details);
            } else {
                logImportAnotherError(obj.PATH, obj.HIERARCHY_LEVEL_ID, e, IMPORT_ID, userId);
                //throw e;
            }

        }
    });

    return arrHl;
}

function validateHl3(row) {
    return true;
    var parent;
    var error = ErrorLib.getErrors().ImportError("", "", "");
    error.row = row;

    row.forEach(function (cell) {

        var acronym = getAcronym(cell.PATH);
        var parent = cell.PARENT;

        if (!dataUpload.getParentIdByPath(parent, hierarchyLevel["hl2"])) {
            error.details = "The parent doesn't exist";
            throw error;
        }

        if (acronym.length != 3) {
            error.details = "The Acronym must have 3 characters.";
            throw error;
        }


        if (cell.UPLOAD_KEY == "HL3_DESCRIPCION") {
            if (cell.UPLOAD_VALUE.length <= 0) {
                error.details = "The description is mandatory.";
                throw error;
            }
        }

    });


    return true;

}

function validateHl2(row) {
    var parent;
    var error = ErrorLib.getErrors().ImportError("", "", "");
    error.row = row;

    row.forEach(function (cell) {
        var acronym = getAcronym(cell.PATH);
        var parent = cell.PARENT;//path for parent hl1

        if (!dataUpload.getParentIdByPath(parent, hierarchyLevel["hl1"])) {
            error.details = "The parent doesn't exist";
            throw error;
        }

        if (acronym.length != 2) {
            error.details = "The Acronym must have 2 characters.";
            throw error;
        }

        if (cell.UPLOAD_KEY == "ORGANIZATION_NAME") {
            if (cell.UPLOAD_VALUE.length <= 0) {
                error.details = "Organization Name is mandatory.";
                throw error;
            }
        }
    });
    return true;
}

function kpiProcessor(userId, arrayPaths, IMPORT_ID) {
    var arrHl = {success: 0, fails: 0, messages: []};

    var HLs = [];
    arrayPaths.forEach(function (obj) {
        try {

            var hl = {};

            hl.PATH = obj.PATH;
            hl.TARGET_KPIS = {KPIS: []};

            //get all row by each path
            var rows = dataUpload.getDataFromUploadDictionaryByPath(obj.PATH, userId);

            if (validateKPI(rows)) {

                var eod = {};
                eod.OUTCOMES_ID = null;
                eod.VOLUME_VALUE = null;
                eod.EURO_VALUE = null;

                rows.forEach(function (cell) {
                    hl.HIERARCHY_LEVEL_ID = getLevelString(cell.HIERARCHY_LEVEL_ID);
                    var fieldMapper = getValue(cell.UPLOAD_KEY);

                    if (cell.UPLOAD_KEY == 'EXPECTED_OUTCOME_OPTION_NAME' || cell.UPLOAD_KEY == 'EXPECTED_OUTCOME_NAME') {
                        if (fieldMapper && cell.UPLOAD_VALUE != '') {
                            var value = getForeignId(
                                fieldMapper.FOREIGN_TABLE_NAME,
                                fieldMapper.FOREIGN_COLUMN_REFERENCE,
                                fieldMapper.FOREIGN_COLUMN_FILTER,
                                cell.UPLOAD_VALUE,
                                fieldMapper.OTHER_CONDITION, '')[fieldMapper.FOREIGN_COLUMN_REFERENCE];
                            var name = cell.UPLOAD_KEY == 'EXPECTED_OUTCOME_OPTION_NAME' ? 'OUTCOMES_ID' : 'OUTCOMES_TYPE_ID';
                            eod[name]= value;
                        }
                    }
                    else if (cell.UPLOAD_KEY == 'EXPECTED_OUTCOME_OPTION_VOLUME') {

                        if (cell.UPLOAD_VALUE != '') {
                            eod.VOLUME_VALUE = cell.UPLOAD_VALUE;
                        }
                    }
                    else if (cell.UPLOAD_KEY == 'EXPECTED_OUTCOME_OPTION_VALUE') {

                        if (cell.UPLOAD_VALUE != '') {
                            eod.EURO_VALUE = cell.UPLOAD_VALUE;
                        }
                    }
                });

                hl.TARGET_KPIS.KPIS.push(eod);
                hl[hl.HIERARCHY_LEVEL_ID + '_ID'] = dataUpload.getParentIdByPath(getLevelKPI(obj.PATH).PATH, hierarchyLevel[hl.HIERARCHY_LEVEL_ID.toLocaleLowerCase()]).HL_ID;

                HLs.push(hl);
            }
        } catch (e) {
            arrHl.fails++;
            if (e && e.code == 456) {
                logImportError(e, IMPORT_ID, userId);
                arrHl.messages.push(e.details);
            } else {
               logImportAnotherError(obj.PATH, obj.HIERARCHY_LEVEL_ID, e, IMPORT_ID, userId);

            }

        }
    });

    var targetKpis = parseKpiForUpload(HLs);

    return insertKpi(targetKpis, userId, IMPORT_ID, arrHl);
}

function validateKPI(row) {
    var parent;
    var error = ErrorLib.getErrors().ImportError("", "uploadLib/validateKPI/", "");
    error.row = row;

    //validate expected outcomes ids
    var HL;

    HL = dataUpload.getParentIdByPath(getLevelKPI(row[0].PATH).PATH, row[0].HIERARCHY_LEVEL_ID).HL_ID;
    if (!HL) {
        error.details = "The CRM ID doesn't exist for an L1, L2 or L3";
        throw error;
    }

    return true;
}

function insertKpi(hlList, userId, IMPORT_ID, arrHl) {

    var updateExpectedOutcomesMap = {
        HL1: blLevel1,
        HL2: blLevel2,
        HL3: blLevel3
    };
    hlList.forEach(function (hl) {
        var hl_length = hl.TARGET_KPIS.KPIS.length;

        try {

            var businessLayer = updateExpectedOutcomesMap[hl.HIERARCHY_LEVEL_ID];

            if(businessLayer){
                businessLayer.updateExpectedOutcomes(hl, userId, true);
            } else {
                throw ErrorLib.getErrors().ImportError("", "", 'INCORRECT LEVEL');
            }

            arrHl.success = arrHl.success + hl_length;
            logImportKPISuccess(hl, IMPORT_ID, userId);
        }
        catch (e) {
            throw e;
            arrHl.fails = arrHl.fails +  hl_length;
            if (e && e.code == 456) {
                logImportError(e, IMPORT_ID, userId);
                arrHl.messages.push(e.details);
            } else {
                logImportAnotherError(hl.PATH , hl.HIERARCHY_LEVEL_ID, e, IMPORT_ID, userId);
            }
        }
    });


    return arrHl;

}

function logImportKPISuccess(row, IMPORT_ID, userId) {
    var separator = "/**/";
    var keys = "";
    var values = "";
    var hl_id = "";
    var level = "";


    if (row) {
        hl_id = (row.IN_HL2_ID || 0) + (row.IN_HL3_ID || 0);
        level = row.HIERARCHY_LEVEL_ID;
        Object.keys(row).forEach(function (key) {
            keys = keys + separator + key;
            values = values + separator + JSON.stringify(row[key]);
        });
    }


    dataUpload.insertLog(keys, values, 0,
        "HL_ID: " + hl_id + separator + "Level: " + level + separator + "DETAIL: Insert succefully.", IMPORT_ID,
        userId);
}

function parseKpiForUpload(kpis){
    var result = {};
    kpis.forEach(function (kpi) {
        if(!result[kpi.PATH]){
            result[kpi.PATH] = JSON.parse(JSON.stringify(kpi));
        } else {
            result[kpi.PATH].TARGET_KPIS.KPIS.push(kpi.TARGET_KPIS.KPIS[0])
        }
    });

    return util.objectToArray(result);
}
/**/

//   HL2_1
//        EO_1
//       DT_1
//          DT_2
//        EO_2
//          DT_4
//  HL3_1
//         EO_2
//          DT_6

