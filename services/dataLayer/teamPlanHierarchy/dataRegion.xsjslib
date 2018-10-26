$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_REGION = "GET_ALL_REGION";
var GET_REGION_BY_ID = "GET_REGION_BY_ID";
var GET_REGION_BY_NAME = "GET_REGION_BY_NAME";
var INS_REGION = "INS_REGION";
var UPD_REGION = "UPD_REGION";
var UPD_REGION_GLOBAL_FLAG = "UPD_REGION_GLOBAL_FLAG";
var REGION_CAN_DELETE = "REGION_CAN_DELETE";
var DEL_REGION = "DEL_REGION";
var GET_VALIDATE_REGION_AND_MARKET_UNIT = "GET_VALIDATE_REGION_AND_MARKET_UNIT";
var GET_REGION_SUBREGION = "GET_REGION_SUBREGION";

function getAllRegions(){
	var parameters = {};	
	var result = db.executeProcedureManual(GET_ALL_REGION, {});	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}

function getRegionById(regionId){
	var parameters = {'IN_REGION_ID': regionId};
	var result = db.executeProcedureManual(GET_REGION_BY_ID, parameters);	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}

function getOnlyRegionSubregion() {

	return db.executeProcedureManual(GET_REGION_SUBREGION, {});
}

/*EXECUTE QUERY TO INSERT NEW REGION*/
function insertRegion(objRegion, userId){
	var parameters = {};
	parameters.IN_REGION_NAME = objRegion.IN_REGION_NAME;
	parameters.IN_REGION_ISO = objRegion.IN_REGION_ISO;
	parameters.IN_CREATED_USER_ID = userId;
	parameters.OUT_REGION_ID = '?';
	parameters.IN_TIME_ZONE_OFFSET = objRegion.REGION_TIME_ZONE_OFFSET;
	parameters.IN_START_TIME = objRegion.REGION_START_TIME;
	parameters.IN_END_TIME = objRegion.REGION_END_TIME;
	parameters.IN_IS_GLOBAL_REGION = Number(objRegion.IS_GLOBAL_REGION) || 0;

	return db.executeScalar(INS_REGION,parameters,"OUT_REGION_ID");
}

/*EXECUTE QUERY TO UPDATE REGION*/
function updateRegion(objRegion, userId){

	var parameters = {};
	parameters.IN_REGION_ID = objRegion.IN_REGION_ID;
	parameters.IN_REGION_NAME = objRegion.IN_REGION_NAME;
	parameters.IN_REGION_ISO = objRegion.IN_REGION_ISO;
	parameters.IN_MODIFIED_USER_ID = userId;
	parameters.out_result = '?';
    parameters.IN_TIME_ZONE_OFFSET = objRegion.REGION_TIME_ZONE_OFFSET;
    parameters.IN_START_TIME = objRegion.REGION_START_TIME;
    parameters.IN_END_TIME = objRegion.REGION_END_TIME;
    parameters.IN_IS_GLOBAL_REGION = Number(objRegion.IS_GLOBAL_REGION) || 0;
	
	return db.executeScalar(UPD_REGION,parameters,"out_result");
}

function updateGlobalRegionFlag(isGlobalRegion,userId){
    return db.executeScalar(UPD_REGION_GLOBAL_FLAG,{in_is_global_region: isGlobalRegion, in_user_id: userId},"out_result");
}

/*EXECUTE QUERY TO UPDATE REGION*/
function getRegionByName(objRegion){
	var parameters = {};
	parameters.IN_REGION_NAME = objRegion.IN_REGION_NAME;	
	var result = db.executeProcedureManual(GET_REGION_BY_NAME,parameters,"out_result");
	return db.extractArray(result.out_result);
}

/*EXECUTE QUERY TO DELETE REGION*/
function delRegion(objRegion, userId){
	var parameters = {};
	parameters.in_region_id = objRegion.IN_REGION_ID;
	parameters.in_modified_user_id = userId;
	return db.executeScalar(DEL_REGION, parameters,"out_result");
}

//DETERMINE IF EXIST A ENTITY OF REGION
function existRegion(objRegion){
	var region = getRegionByName(objRegion);
	return region && region.length > 0;
}

function canDeleteRegion(objRegion){
	var parameters = {};
	parameters.in_region_id = objRegion.IN_REGION_ID;
	var result = db.executeScalar(REGION_CAN_DELETE,parameters,"out_result");
	return !(result > 0);
}

function validateRegionAndMarketUnit(idRegion, idMarketUnit){
	var parameters = {};
	parameters.in_region_id = idRegion;
	parameters.in_market_unit_id = idMarketUnit;
	return db.executeScalar(GET_VALIDATE_REGION_AND_MARKET_UNIT,parameters,"out_result");
}