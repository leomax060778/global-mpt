/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hierarchyCategoryCountryLib = mapper.getHierarchyCategoryCountry();
/******************************************/

var getAllHL1 = "GET_ALL_HL1";
var getCountriesByHL2IdLevel = "GET_COUNTRY_BY_HL2_ID_LEVEL";

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSession){
	var method = httpUtil.getUrlParameters().get("METHOD");
	var result;
	
	switch(method){
		case getAllHL1:
			var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID");
			result = hierarchyCategoryCountryLib.getAllHl1(budgetYearId);
			break;
		case getCountriesByHL2IdLevel:
			var hl2Id = httpUtil.getUrlParameters().get("HL2_ID");
			var level = httpUtil.getUrlParameters().get("LEVEL");
			
			result = hierarchyCategoryCountryLib.getCountryByHl2IdLevel(hl2Id, level, userSession);
			break;
	}
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody,userId){
	return httpUtil.notImplementedMethod();
}

function handleDelete(reqBody, userId){
	return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, userId){
	var result = hierarchyCategoryCountryLib.updateCategoryCountryOptionLevel(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
processRequest();
