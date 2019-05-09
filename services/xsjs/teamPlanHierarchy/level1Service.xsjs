/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blLevel1 = mapper.getLevel1();
var blDynamicForm = mapper.getDynamicFormLib();
var config = mapper.getDataConfig();
var blRolePermission = mapper.getRolePermission();

/******************************************/

var method = "GET_ALL";
var section = "FOR_SEARCH";
var getByBudgetRegion = "GET_HL1_BY_BUDGET_YEAR_REGION";
var hl1Id = "HL1_ID";
var GET_HL1_BY_FILTER = "GET_HL1_BY_FILTER";
var GET_DATA_KPI = "GET_DATA_KPI";
var GET_HL1_GROUP_BY_REGION = "GET_HL1_GROUP_BY_REGION";
var GET_HL1_ALLOCATION_SUMMARY = "GET_HL1_ALLOCATION_SUMMARY";
var methodName = "METHOD";

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level1()));
}

//Implementation of GET call -- GET HL1
function handleGet(parameters, userSessionID){
	if(parameters.length > 0){
		blLevel1.checkPermission(userSessionID, parameters[0].name, parameters[0].value);

		if (parameters[0].name == hl1Id){
			var isCarryOver = httpUtil.getUrlParameters().get("METHOD") == "CARRY_OVER";
			var rdo = blLevel1.getLevel1ById(parameters[0].value, isCarryOver, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_HL1_BY_FILTER){
			//var objFilter = {};
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
			var subRegionId = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;

			var rdo = blLevel1.getLevel1ByFilters(budgetYearId, regionId, subRegionId, userSessionID);

			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if(parameters[0].name == methodName && httpUtil.getUrlParameters().get(methodName) == "GET_DYNAMIC_FORM"){
			var rdo = blDynamicForm.getFormByRoleId("L1", null, true, userSessionID);

			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if(parameters[0].name == methodName && httpUtil.getUrlParameters().get(methodName) == "GET_DYNAMIC_FORM_BY_BUDGET_YEAR"){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID");
			var rdo = blDynamicForm.getFormByRoleIdBudgetYearId("L1", budgetYearId, null, true, userSessionID);

			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (httpUtil.getUrlParameters().get("METHOD") == section){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
			var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
			var offset = httpUtil.getUrlParameters().get("OFFSET") || null;

			var rdo = blLevel1.getLevel1ForSearch(budgetYearId, regionId, limit, offset, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_DATA_KPI){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;

			var rdo = blLevel1.getLevel1Kpi(budgetYearId, regionId, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if(httpUtil.getUrlParameters().get("METHOD") == getByBudgetRegion){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;

			var rdo = blLevel1.getHl1ByBudgetYearRegion(budgetYearId, regionId, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if(httpUtil.getUrlParameters().get("METHOD") == GET_HL1_GROUP_BY_REGION){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var rdo = blLevel1.getHl1GroupByRegion(budgetYearId, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","userServices/handleGet","invalid parameter name (can be: GET_ALL, HL2_ID or GET_HL1_BY_FILTER)");
		}
	}else{

		var rdo = blLevel1.getLevel1ByUser(userSessionID);
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}
}

//Implementation of POST call -- Insert HL1
function handlePost(reqBody,userSessionID) {
    blRolePermission.checkEspecialPermission(userSessionID, "Create", config.level1());
	var rdo =  blLevel1.insertHl1(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody,userSessionID){
    var method = httpUtil.getUrlParameters().get("METHOD");
    var rdo = null;
    var hl1Id = reqBody.HL1_ID || reqBody.ID;
    blLevel1.checkPermission(userSessionID, null, hl1Id);
    switch (method) {
		case 'UPDATE_BUDGET':
            rdo =  blLevel1.updateBudget(hl1Id,reqBody.BUDGET,userSessionID);
			break;
		default:
            rdo =  blLevel1.updateHl1(reqBody,userSessionID);
    }

	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of DELETE call -- Delete HL1
function handleDelete(reqBody,userSessionID){
	blLevel1.checkPermission(userSessionID, null, reqBody.HL1_ID);
	var rdo = blLevel1.deleteHl1(reqBody.HL1_ID,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Call request processing  
processRequest();