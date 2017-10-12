/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blSegmentation = mapper.getSegmentation();
var ErrorLib = mapper.getErrors();
/** *************************************** */

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var rdo = [];
    switch(method){
        case "ALL":
            var hl4Id = httpUtil.getUrlParameterByName("HL4_ID");
            rdo = blSegmentation.getSegmentationFormData(hl4Id);
            break;
        case "GET_ALL_SEGMENTATION_MARKET":
            rdo = blSegmentation.getAllSegmentationMarket();
            break;
        case "GET_SEGMENTATION_MARKET_BY_ID":
            rdo = blSegmentation.getSegmentationMarketById(httpUtil.getUrlParameterByName("ENTITY_ID"));
            break;
        case "GET_ALL_SEGMENTATION_SALES":
            rdo = blSegmentation.getAllSegmentationSales();
            break;
        case "GET_SEGMENTATION_SALES_BY_ID":
            rdo = blSegmentation.getSegmentationSalesById(httpUtil.getUrlParameterByName("ENTITY_ID"));
            break;
        case "GET_SEGMENTATION_SALES_BY_PARENT_ID":
            rdo = blSegmentation.getSegmentationSalesByParentId(httpUtil.getUrlParameterByName("PARENT_ID"));
            break;
        case "GET_ALL_SEGMENTATION_REGION_BUYING":
            rdo = blSegmentation.getAllSegmentationRegionBuying();
            break;
        case "GET_SEGMENTATION_REGION_BUYING_BY_ID":
            rdo = blSegmentation.getSegmentationRegionBuyingById(httpUtil.getUrlParameterByName("ENTITY_ID"));
            break;
        case "GET_ALL_SEGMENTATION_FUNCTION":
            rdo = blSegmentation.getAllSegmentationFunction();
            break;
        case "GET_SEGMENTATION_FUNCTION_BY_ID":
            rdo = blSegmentation.getSegmentationFunctionById(httpUtil.getUrlParameterByName("ENTITY_ID"));
            break;
        case "GET_SEGMENTATION_FUNCTION_BY_PARENT_ID":
            rdo = blSegmentation.getSegmentationFunctionByParentId(httpUtil.getUrlParameterByName("PARENT_ID"));
            break;
        case "GET_ALL_SEGMENTATION_DEPARTMENT":
            rdo = blSegmentation.getAllSegmentationDepartment();
            break;
        case "GET_SEGMENTATION_DEPARTMENT_BY_ID":
            rdo = blSegmentation.getSegmentationDepartmentById(httpUtil.getUrlParameterByName("ENTITY_ID"));
            break;
        case "GET_ALL_SEGMENTATION_ITEM_INTEREST":
            rdo = blSegmentation.getAllSegmentationItemInterest();
            break;
        case "GET_SEGMENTATION_ITEM_INTEREST_BY_ID":
            rdo = blSegmentation.getSegmentationItemInterestById(httpUtil.getUrlParameterByName("ENTITY_ID"));
            break;
        case "GET_SEGMENTATION_CATEGORY_OPTION":
            rdo = blSegmentation.getSegmentationCategoryOptionByCategoryAndOptionId(httpUtil.getUrlParameterByName("CATEGORY_ID"), httpUtil.getUrlParameterByName("OPTION_ID"));
            break;
        case "GET_SEGMENTATION_CATEGORY_OPTION_BY_CATEGORY_ID":
            rdo = blSegmentation.getSegmentationCategoryOptionByCategoryId(httpUtil.getUrlParameterByName("CATEGORY_ID"));
            break;
        case "GET_SEGMENTATION_CATEGORY_OPTION_BY_INDUSTRIES":
            rdo = blSegmentation.getSegmentationCategoryOptionByIndustriesCategory();
            break;
        case "GET_ALL_SEGMENTATION_CATEGORY_OPTION":
            rdo = blSegmentation.getAllSegmentationCategoryOption();
            break;
        case "GET_SEGMENTATION_DEPARTMENT_BY_PARENT_ID":
            rdo = blSegmentation.getSegmentationDepartmentByParentId(httpUtil.getUrlParameterByName("PARENT_ID"));
            break;
        case "GET_ALL_SEGMENTATION_TACTIC":
            rdo = blSegmentation.getAllSegmentationTactic();
            break;
        case "GET_SEGMENTATION_TACTIC_BY_ID":
            rdo = blSegmentation.getSegmentationTacticById(httpUtil.getUrlParameterByName("ENTITY_ID"));
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","segmentationService/handleGet","invalid parameter name.");
            break;
    }

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var rdo = [];
    switch(method){
        case "INS_SEGMENTATION_MARKET":
            rdo = blSegmentation.insertSegmentationMarket(reqBody, userSessionID);
            break;
        case "INS_SEGMENTATION_SALES":
            rdo = blSegmentation.insertSegmentationSales(reqBody, userSessionID);
            break;
        case "INS_SEGMENTATION_REGION_BUYING":
            rdo = blSegmentation.insertSegmentationRegionBuying(reqBody, userSessionID);
            break;
        case "INS_SEGMENTATION_FUNCTION":
            rdo = blSegmentation.insertSegmentationFunction(reqBody, userSessionID);
            break;
        case "INS_SEGMENTATION_DEPARTMENT":
            rdo = blSegmentation.insertSegmentationDepartment(reqBody, userSessionID);
            break;
        case "INS_SEGMENTATION_CATEGORY_OPTION":
            rdo = blSegmentation.insertSegmentationCategoryOption(reqBody, userSessionID);
            break;
        case "INS_SEGMENTATION_ITEM_INTEREST":
            rdo = blSegmentation.insertSegmentationItemInterest(reqBody, userSessionID);
            break;
        case "INS_SEGMENTATION_TACTIC":
            rdo = blSegmentation.insertSegmentationTactic(reqBody, userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","segmentationService/handlePost","invalid parameter name.");
            break;
    }

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePut(reqBody, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var rdo = [];
    switch(method){
        case "UPD_SEGMENTATION_MARKET":
            rdo = blSegmentation.updateSegmentationMarket(reqBody, userSessionID);
            break;
        case "UPD_SEGMENTATION_SALES":
            rdo = blSegmentation.updateSegmentationSales(reqBody, userSessionID);
            break;
        case "UPD_SEGMENTATION_REGION_BUYING":
            rdo = blSegmentation.updateSegmentationRegionBuying(reqBody, userSessionID);
            break;
        case "UPD_SEGMENTATION_FUNCTION":
            rdo = blSegmentation.updateSegmentationFunction(reqBody, userSessionID);
            break;
        case "UPD_SEGMENTATION_DEPARTMENT":
            rdo = blSegmentation.updateSegmentationDepartment(reqBody, userSessionID);
            break;
        case "UPD_SEGMENTATION_ITEM_INTEREST":
            rdo = blSegmentation.updateSegmentationItemInterest(reqBody, userSessionID);
            break;
        case "UPD_SEGMENTATION_TACTIC":
            rdo = blSegmentation.updateSegmentationTactic(reqBody, userSessionID);
            break;
        case "UPD_SEGMENTATION_CATEGORY_OPTION":
            rdo = blSegmentation.updateSegmentationCategoryOption(reqBody, userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","segmentationService/handlePut","invalid parameter name.");
            break;
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var rdo = [];
    switch(method){
        case "DEL_SEGMENTATION_MARKET":
            rdo = blSegmentation.deleteSegmentationMarket(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        case "DEL_SEGMENTATION_SALES":
            rdo = blSegmentation.deleteSegmentationSales(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        case "DEL_SEGMENTATION_CATEGORY_OPTION":
            rdo = blSegmentation.deleteSegmentationCategoryOption(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        case "DEL_SEGMENTATION_REGION_BUYING":
            rdo = blSegmentation.deleteSegmentationRegionBuying(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        case "DEL_SEGMENTATION_FUNCTION":
            rdo = blSegmentation.deleteSegmentationFunction(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        case "DEL_SEGMENTATION_DEPARTMENT":
            rdo = blSegmentation.deleteSegmentationDepartment(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        case "DEL_SEGMENTATION_ITEM_INTEREST":
            rdo = blSegmentation.deleteSegmentationItemInterest(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        case "DEL_SEGMENTATION_TACTIC":
            rdo = blSegmentation.deleteSegmentationTactic(httpUtil.getUrlParameterByName("ENTITY_ID"), userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","segmentationService/handleDelete","invalid parameter name.");
            break;
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();