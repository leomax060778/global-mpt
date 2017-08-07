/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
var businessLavel3 = mapper.getLevel3();
var config = mapper.getDataConfig();
var blLevel1 = mapper.getLevel1();
/******************************************/

var method = "GET_ALL";
var section = "FOR_SEARCH";
var hl2Id = "HL2_ID";
var HL1_ID = "HL1_ID";
var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM";

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level1()));
}

//Implementation of GET call -- GET HL2
function handleGet(parameters, userSessionID){
	if(parameters.length > 0){
        blLevel2.checkPermission(userSessionID, parameters[0].name, parameters[0].value);
		if (parameters[0].name == hl2Id){
			var objLevel2 = {};
			objLevel2.IN_HL2_ID = parameters[0].value;
			
			var rdo = blLevel2.getLevel2ById(objLevel2)
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == GET_ALL_CENTRAL_TEAM){
			var hl_id = httpUtil.getUrlParameters().get("HL_ID") || null;
			var level = httpUtil.getUrlParameters().get("LEVEL") || null;
			var rdo = blLevel2.getAllCentralTeam(0, hl_id, level);
			httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}
		else if (parameters[0].name == HL1_ID){
			var rdo = blLevel2.getHl2ByHl1Id(parameters[0].value, userSessionID);
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
    blLevel1.checkPermission(userSessionID, null ,reqBody.IN_PLAN_ID);
	var rdo =  blLevel2.insertHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of UPDATE call -- UPDATE HL2
function handlePut(reqBody,userSessionID){
    blLevel2.checkPermission(userSessionID, null, reqBody.IN_HL2_ID);
	var rdo =  blLevel2.updateHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Implementation of DELETE call -- Delete HL2
function handleDelete(reqBody,userSessionID){
    blLevel2.checkPermission(userSessionID, null, reqBody.IN_HL2_ID);
	var rdo = blLevel2.deleteHl2(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Call request processing  
processRequest();