$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/***************END INCLUDE LIBRARIES*******************/

//STORE PROCEDURE LIST NAME
var spGetSubregionByRegionId = "GET_SUBREGION_BY_REGION_ID";
var spInsertSubregion = "INS_SUBREGION";
var spUpdateSubregion = "UPD_SUBREGION";
var spDeleteSubregion = "DEL_SUBREGION";
var spDeleteSubregionsByRegion = "DEL_SUBREGIONS_BY_REGION_ID";
var spGetAllSubRegion = "GET_ALL_SUBREGION";
var spGetCountHL2BySubregionId =  "GET_COUNT_HL2_BY_SUBREGIONID";
var GET_SUBREGION_BY_NAME_AND_REGION =  "GET_SUBREGION_BY_NAME_AND_REGION";

/*****************END STORED PROCEDURES*******************/

function getSubRegionsByRegionId(regionId){
	var spResult = [];
	if(regionId > 0)
	{
		var parameters = {'IN_REGION_ID': regionId};
		var result = db.executeProcedureManual(spGetSubregionByRegionId, parameters);
		var list = result['out_result'];

		Object.keys(list).forEach(function(key) {
			spResult.push(list[key]);
		});
	}
	return spResult;
}

function getAllSubRegions(){
	var result = db.executeProcedureManual(spGetAllSubRegion, {});
	return db.extractArray(result.out_result);
}
function getSubRegionByName(name, regionId){
	var result = db.executeProcedureManual(GET_SUBREGION_BY_NAME_AND_REGION, {in_name: name, in_region_id: regionId});
	var subregion = db.extractArray(result.out_result);
    return subregion && subregion.length > 0;
}

function insertSubregion(subregion, createUser) {
	var param = {};
	param.in_subregion_name = subregion.NAME;
	param.in_subregion_iso = subregion.ISO;
	param.in_region_id = subregion.REGION_ID;
	param.in_created_user_id = createUser; // User that insert

	return db.executeScalar(spInsertSubregion, param,
			"out_subregion_id");
}

function updateSubregion(subregion, modUser) {
	var param = {};
	param.in_subregion_id = subregion.SUBREGION_ID;
	param.in_subregion_name = subregion.NAME;
	param.in_subregion_iso = subregion.ISO;
	param.in_modified_user_id = modUser; // User that insert

	return db.executeScalar(spUpdateSubregion, param, "out_result");
}

function deleteSubregion(subregion, modUser) {
	var param = {};
	param.in_subregion_id = subregion.SUBREGION_ID;
	param.in_modified_user_id = modUser; // User that deletes

	return db.executeScalar(spDeleteSubregion, param, "out_result");
}
function delSubregionsByRegion(region, modUser) {
	var param = {};
	param.in_region_id = region.IN_REGION_ID;
	param.in_modified_user_id = modUser; // User that deletes

	return db.executeScalarManual(spDeleteSubregionsByRegion, param, "out_result");
}

function getCountHL2BySubRegionId(subRegionId) {
	var param = {};
	param.in_subregion_id = subRegionId;
	return db.executeScalarManual(spGetCountHL2BySubregionId, param, "out_result");
}

