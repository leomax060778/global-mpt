$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
// SEGMENTATION_MARKET Section
var INS_SEGMENTATION_MARKET = "INS_SEGMENTATION_MARKET";
var UPD_SEGMENTATION_MARKET = "UPD_SEGMENTATION_MARKET";
var DEL_SEGMENTATION_MARKET = "DEL_SEGMENTATION_MARKET";
var GET_SEGMENTATION_MARKET_BY_ID = "GET_SEGMENTATION_MARKET_BY_ID";
var GET_SEGMENTATION_MARKET_BY_NAME = "GET_SEGMENTATION_MARKET_BY_NAME";
var GET_ALL_SEGMENTATION_MARKET = "GET_ALL_SEGMENTATION_MARKET";
var GET_COUNT_SEGMENTATION_MARKET_IN_USE_BY_ID = "GET_COUNT_OBJECTIVES_IN_USE_BY_ID"; //todo
var GET_COUNT_FORM_SEGMENTATION_MARKET_BY_SEGMENTATION_MARKET_ID = "GET_COUNT_FORM_SEGMENTATION_MARKET_BY_SEGMENTATION_MARKET_ID";

/**SEGMENTATION SALES********************/
var INS_SEGMENTATION_SALES = "INS_SEGMENTATION_SALES";
var UPD_SEGMENTATION_SALES = "UPD_SEGMENTATION_SALES";
var DEL_SEGMENTATION_SALES = "DEL_SEGMENTATION_SALES";
var GET_SEGMENTATION_SALES_BY_ID = "GET_SEGMENTATION_SALES_BY_ID";
var GET_SEGMENTATION_SALES_BY_NAME = "GET_SEGMENTATION_SALES_BY_NAME";
var GET_ALL_SEGMENTATION_SALES = "GET_ALL_SEGMENTATION_SALES";
var GET_SEGMENTATION_SALES_BY_PARENT_ID = "GET_SEGMENTATION_SALES_BY_PARENT_ID";
/********************************************/

/**SEGMENTATION REGION BUYING********************/
var INS_SEGMENTATION_REGION_BUYING = "INS_SEGMENTATION_REGION_BUYING";
var UPD_SEGMENTATION_REGION_BUYING = "UPD_SEGMENTATION_REGION_BUYING";
var DEL_SEGMENTATION_REGION_BUYING = "DEL_SEGMENTATION_REGION_BUYING";
var GET_SEGMENTATION_REGION_BUYING_BY_ID = "GET_SEGMENTATION_REGION_BUYING_BY_ID";
var GET_SEGMENTATION_REGION_BUYING_BY_NAME = "GET_SEGMENTATION_REGION_BUYING_BY_NAME";
var GET_ALL_SEGMENTATION_REGION_BUYING = "GET_ALL_SEGMENTATION_REGION_BUYING";
var GET_COUNT_FORM_SEGMENTATION_REGION_BUYING_BY_SEGMENTATION_REGION_BUYING_ID = "GET_COUNT_FORM_SEGMENTATION_REGION_BUYING_BY_SEGMENTATION_REGION_BUYING_ID";
/********************************************/

/**SEGMENTATION TACTIC********************/
var INS_SEGMENTATION_TACTIC = "INS_SEGMENTATION_TACTIC";
var UPD_SEGMENTATION_TACTIC = "UPD_SEGMENTATION_TACTIC";
var DEL_SEGMENTATION_TACTIC = "DEL_SEGMENTATION_TACTIC";
var GET_SEGMENTATION_TACTIC_BY_ID = "GET_SEGMENTATION_TACTIC_BY_ID";
var GET_SEGMENTATION_TACTIC_BY_NAME = "GET_SEGMENTATION_TACTIC_BY_NAME";
var GET_ALL_SEGMENTATION_TACTIC = "GET_ALL_SEGMENTATION_TACTIC";
var GET_COUNT_FORM_SEGMENTATION_TACTIC_BY_SEGMENTATION_TACTIC_ID = "GET_COUNT_FORM_SEGMENTATION_TACTIC_BY_SEGMENTATION_TACTIC_ID";
/********************************************/

/**SEGMENTATION FUNCTION********************/
var INS_SEGMENTATION_FUNCTION = "INS_SEGMENTATION_FUNCTION";
var UPD_SEGMENTATION_FUNCTION = "UPD_SEGMENTATION_FUNCTION";
var DEL_SEGMENTATION_FUNCTION = "DEL_SEGMENTATION_FUNCTION";
var GET_SEGMENTATION_FUNCTION_BY_ID = "GET_SEGMENTATION_FUNCTION_BY_ID";
var GET_SEGMENTATION_FUNCTION_BY_NAME = "GET_SEGMENTATION_FUNCTION_BY_NAME";
var GET_ALL_SEGMENTATION_FUNCTION = "GET_ALL_SEGMENTATION_FUNCTION";
var GET_SEGMENTATION_FUNCTION_BY_PARENT_ID = "GET_SEGMENTATION_FUNCTION_BY_PARENT_ID";
var GET_COUNT_FORM_SEGMENTATION_FUNCTION_BY_SEGMENTATION_FUNCTION_ID = "GET_COUNT_FORM_SEGMENTATION_FUNCTION_BY_SEGMENTATION_FUNCTION_ID";
/********************************************/

/**SEGMENTATION DEPARTMENT********************/
var INS_SEGMENTATION_DEPARTMENT = "INS_SEGMENTATION_DEPARTMENT";
var UPD_SEGMENTATION_DEPARTMENT = "UPD_SEGMENTATION_DEPARTMENT";
var DEL_SEGMENTATION_DEPARTMENT = "DEL_SEGMENTATION_DEPARTMENT";
var GET_SEGMENTATION_DEPARTMENT_BY_ID = "GET_SEGMENTATION_DEPARTMENT_BY_ID";
var GET_SEGMENTATION_DEPARTMENT_BY_NAME = "GET_SEGMENTATION_DEPARTMENT_BY_NAME";
var GET_ALL_SEGMENTATION_DEPARTMENT = "GET_ALL_SEGMENTATION_DEPARTMENT";
var GET_SEGMENTATION_DEPARTMENT_BY_PARENT_ID = "GET_SEGMENTATION_DEPARTMENT_BY_PARENT_ID";
var GET_COUNT_FORM_SEGMENTATION_DEPARTMENT_BY_SEGMENTATION_DEPARTMENT_ID = "GET_COUNT_FORM_SEGMENTATION_DEPARTMENT_BY_SEGMENTATION_DEPARTMENT_ID";
/********************************************/

/* SEGMENTATION INDUSTRIES - CAGETORY OPTION*********/
var INS_SEGMENTATION_CATEGORY_OPTION = "INS_SEGMENTATION_CATEGORY_OPTION";
var UPD_SEGMENTATION_CATEGORY_OPTION = "UPD_SEGMENTATION_CATEGORY_OPTION";
var DEL_SEGMENTATION_CATEGORY_OPTION = "DEL_SEGMENTATION_CATEGORY_OPTION";
var GET_ALL_SEGMENTATION_CATEGORY_OPTION = "GET_ALL_SEGMENTATION_CATEGORY_OPTION";
var GET_SEGMENTATION_CATEGORY_OPTION_BY_CATEGORY_ID = "GET_SEGMENTATION_CATEGORY_OPTION_BY_CATEGORY_ID";
var GET_SEGMENTATION_CATEGORY_ID_BY_ALLOCATION_ID = "GET_SEGMENTATION_CATEGORY_ID_BY_ALLOCATION_ID";
var GET_SEGMENTATION_CATEGORY_OPTION_TO_INSERT = "GET_SEGMENTATION_CATEGORY_OPTION_TO_INSERT";
var GET_SEGMENTATION_CATEGORY_OPTION_TO_DELETE = "GET_SEGMENTATION_CATEGORY_OPTION_TO_DELETE";
var GET_COUNT_FORM_SEGMENTATION_INDUSTRY_OPTION_BY_SEGMENTATION_INDUSTRY_OPTION_ID = "GET_COUNT_FORM_SEGMENTATION_INDUSTRY_OPTION_BY_SEGMENTATION_INDUSTRY_OPTION_ID";


/****************************************************/

/**SEGMENTATION ITEM INTEREST********************/
var INS_SEGMENTATION_ITEM_INTEREST = "INS_SEGMENTATION_ITEM_INTEREST";
var UPD_SEGMENTATION_ITEM_INTEREST = "UPD_SEGMENTATION_ITEM_INTEREST";
var DEL_SEGMENTATION_ITEM_INTEREST = "DEL_SEGMENTATION_ITEM_INTEREST";
var GET_SEGMENTATION_ITEM_INTEREST_BY_ID = "GET_SEGMENTATION_ITEM_INTEREST_BY_ID";
var GET_SEGMENTATION_ITEM_INTEREST_BY_NAME = "GET_SEGMENTATION_ITEM_INTEREST_BY_NAME";
var GET_ALL_SEGMENTATION_ITEM_INTEREST = "GET_ALL_SEGMENTATION_ITEM_INTEREST";
var GET_COUNT_FORM_SEGMENTATION_ITEM_INTEREST_BY_SEGMENTATION_ITEM_INTEREST_ID = "GET_COUNT_FORM_SEGMENTATION_ITEM_INTEREST_BY_SEGMENTATION_ITEM_INTEREST_ID";
/********************************************/

var GET_NON_ADMINISTRABLE_FORM_FIELD_DATA = "GET_NON_ADMINISTRABLE_FORM_FIELD_DATA";
var GET_SEGMENTATION_FORM_ID_BY_HL5_ID = "GET_SEGMENTATION_FORM_ID_BY_HL5_ID";
var GET_SEGMENTATION_FORM_ID_BY_HL5_ID_OPTION_ID = "GET_SEGMENTATION_FORM_ID_BY_HL5_ID_OPTION_ID";
var GET_SEGMENTATION_FORM_BY_HL5_ID = 'GET_SEGMENTATION_FORM_BY_HL5_ID';
var GET_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID = "GET_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID";
var GET_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID = "GET_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID";
var GET_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID = "GET_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID";
var GET_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID = "GET_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID";
var GET_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID = "GET_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID";
var GET_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID = "GET_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID";
var GET_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID = "GET_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID";

var INS_SEGMENTATION_FORM = 'INS_SEGMENTATION_FORM';
var INS_SEGMENTATION_FORM_MARKET = "INS_SEGMENTATION_FORM_MARKET";
var INS_SEGMENTATION_FORM_SALE = "INS_SEGMENTATION_FORM_SALE";
var INS_SEGMENTATION_FORM_SEGMENTATION_INDUSTRY_OPTION = "INS_SEGMENTATION_FORM_SEGMENTATION_INDUSTRY_OPTION";
var INS_SEGMENTATION_FORM_FUNCTION = "INS_SEGMENTATION_FORM_FUNCTION";
var INS_SEGMENTATION_FORM_DEPARTMENT = "INS_SEGMENTATION_FORM_DEPARTMENT";
var INS_SEGMENTATION_FORM_TACTIC = "INS_SEGMENTATION_FORM_TACTIC";
var INS_SEGMENTATION_FORM_ITEM_OF_INTEREST = "INS_SEGMENTATION_FORM_ITEM_OF_INTEREST";

var UPD_SEGMENTATION_FORM = 'UPD_SEGMENTATION_FORM';

var DEL_SEGMENTATION_FORM_BY_SEGMENTATION_FORM_ID = 'DEL_SEGMENTATION_FORM_BY_SEGMENTATION_FORM_ID';
var DEL_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID = "DEL_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID";
var DEL_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID = "DEL_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID";
var DEL_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID = "DEL_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID";
var DEL_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID = "DEL_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID";
var DEL_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID = "DEL_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID";
var DEL_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID = "DEL_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID";
var DEL_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID = "DEL_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID";

var DEL_HARD_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID = "DEL_HARD_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID";
var DEL_HARD_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID = "DEL_HARD_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID";
var DEL_HARD_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID = "DEL_HARD_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID";
var DEL_HARD_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID = "DEL_HARD_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID";
var DEL_HARD_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID = "DEL_HARD_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID";
var DEL_HARD_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID = "DEL_HARD_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID";
var DEL_HARD_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID = "DEL_HARD_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID";

function getAllSegmentationMarket() {
    var parameters = {};
    var list = db.executeProcedureManual(GET_ALL_SEGMENTATION_MARKET, parameters);
    return db.extractArray(list.out_result);
}

function insertSegmentationMarket(name, userId){
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_SEGMENTATION_MARKET, parameters, "out_result");
}

function updateSegmentationMarket(segmentationMarketId, name, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_MARKET_ID = segmentationMarketId;
    parameters.IN_NAME = name;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_SEGMENTATION_MARKET, parameters, "out_result");
}

function deleteSegmentationMarket(segmentationMarketId, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_MARKET_ID = segmentationMarketId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_MARKET, parameters, "out_result");
}

function getSegmentationMarketByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_SEGMENTATION_MARKET_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getSegmentationMarketById(segmentationMarketId){
    var parameters = {'IN_SEGMENTATION_MARKET_ID': segmentationMarketId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_MARKET_BY_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return {};
}
function countRelatedSegmentationMarket(id){
    var parameters = {};
    parameters.in_segmentation_market_id = id;
    return db.executeScalarManual(GET_COUNT_FORM_SEGMENTATION_MARKET_BY_SEGMENTATION_MARKET_ID, parameters, "out_result");
}

/**************SEGMENTATION SALES*****************/

function getAllSegmentationSales(){
    var parameters = {};
    var list = db.executeProcedureManual(GET_ALL_SEGMENTATION_SALES, parameters);
    return db.extractArray(list.out_result);
}

function insertSegmentationSales(name, parentId,userId){
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_PARENT_ID = parentId || 0;
    parameters.IN_CREATED_USER_ID = Number(userId);

    return db.executeScalarManual(INS_SEGMENTATION_SALES, parameters, "out_result");
}

function updateSegmentationSales(segmentationSalesId, name, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_SALES_ID = segmentationSalesId;
    parameters.IN_NAME = name;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_SEGMENTATION_SALES, parameters, "out_result");
}

function deleteSegmentationSales(segmentationSalesId, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_SALES_ID = segmentationSalesId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_SALES, parameters, "out_result");
}

function getSegmentationSalesByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_SEGMENTATION_SALES_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getSegmentationSalesById(segmentationSalesId){
    var parameters = {'IN_SEGMENTATION_SALES_ID': segmentationSalesId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_SALES_BY_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return {};
}

function getSegmentationSalesByParentId(segmentationSalesId){
    var parameters = {'IN_PARENT_ID': segmentationSalesId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_SALES_BY_PARENT_ID, parameters);
    return db.extractArray(list.out_result);
}

/********END SEGMENTATION SALES***************/

/**************SEGMENTATION REGION BUYING*****************/

function getAllSegmentationRegionBuying(){
    var parameters = {};
    var list = db.executeProcedureManual(GET_ALL_SEGMENTATION_REGION_BUYING, parameters);
    return db.extractArray(list.out_result);
}

function insertSegmentationRegionBuying(name, userId){
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_SEGMENTATION_REGION_BUYING, parameters, "out_result");
}

function updateSegmentationRegionBuying(segmentationRegionBuyingId, name, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_REGION_BUYING_ID = segmentationRegionBuyingId;
    parameters.IN_NAME = name;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_SEGMENTATION_REGION_BUYING, parameters, "out_result");
}

function deleteSegmentationRegionBuying(segmentationRegionBuyingId, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_REGION_BUYING_ID = segmentationRegionBuyingId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_REGION_BUYING, parameters, "out_result");
}

function getSegmentationRegionBuyingByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_SEGMENTATION_REGION_BUYING_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getSegmentationRegionBuyingById(segmentationRegionBuyingId){
    var parameters = {'IN_SEGMENTATION_REGION_BUYING_ID': segmentationRegionBuyingId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_REGION_BUYING_BY_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return {};
}
function countRelatedSegmentationRegionBuying(id){
    var parameters = {};
    parameters.in_segmentation_region_buying_id = id;
    return db.executeScalarManual(GET_COUNT_FORM_SEGMENTATION_REGION_BUYING_BY_SEGMENTATION_REGION_BUYING_ID, parameters, "out_result");
}
/********END SEGMENTATION REGION_BUYING***************/

/**************SEGMENTATION FUNCTION*****************/

function getAllSegmentationFunction(){
    var parameters = {};
    var list = db.executeProcedureManual(GET_ALL_SEGMENTATION_FUNCTION, parameters);
    return db.extractArray(list.out_result);
}

/*function getSegmentationFunctionByParentId(segmentationFunctionId){
    var parameters = {'IN_PARENT_ID': Number(segmentationFunctionId)};
    var list = db.executeProcedureManual(GET_SEGMENTATION_FUNCTION_BY_PARENT_ID, parameters);
    return db.extractArray(list.out_result);
}*/

function insertSegmentationFunction(name,parentId, userId){
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_PARENT_ID = parentId || 0;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_SEGMENTATION_FUNCTION, parameters, "out_result");
}

function updateSegmentationFunction(segmentationFunctionId, name,  userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_FUNCTION_ID = segmentationFunctionId;
    parameters.IN_NAME = name;

    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_SEGMENTATION_FUNCTION, parameters, "out_result");
}

function deleteSegmentationFunction(segmentationFunctionId, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_FUNCTION_ID = segmentationFunctionId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_FUNCTION, parameters, "out_result");
}

function getSegmentationFunctionByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_SEGMENTATION_FUNCTION_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getSegmentationFunctionById(segmentationFunctionId){
    var parameters = {'IN_SEGMENTATION_FUNCTION_ID': segmentationFunctionId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_FUNCTION_BY_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return {};
}

function getSegmentationFunctionByParentId(segmentationFunctionId){
    var parameters = {'IN_PARENT_ID': Number(segmentationFunctionId) || 0};
    var list = db.executeProcedureManual(GET_SEGMENTATION_FUNCTION_BY_PARENT_ID, parameters);
    return db.extractArray(list.out_result);
}
function countRelatedSegmentationFunction(id){
    var parameters = {};
    parameters.in_segmentation_function_id = id;
    return db.executeScalarManual(GET_COUNT_FORM_SEGMENTATION_FUNCTION_BY_SEGMENTATION_FUNCTION_ID, parameters, "out_result");
}
/********END SEGMENTATION FUNCTION***************/

/**************SEGMENTATION DEPARTMENT*****************/

function getAllSegmentationDepartment(){
    var parameters = {};
    var list = db.executeProcedureManual(GET_ALL_SEGMENTATION_DEPARTMENT, parameters);
    return db.extractArray(list.out_result);
}

function getSegmentationDepartmentByParentId(segmentationDepartmentid){
    var parameters = {'IN_PARENT_ID': segmentationDepartmentid};
    var list = db.executeProcedureManual(GET_SEGMENTATION_DEPARTMENT_BY_PARENT_ID, parameters);
    return db.extractArray(list.out_result);
}

function insertSegmentationDepartment(name,parentId, userId){
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_PARENT_ID = parentId || 0;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_SEGMENTATION_DEPARTMENT, parameters, "out_result");
}

function updateSegmentationDepartment(segmentationDepartmentId, name, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_DEPARTMENT_ID = segmentationDepartmentId;
    parameters.IN_NAME = name;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_SEGMENTATION_DEPARTMENT, parameters, "out_result");
}

function deleteSegmentationDepartment(segmentationDepartmentId, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_DEPARTMENT_ID = segmentationDepartmentId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_DEPARTMENT, parameters, "out_result");
}

function getSegmentationDepartmentByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_SEGMENTATION_DEPARTMENT_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getSegmentationDepartmentById(segmentationDepartmentId){
    var parameters = {'IN_SEGMENTATION_DEPARTMENT_ID': segmentationDepartmentId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_DEPARTMENT_BY_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return {};
}

function countRelatedSegmentationDepartment(id){
    var parameters = {};
    parameters.in_segmentation_department_id = id;
    return db.executeScalarManual(GET_COUNT_FORM_SEGMENTATION_DEPARTMENT_BY_SEGMENTATION_DEPARTMENT_ID, parameters, "out_result");
}
/********END SEGMENTATION DEPARTMENT***************/

/***********Segmentation Category Option***********/
function insertSegmentationCategoryOption(categoryId, name, userId) {
    var params = {
        'in_segmentation_category_id': categoryId,
        'in_name': name,
        'in_user_id': userId
    };

    return db.executeScalarManual(INS_SEGMENTATION_CATEGORY_OPTION, params, 'out_result');
}

function updateSegmentationCategoryOption(segmentationCategoryOptionId, name, userId) {
    var params = {
        'in_segmentation_category_option_id': segmentationCategoryOptionId,
        'in_name': name,
        'in_user_id': userId
    };
    return db.executeScalarManual(UPD_SEGMENTATION_CATEGORY_OPTION, params, 'out_result');
}

function deleteSegmentationCategoryOption(segmentationCategoryOptionId, userId){
    var parameters = {};
    parameters.in_segmentation_category_option_id = segmentationCategoryOptionId;
    parameters.in_modified_user_id = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_CATEGORY_OPTION, parameters, "out_result");
}

function getAllSegmentationCategoryOption(){
        var rdo = db.executeProcedureManual(GET_ALL_SEGMENTATION_CATEGORY_OPTION,{});
        return db.extractArray(rdo.out_result);
}

function getSegmentationCategoryOptionToInsert(allocationOptionList) {
    var rdo = db.executeProcedureManual(GET_SEGMENTATION_CATEGORY_OPTION_TO_INSERT,allocationOptionList);
    return db.extractArray(rdo.out_result);
}

function getSegmentationCategoryOptionToDelete(optionToDelete){
    var rdo = db.executeProcedureManual(GET_SEGMENTATION_CATEGORY_OPTION_TO_DELETE,optionToDelete);
    return db.extractArray(rdo.out_result);
}

function getSegmentationCategoryOptionByCategoryId(allocation_category_id){
    var rdo = db.executeProcedureManual(GET_SEGMENTATION_CATEGORY_OPTION_BY_CATEGORY_ID,{'in_allocation_category_id': allocation_category_id });
    return db.extractArray(rdo.out_result);
}

function getSegmentationCategoryIdByAllocationId(allocation_category_id){
    return db.executeScalarManual(GET_SEGMENTATION_CATEGORY_ID_BY_ALLOCATION_ID,{'in_allocation_category_id':allocation_category_id}, 'out_result');
}

function countRelatedSegmentationIndustryOption(id){
    var parameters = {};
    parameters.in_segmentation_industry_option_id = id;
    return db.executeScalarManual(GET_COUNT_FORM_SEGMENTATION_INDUSTRY_OPTION_BY_SEGMENTATION_INDUSTRY_OPTION_ID, parameters, "out_result");
}
/**************SEGMENTATION ITEM OF INTEREST*****************/

function getAllSegmentationItemInterest(){
    var parameters = {};
    var list = db.executeProcedureManual(GET_ALL_SEGMENTATION_ITEM_INTEREST, parameters);
    return db.extractArray(list.out_result);
}

function insertSegmentationItemInterest(name, userId){
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_SEGMENTATION_ITEM_INTEREST, parameters, "out_result");
}

function updateSegmentationItemInterest(segmentationItemInterestId, name, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_ITEM_INTEREST_ID = segmentationItemInterestId;
    parameters.IN_NAME = name;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_SEGMENTATION_ITEM_INTEREST, parameters, "out_result");
}

function deleteSegmentationItemInterest(segmentationItemInterestId, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_ITEM_INTEREST_ID = segmentationItemInterestId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_ITEM_INTEREST, parameters, "out_result");
}

function getSegmentationItemInterestByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_SEGMENTATION_ITEM_INTEREST_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getSegmentationItemInterestById(segmentationItemInterestId){
    var parameters = {'IN_SEGMENTATION_ITEM_INTEREST_ID': segmentationItemInterestId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_ITEM_INTEREST_BY_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return {};
}

function countRelatedSegmentationItemInterest(id){
    var parameters = {};
    parameters.in_segmentation_item_interest_id = id;
    return db.executeScalarManual(GET_COUNT_FORM_SEGMENTATION_ITEM_INTEREST_BY_SEGMENTATION_ITEM_INTEREST_ID, parameters, "out_result");
}
/********END SEGMENTATION ITEM OF INTEREST***************/

function getSegmentationNonAdministrableFields(){
    var result = db.executeProcedureManual(GET_NON_ADMINISTRABLE_FORM_FIELD_DATA, {});

    return {
        COUNTRY: db.extractArray(result.out_country),
        PARTNER: db.extractArray(result.out_partner),
        UNQUALIFIED_ADDRESS: db.extractArray(result.out_unqualified_address),
        ACCOUNT_WITH_ACTIVE_PIPELINE: db.extractArray(result.out_account_with_active_pipeline),
        ACCOUNT_WITH_ACTIVE_LEAD: db.extractArray(result.out_account_with_active_lead),
        MATCH_CRITERIA: db.extractArray(result.out_match_criteria),
        TARGET_SELECT_CRITERIA: db.extractArray(result.out_target_select_criteria),
        COMPETITOR: db.extractArray(result.out_competitor)
    }
}

function getSegmentationFormByHl5Id(hl5Id){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_BY_HL5_ID, {in_hl5_id: hl5Id}).out_result
    );
}

function getSegmentationFormIdByHl5Id(hl5Id){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_ID_BY_HL5_ID, {in_hl5_id: hl5Id}).out_result
    );
}

function getSegmentationFormByHl5IdOptionId(hl5Id, optionIds){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_ID_BY_HL5_ID_OPTION_ID, {in_hl5_id: hl5Id, optionIds: optionIds}).out_result
    );
}

function getSegmentationFormMarketBySegmentationFormId(segmentationFormId){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}).out_result
    );
}

function getSegmentationFormSaleBySegmentationFormId(segmentationFormId){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}).out_result
    );
}

function getSegmentationFormIndustryBySegmentationFormId(segmentationFormId){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}).out_result
    );
}

function getSegmentationFormFunctionBySegmentationFormId(segmentationFormId){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}).out_result
    );
}

function getSegmentationFormDepartmentBySegmentationFormId(segmentationFormId){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}).out_result
    );
}

function getSegmentationFormTacticBySegmentationFormId(segmentationFormId){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}).out_result
    );
}

function getSegmentationFormItemOfInterestBySegmentationFormId(segmentationFormId){
    return db.extractArray(
        db.executeProcedureManual(GET_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}).out_result
    );
}


function insertSegmentationForm(formStatusDetailId,serviceRequestCategoryOptionLevelId,hl5Id, regionId, subregionId, country, hl4Id, targetGroupApprovalWorkflow, matchingRequired,
                                matchCriteriaId, numberOfRecordNeedMatching, targetSelectCriteriaId, specialNote, attachmentId, revenueRangeFrom,
                                revenueRangeTo, currencyId, numberOfEmployeeFrom, numberOfEmployeeTo, customerStatusId, regionalBuyingClassificationId,
                                competitorId, partnerId, unqualifiedAddressId, accountWithActivePipelineId, accountWithActiveLeadId, contactDetail,
                                maxContactPerOrganization, excludeContacsTouchedByTelemarketing, applySalePlayForTarget, applyPredictiveAnalyticsForTarget,
                                acceptTermsState, userId, summary) {
    var parameters = {
        in_form_status_detail_id: formStatusDetailId,
        in_service_request_category_option_level_id: serviceRequestCategoryOptionLevelId,
        in_hl5_id: hl5Id,
        in_region_id: regionId,
        in_subregion_id: subregionId,
        in_country: country,
        in_hl4_id: hl4Id,
        in_target_group_approval_workflow: targetGroupApprovalWorkflow,
        in_matching_required: matchingRequired,
        in_match_criteria_id: matchCriteriaId,
        in_number_of_record_need_matching: numberOfRecordNeedMatching,
        in_target_select_criteria_id: targetSelectCriteriaId,
        in_special_note: specialNote,
        in_attachment_id: attachmentId,
        in_revenue_range_from: revenueRangeFrom,
        in_revenue_range_to: revenueRangeTo,
        in_currency_id: currencyId,
        in_number_of_employee_from: numberOfEmployeeFrom,
        in_number_of_employee_to: numberOfEmployeeTo,
        in_customer_status_id: customerStatusId,
        in_regional_buying_classification_id: regionalBuyingClassificationId,
        in_competitor_id: competitorId,
        in_partner_id: partnerId,
        in_unqualified_address_id: unqualifiedAddressId,
        in_account_with_active_pipeline_id: accountWithActivePipelineId,
        in_account_with_active_lead_id: accountWithActiveLeadId,
        in_contact_detail: contactDetail,
        in_max_contact_per_organization: maxContactPerOrganization,
        in_exclude_contacs_touched_by_telemarketing: excludeContacsTouchedByTelemarketing,
        in_apply_sale_play_for_target: applySalePlayForTarget,
        in_apply_predictive_analytics_for_target: applyPredictiveAnalyticsForTarget,
        in_accept_terms_state: acceptTermsState,
        in_user_id: userId,
        in_summary: summary
    };

    return db.executeScalarManual(INS_SEGMENTATION_FORM, parameters, "out_result");
}

function insertSegmentationFormMarket(data) {
    return db.executeScalarManual(INS_SEGMENTATION_FORM_MARKET, data, "out_result");
}

function insertSegmentationFormSale(data) {
    return db.executeScalarManual(INS_SEGMENTATION_FORM_SALE, data, "out_result");
}

function insertSegmentationFormIndustry(data) {
    return db.executeScalarManual(INS_SEGMENTATION_FORM_SEGMENTATION_INDUSTRY_OPTION, data, "out_result");
}

function insertSegmentationFormFunction(data) {
    return db.executeScalarManual(INS_SEGMENTATION_FORM_FUNCTION, data, "out_result");
}

function insertSegmentationFormDepartment(data) {
    return db.executeScalarManual(INS_SEGMENTATION_FORM_DEPARTMENT, data, "out_result");
}

function insertSegmentationFormTactic(data) {
    return db.executeScalarManual(INS_SEGMENTATION_FORM_TACTIC, data, "out_result");
}

function insertSegmentationFormItemOfInterest(data) {

    return db.executeScalarManual(INS_SEGMENTATION_FORM_ITEM_OF_INTEREST, data, "out_result");
}

function updateSegmentationForm(segmentationFormId, formStatusDetailId, hl5Id, regionId, subregionId, country, hl4Id, targetGroupApprovalWorkflow, matchingRequired,
                                matchCriteriaId, numberOfRecordNeedMatching, targetSelectCriteriaId, specialNote, attachmentId, revenueRangeFrom,
                                revenueRangeTo, currencyId, numberOfEmployeeFrom, numberOfEmployeeTo, customerStatusId, regionalBuyingClassificationId,
                                competitorId, partnerId, unqualifiedAddressId, accountWithActivePipelineId, accountWithActiveLeadId, contactDetail,
                                maxContactPerOrganization, excludeContacsTouchedByTelemarketing, applySalePlayForTarget, applyPredictiveAnalyticsForTarget,
                                acceptTermsState, userId, summary) {
    var parameters = {
        in_form_status_detail_id: formStatusDetailId,
        in_segmentation_form_id: segmentationFormId,
        in_hl5_id: hl5Id,
        in_region_id: regionId,
        in_subregion_id: subregionId,
        in_country: country,
        in_hl4_id: hl4Id,
        in_target_group_approval_workflow: targetGroupApprovalWorkflow,
        in_matching_required: matchingRequired,
        in_match_criteria_id: matchCriteriaId,
        in_number_of_record_need_matching: numberOfRecordNeedMatching,
        in_target_select_criteria_id: targetSelectCriteriaId,
        in_special_note: specialNote,
        in_attachment_id: attachmentId,
        in_revenue_range_from: revenueRangeFrom,
        in_revenue_range_to: revenueRangeTo,
        in_currency_id: currencyId,
        in_number_of_employee_from: numberOfEmployeeFrom,
        in_number_of_employee_to: numberOfEmployeeTo,
        in_customer_status_id: customerStatusId,
        in_regional_buying_classification_id: regionalBuyingClassificationId,
        in_competitor_id: competitorId,
        in_partner_id: partnerId,
        in_unqualified_address_id: unqualifiedAddressId,
        in_account_with_active_pipeline_id: accountWithActivePipelineId,
        in_account_with_active_lead_id: accountWithActiveLeadId,
        in_contact_detail: contactDetail,
        in_max_contact_per_organization: maxContactPerOrganization,
        in_exclude_contacs_touched_by_telemarketing: excludeContacsTouchedByTelemarketing,
        in_apply_sale_play_for_target: applySalePlayForTarget,
        in_apply_predictive_analytics_for_target: applyPredictiveAnalyticsForTarget,
        in_accept_terms_state: acceptTermsState,
        in_user_id: userId,
        in_summary: summary
    };

    return db.executeScalarManual(UPD_SEGMENTATION_FORM, parameters, "out_result");
}

function deleteSegmentationFormBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteSegmentationFormMarketBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteSegmentationFormSaleBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteSegmentationFormIndustryBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteSegmentationFormFunctionBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteSegmentationFormDepartmentBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteSegmentationFormTacticBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteSegmentationFormItemOfInterestBySegmentationFormId(segmentationFormId, userId) {
    return db.executeScalarManual(DEL_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId, in_user_id: userId}, "out_result");
}

function deleteHardSegmentationFormMarketBySegmentationFormId(segmentationFormId) {
    return db.executeScalarManual(DEL_HARD_SEGMENTATION_FORM_MARKET_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}, "out_result");
}

function deleteHardSegmentationFormSaleBySegmentationFormId(segmentationFormId) {
    return db.executeScalarManual(DEL_HARD_SEGMENTATION_FORM_SALE_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}, "out_result");
}

function deleteHardSegmentationFormIndustryBySegmentationFormId(segmentationFormId) {
    return db.executeScalarManual(DEL_HARD_SEGMENTATION_FORM_INDUSTRY_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}, "out_result");
}

function deleteHardSegmentationFormFunctionBySegmentationFormId(segmentationFormId) {
    return db.executeScalarManual(DEL_HARD_SEGMENTATION_FORM_FUNCTION_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}, "out_result");
}

function deleteHardSegmentationFormDepartmentBySegmentationFormId(segmentationFormId) {
    return db.executeScalarManual(DEL_HARD_SEGMENTATION_FORM_DEPARTMENT_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}, "out_result");
}

function deleteHardSegmentationFormTacticBySegmentationFormId(segmentationFormId) {
    return db.executeScalarManual(DEL_HARD_SEGMENTATION_FORM_TACTIC_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}, "out_result");
}

function deleteHardSegmentationFormItemOfInterestBySegmentationFormId(segmentationFormId) {
    return db.executeScalarManual(DEL_HARD_SEGMENTATION_FORM_ITEM_OF_INTEREST_BY_SEGMENTATION_FORM_ID, {in_segmentation_form_id: segmentationFormId}, "out_result");
}


/**************SEGMENTATION TACTIC*****************/

function getAllSegmentationTactic(){
    var parameters = {};
    var list = db.executeProcedureManual(GET_ALL_SEGMENTATION_TACTIC, parameters);
    return db.extractArray(list.out_result);
}

function insertSegmentationTactic(name, userId){
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_SEGMENTATION_TACTIC, parameters, "out_result");
}

function updateSegmentationTactic(segmentationTacticId, name, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_TACTIC_ID = segmentationTacticId;
    parameters.IN_NAME = name;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_SEGMENTATION_TACTIC, parameters, "out_result");
}

function deleteSegmentationTactic(segmentationTacticId, userId){
    var parameters = {};
    parameters.IN_SEGMENTATION_TACTIC_ID = segmentationTacticId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_SEGMENTATION_TACTIC, parameters, "out_result");
}

function getSegmentationTacticByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_SEGMENTATION_TACTIC_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getSegmentationTacticById(segmentationTacticId){
    var parameters = {'IN_SEGMENTATION_TACTIC_ID': segmentationTacticId};
    var list = db.executeProcedureManual(GET_SEGMENTATION_TACTIC_BY_ID, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return {};
}

function countRelatedSegmentationTactic(id){
    var parameters = {};
    parameters.in_segmentation_tactic_id = id;
    return db.executeScalarManual(GET_COUNT_FORM_SEGMENTATION_TACTIC_BY_SEGMENTATION_TACTIC_ID, parameters, "out_result");
}
/********END SEGMENTATION TACTIC***************/