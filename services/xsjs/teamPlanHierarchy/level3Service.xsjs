/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessLavel3 = mapper.getLevel3();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var blRolePermission = mapper.getRolePermission();
var blDynamicForm = mapper.getDynamicFormLib();

/** *************************************** */

var section = "FOR_SEARCH";
var GET_ALL_HL3 = "GET_ALL_HL3";
var GET_BY_HL3_ID = "GET_BY_HL3_ID";
var GET_DATA_KPI = "GET_DATA_KPI";
var categories = "HL2_CATEGORIES";
var GET_DYNAMIC_FORM = "GET_DYNAMIC_FORM";

// Main function
function processRequest() {
	return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,false, "", true);
}

// function to manage an post request
function handlePost(reqBody, userSessionID) {
    blRolePermission.checkEspecialPermission(userSessionID, "Create", config.level3());
    businessLavel3.checkPermission(userSessionID, null ,reqBody.IN_HL2_ID);
    businessLavel3.checkEspecialPermission(userSessionID, "Create");
	var rdo = businessLavel3.insertHl3(reqBody, userSessionID);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// function to manage an get request
function handleGet(parameters, userSessionID) {
	var rdo = {};
	var hl2_categories = httpUtil.getUrlParameters().get("HL2_CATEGORIES");
	var in_hl2_id = httpUtil.getUrlParameters().get("HL2_ID");
    var in_hl3_id = httpUtil.getUrlParameters().get("HL3_ID");
    var method = httpUtil.getUrlParameters().get("METHOD");
    
    if(!in_hl3_id && parameters[0].name === "GET_BY_HL3_ID"){
    	in_hl3_id = parameters[0].value;
    }
    
	if (parameters.length > 0) {
		
        var budgetYearId = parameters[1] && parameters[1].name === "BUDGET_YEAR_ID" ? parameters[1].value : null;
        var regionId = parameters[2] && parameters[2].name === "REGION_ID" ? parameters[2].value : null;
        var subRegionId = parameters[3] && parameters[3].name === "SUBREGION_ID" ? parameters[3].value : null;
        businessLavel3.checkPermission(userSessionID, parameters[0].name, in_hl3_id);
        
		if (parameters[0].name === GET_ALL_HL3) {
			// get by hl2 and userid
			rdo = businessLavel3.getAllLevel3(parameters[0].value,
					userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0].name === GET_BY_HL3_ID) {
            if (in_hl3_id && method && method === "CARRY_OVER"){
                rdo = businessLavel3.getLevel3CarryOverById(in_hl3_id, userSessionID);
            } else {
				// get by hl3 and userid
				rdo = businessLavel3.getLevel3ById(parameters[0].value,
						userSessionID);
            }
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0].name === GET_DATA_KPI) {
			rdo = businessLavel3.getLevel3Kpi(httpUtil.getUrlParameters().get("HL2_ID"), userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if(parameters[0].name == "METHOD" && method == "GET_DYNAMIC_FORM"){
			//DYNAMIC FORM GET
			var rdo = blDynamicForm.getFormByRoleId("L3", null, true, userSessionID);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);

		} else if(parameters[0].name == "METHOD" && httpUtil.getUrlParameters().get("METHOD") == "GET_DYNAMIC_FORM_BY_BUDGET_YEAR"){
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID");
			var rdo = blDynamicForm.getFormByRoleIdBudgetYearId("L3", budgetYearId, null, true, userSessionID);

			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0].value === section){
			budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
			regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
			subRegionId = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;
			var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
			var offset = httpUtil.getUrlParameters().get("OFFSET") || null;
			rdo = businessLavel3.getLevel3ForSearch(userSessionID,budgetYearId,regionId,subRegionId,offset,limit);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		} else if (parameters[0] && parameters[0].value === 'ALL'){
			var generalFilter = httpUtil.getUrlParameters().get("GENERAL_FILTER") || null;
            rdo = businessLavel3.getAllHl3GroupByHl1(budgetYearId, regionId, subRegionId, generalFilter);
            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
        } else if (parameters[0] && parameters[0].value === 'BY_USER'){
            rdo = businessLavel3.getHl3ByUserGroupByHl1(userSessionID, budgetYearId, regionId, subRegionId);
            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"hl3Services/handleGet",
					"invalid parameter name (can be: GET_ALL_HL3 or GET_BY_HL3_ID)"
							+ parameters[0].name);
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody,userSessionID) {
    var method = httpUtil.getUrlParameters().get("METHOD");
    var rdo = null;
    var hl3Id = reqBody.HL3_ID || reqBody.ID;
    businessLavel3.checkPermission(userSessionID, null, hl3Id);
    switch (method) {
        case 'UPDATE_BUDGET':
            rdo =  businessLavel3.updateBudget(hl3Id,reqBody.BUDGET,userSessionID);
            break;
        default:
            rdo =  businessLavel3.updateHl3(reqBody,userSessionID);
    }

    return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

// function to manage an del request
function handleDelete(reqBody,userSessionID) {
    businessLavel3.checkPermission(userSessionID, reqBody.HL3_ID);
    var rdo = businessLavel3.deleteHl3(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// Call the main function
processRequest();