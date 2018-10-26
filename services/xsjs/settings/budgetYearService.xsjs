/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var budgetYear = mapper.getBudgetYear();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet() {
	var parameters = httpUtil.getJSONParameters();
	var rdo = null;

	if(parameters.METHOD){
		switch(parameters.METHOD){
			case "GET_ALL":
				rdo = budgetYear.getAllBudgetYear();
				break;
			case "GET_ALL_BY_REQUIRE_DYNAMIC_FORM":
				rdo = budgetYear.getAllByRequireDynamicForm();
				break;
			case "GET_BUDGET_YEAR_BY_LEVEL_PARENT":
				var parentId = parameters.PARENT_ID;
				var level = parameters.LEVEL;

				if(!parentId){
					throw ErrorLib.getErrors().BadRequest("","","Missing parameter PARENT_ID");
				}
				if(!level){
					throw ErrorLib.getErrors().BadRequest("","","Missing parameter LEVEL");
				}

				rdo = budgetYear.getBudgetYearByLevelParent(level, parentId);
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","","invalid parameter value (should be GET_ALL or GET_ALL_BY_REQUIRE_DYNAMIC_FORM");
				break;
		}
	} else{
		throw ErrorLib.getErrors().BadRequest("","","Missing parameter METHOD");
	}

	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	var rdo = budgetYear.updateBudgetYear(reqBody, userId);
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var result = budgetYear.deleteBudgetYear(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody, userId){
	var result = budgetYear.insertBudgetYear(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();