/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
var config = mapper.getDataConfig();
var config = mapper.getDataConfig();
var blRolePermission = mapper.getRolePermission();
var blDynamicForm = mapper.getDynamicFormLib();
/******************************************/

var method = "GET_ALL";
var section = "FOR_SEARCH";
var hl2Id = "HL2_ID";
var HL1_ID = "HL1_ID";
var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM";
var GET_DATA_KPI = "GET_DATA_KPI";
var methodName = "METHOD";

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

//Implementation of GET call -- GET HL2
function handleGet(parameters, userSessionID){
	if(parameters.length > 0){
        blLevel2.checkPermission(userSessionID, parameters[0].name, parameters[0].value);
		if (parameters[0].name == hl2Id){
			// var objLevel2 = {};
			// objLevel2.IN_HL2_ID = parameters[0].value;
			var isCarryOver = httpUtil.getUrlParameters().get("METHOD") == "CARRY_OVER";
			var rdo = blLevel2.getLevel2ById(parameters[0].value, isCarryOver);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_ALL_CENTRAL_TEAM){
			var hl_id = httpUtil.getUrlParameters().get("HL_ID") || null;
			var level = httpUtil.getUrlParameters().get("LEVEL") || null;
			var isLegacy = httpUtil.getUrlParameters().get("IS_LEGACY") || null;
			isLegacy = isLegacy && isLegacy === "true";

			var rdo = blLevel2.getAllCentralTeam(0, hl_id, level, isLegacy);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == HL1_ID){
			var rdo = blLevel2.getHl2ByHl1Id(parameters[0].value, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_DATA_KPI){
			var rdo = blLevel2.getLevel2Kpi(httpUtil.getUrlParameters().get("HL1_ID"), userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
        else if(parameters[0].name == methodName && httpUtil.getUrlParameters().get(methodName) == "GET_DYNAMIC_FORM"){
            var rdo = blDynamicForm.getFormByRoleId("L2", null, true, userSessionID);

            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
        }
		else if(parameters[0].name == methodName && httpUtil.getUrlParameters().get(methodName) == "GET_DYNAMIC_FORM_BY_BUDGET_YEAR"){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID");
			var rdo = blDynamicForm.getFormByRoleIdBudgetYearId("L2", budgetYearId, null, true, userSessionID);

			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if(parameters[0].name == methodName && httpUtil.getUrlParameters().get(methodName) == "GET_HL2_GROUP_BY_REGION"){
            var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
            var rdo = blLevel2.getHl2GroupByRegion(budgetYearId, userSessionID);

            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].value == section){
			var budget_year_id = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			var region_id = httpUtil.getUrlParameters().get("REGION_ID") || null;
			var subregion_id = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;
			var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
			var offset = httpUtil.getUrlParameters().get("OFFSET") || null;

			var rdo = blLevel2.getLevel2ForSearch(userSessionID, budget_year_id, region_id, subregion_id, limit, offset);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","userServices/handleGet","invalid parameter name (can be: GET_ALL, HL2_ID or GET_HL1_BY_FILTER)");
		}
	}else{
		
		var rdo = blLevel2.getLevel2ByUser(userSessionID);
		httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	}	
};

//Implementation of POST call -- Insert HL2
function handlePost(reqBody,userSessionID) {
    blRolePermission.checkEspecialPermission(userSessionID, "Create", config.level2());
    blLevel2.checkPermission(userSessionID, null ,reqBody.HL1_ID);
	var rdo =  blLevel2.insertHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of UPDATE call -- UPDATE HL2
function handlePut(reqBody,userSessionID){
    var method = httpUtil.getUrlParameters().get("METHOD");
    var rdo = null;
    var hl2Id = reqBody.HL2_ID || reqBody.ID;
    blLevel2.checkPermission(userSessionID, null, hl2Id);
    switch (method) {
        case 'UPDATE_BUDGET':
            rdo =  blLevel2.updateBudget(hl2Id,reqBody.BUDGET,userSessionID);
            break;
        default:
            rdo =  blLevel2.updateHl2(reqBody,userSessionID);
    }

    return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Implementation of DELETE call -- Delete HL2
function handleDelete(reqBody,userSessionID){
    blLevel2.checkPermission(userSessionID, null, reqBody.HL2_ID);
	var rdo = blLevel2.deleteHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Call request processing  
processRequest();