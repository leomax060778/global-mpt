/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetOutcomesTypeByHlId = "GET_OUTCOMES_TYPE_BY_HL_ID";
var GET_KPI_BY_HL_ID = "GET_KPI_BY_HL_ID";
var spInsertOutcomesType = "INS_OUTCOMES_TYPE";
var spUpdateOutcomesType = "UPD_OUTCOMES_TYPE";
var spDeleteOutcomesType = "DEL_OUTCOMES_TYPE";
/******************************************************/
var hierarchyLevel = {
	"hl0": 6, //HL1
    "hl1": 5, //HL2
    "hl2": 4, //HL3
    "hl3": 1, //HL4
    "hl4": 2, //HL5
    "hl5": 3  //HL6
}

function getOutcomesTypeByHlId(hl){
	if(hl){
		var rdo = db.executeProcedure(spGetOutcomesTypeByHlId, {'in_hl_id':hierarchyLevel[hl.toLowerCase()]});
		return db.extractArray(rdo.out_outcomes_type);
	}	
	return null;
};

function getKpiListByHlId(hl){
    if(hl){
        var rdo = db.executeProcedure(GET_KPI_BY_HL_ID, {'in_hl_id':hierarchyLevel[hl.toLowerCase()]});
        return db.extractArray(rdo.out_result);
    }
    return [];
};

function insertOutcomesType(parameters){
	return db.executeScalar(spInsertOutcomesType, parameters, 'out_outcomes_type_id');
}

function updateOutcomesType(parameters){
	return db.executeScalar(spUpdateOutcomesType, parameters, 'out_result');
}

function deleteOutcomesType(id, userId){
	if(id){
		return db.executeScalar(spDeleteOutcomesType, {'in_outcomes_type_id': id, 'in_user_id': userId}, 'out_result');
	}	
	return null;
}