/*******************Import Library*********************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var util = mapper.getUtil();

var AllocationCategory = mapper.getAllocationCategoryLib();
var blRegion = mapper.getRegion();

var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var level4Lib = mapper.getLevel4();

var dataSegmentation = mapper.getDataSegmentation();
var api = mapper.getDataApiCSD();
/** ***********END INCLUDE LIBRARIES*************** */

/** CONST **/
var INDUSTRIES = "industries";

function getLeadFormInformation(hl4Id){
    var result = {};
    var nonAdministrableFields = dataSegmentation.getSegmentationNonAdministrableFields();

    result.COUNTRY = nonAdministrableFields.COUNTRY;
    result.CAMPAIGN = level4Lib.getHl4ByBudgetYear(hl4Id);
    result.TARGET_SELECT_CRITERIA = nonAdministrableFields.TARGET_SELECT_CRITERIA;
    result.REGION = blRegion.getOnlyRegionSubregion();
    return result;
}

function getActivitiesFormInformation(){
    var result = {};

    return result;
}

function getSegmentationFormInformation(hl4Id){
    var nonAdministrableFields = dataSegmentation.getSegmentationNonAdministrableFields();
    var hl1 = dataHl1.getHl1ByHl4Id(hl4Id);
    var hl2 = dataHl2.getHl2ByHl4Id(hl4Id);
    var segmentationSale = getAllSegmentationSales();
    var segmentationFunction = getAllSegmentationFunction();
    var segmentationDepartment = getAllSegmentationDepartment();
    return {
        SEGMENTATION_MARKET: getAllSegmentationMarket(),
        SEGMENTATION_TACTIC: getAllSegmentationTactic(),
        SEGMENTATION_SALES: hierarchicalDataParser(segmentationSale),
        SEGMENTATION_REGION_BUYING: getAllSegmentationRegionBuying(),
        SEGMENTATION_FUNCTION: hierarchicalDataParser(segmentationFunction),
        SEGMENTATION_DEPARTMENT: hierarchicalDataParser(segmentationDepartment),
        SEGMENTATION_ITEM_INTEREST: getAllSegmentationItemInterest(),
        SEGMENTATION_CATEGORY_OPTION: getSegmentationCategoryOptionByIndustriesCategory(),
        CAMPAIGN: level4Lib.getHl4ByBudgetYear(hl4Id),
        COUNTRY: nonAdministrableFields.COUNTRY,
        PARTNER: nonAdministrableFields.PARTNER,
        UNQUALIFIED_ADDRESS: nonAdministrableFields.UNQUALIFIED_ADDRESS,
        ACCOUNT_WITH_ACTIVE_PIPELINE: nonAdministrableFields.ACCOUNT_WITH_ACTIVE_PIPELINE,
        ACCOUNT_WITH_ACTIVE_LEAD: nonAdministrableFields.ACCOUNT_WITH_ACTIVE_LEAD,
        MATCH_CRITERIA: nonAdministrableFields.MATCH_CRITERIA,
        TARGET_SELECT_CRITERIA: nonAdministrableFields.TARGET_SELECT_CRITERIA,
        COMPETITOR: nonAdministrableFields.COMPETITOR,
        DEFAULT_REGION_ID: hl1.REGION_ID,
        DEFAULT_MARKET_UNIT_ID: hl2.SUBREGION_ID,
        DEFAULT: {
            REGION_ID: hl1.REGION_ID
            , MARKET_UNIT_ID: hl2.SUBREGION_ID
        },
        REGION: blRegion.getOnlyRegionSubregion()
    };
}

/** SEGMENTATION FUNCTIONS **/
function getAllSegmentationSales() {
    return dataSegmentation.getAllSegmentationSales();
}

function getAllSegmentationFunction() {
    return dataSegmentation.getAllSegmentationFunction();
}

function getAllSegmentationDepartment() {
    return dataSegmentation.getAllSegmentationDepartment();
}

function getAllSegmentationMarket() {
    return dataSegmentation.getAllSegmentationMarket();
}

function getAllSegmentationTactic() {
    return dataSegmentation.getAllSegmentationTactic();
}

function getAllSegmentationRegionBuying() {
    return dataSegmentation.getAllSegmentationRegionBuying();
}

function getAllSegmentationItemInterest() {
    return dataSegmentation.getAllSegmentationItemInterest();
}

function getSegmentationCategoryOptionByIndustriesCategory() {
    var idIndustries = AllocationCategory.getAllocationCategoryByName(INDUSTRIES).CATEGORY_ID;

    var ret = {};
    ret.result = dataSegmentation.getAllSegmentationCategoryOption();
    ret.SEGMENTATION_CATEGORY_ID = dataSegmentation.getSegmentationCategoryIdByAllocationId(idIndustries);
    return ret;
}

function hierarchicalDataParser(data) {
    var result = {};

    data.forEach(function (elem) {
        if (!Number(elem.PARENT_ID)) {
            var id = elem.SEGMENTATION_SALES_ID || elem.SEGMENTATION_FUNCTION_ID || elem.SEGMENTATION_DEPARTMENT_ID;
            if (!result[id]) {
                result[id] = {};
                result[id].CHILDREN = [];
            }

            result[id].NAME = elem.NAME;
            result[id].SEGMENTATION_SALES_ID = elem.SEGMENTATION_SALES_ID;
            result[id].SEGMENTATION_FUNCTION_ID = elem.SEGMENTATION_FUNCTION_ID;
            result[id].SEGMENTATION_DEPARTMENT_ID = elem.SEGMENTATION_DEPARTMENT_ID;
        } else {
            if (!result[elem.PARENT_ID]) {
                result[elem.PARENT_ID] = {
                    CHILDREN: []
                };
            }

            result[elem.PARENT_ID].CHILDREN.push(elem);
        }
    });
    return util.objectToArray(result);
}

function requestToApiCsd(method, route, data) {
	var result;
	try{
	    var user = config.getCsdUser();
	    var pass = config.getCsdPassword();
        var encode = $.util.codec.encodeBase64(user+':'+pass);
		var destPackage = "mktgplanningtool.services.businessLayer.api";
		var destName = "csdApi";
	    var dest = $.net.http.readDestination(destPackage, destName);
	    var client = new $.net.http.Client();
	    var req = new $.web.WebRequest(method,route);
	    req.headers.set("Content-Type","application/json");
	    req.headers.set("Authorization", "Basic "+encode);
	    req.setBody(JSON.stringify(data));
	    client.request(req, dest);
	    var response = client.getResponse();
	    result = response.body;
	} catch (e) {
		result  = {};
	}

	var response;
	
	try{ response = JSON.parse(result.asString().replace("/",""));}
	catch (e) {	response  = {};}
	
	return response
}

function createLeadFormInCsd(leadFormData){
	//Please do not change neither "project" nor "requestorID" values
	var data = {
	        project: "Campaign Service Desk",
	        summary: leadFormData.SUMMARY,
	        requestorId: "mtpuser",
	        region: leadFormData.REGION, //Region name
	        marketUnit: leadFormData.MARKET_UNIT, //Sub-Region name
	        country: leadFormData.COUNTRY === "Select" ? "" : leadFormData.COUNTRY, //Country name
	        campaignId: leadFormData.HL4_CRM_ID, //HL4 Path
	        numberOfRecords: leadFormData.NUMBER_OF_RECORDS,
	        includesCrmId: leadFormData.INCLUDES_CRM_ID, //Target Select Criteria
	        specialNotes: leadFormData.SPECIAL_NOTES
	};
	return requestToApiCsd($.net.http.POST, "/leadsUploadService", data);
}