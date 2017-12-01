/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/
var GET_ALL_EXPECTED_OUTCOME = "GET_ALL_EXPECTED_OUTCOME";
var INS_EXPECTED_OUTCOME = "INS_EXPECTED_OUTCOME";
var UPD_EXPECTED_OUTCOME = "UPD_EXPECTED_OUTCOME";
var DEL_EXPECTED_OUTCOME = "DEL_EXPECTED_OUTCOME";
var GET_EXPECTED_OUTCOME_BY_NAME = "GET_EXPECTED_OUTCOME_BY_NAME";
var GET_EXPECTED_OUTCOME_BY_ID = "GET_EXPECTED_OUTCOME_BY_ID";
var GET_EXPECTED_OUTCOME_IN_USE_BY_EXPECTED_OUTCOME_ID = "GET_EXPECTED_OUTCOME_IN_USE_BY_EXPECTED_OUTCOME_ID";
var GET_EXPECTED_OUTCOME_LEVEL_BY_LEVEL_OPTION = "GET_EXPECTED_OUTCOME_LEVEL_BY_LEVEL_OPTION"

/*************************************************/
var spGetExpOutByHl4Id = "GET_EXPECTED_OUTCOMES_BY_HL4_ID";
var spGetExpOutDetail = "GET_EXPECTED_OUTCOMES_DETAILS_EO_ID";
var spGetExpOutcomeById = "GET_EXPECTED_OUTCOME_BY_ID";
var spGetAllOutcomeType = "GET_ALL_OUTCOMES_TYPE";
var spGetAllOutcome = "GET_ALL_OUTCOMES";
var spInsertExpOutcome = "INS_HL4_EXPECTED_OUTCOMES";
var spInsertExpOutcomeDetail = "INS_HL4_EXPECTED_OUTCOMES_DETAIL";

var spDeleteExpOutcome = "DEL_HL4_EXPECTED_OUTCOMES_BY_HL4_ID";
var spDeleteExpOutcomeDetail = "DEL_HL4_EXPECTED_OUTCOMES_DETAIL_BY_HL4_ID";
/******************************************************/

/**L2***********************************************/
var spGetExpOutByHl2Id = "GET_EXPECTED_OUTCOMES_BY_HL2_ID";
var GET_HL2_KPI_BY_HL2_ID = "GET_HL2_KPI_BY_HL2_ID";
var spInsertHl2ExpOutcome = "INS_HL2_EXPECTED_OUTCOMES";
var spInsertHl2ExpOutcomeDetail = "INS_HL2_EXPECTED_OUTCOMES_DETAIL";
var spDeleteHl2ExpOutcome = "DEL_HL2_EXPECTED_OUTCOMES_BY_HL2_ID";
var spDeleteHl2ExpOutcomeDetail = "DEL_HL2_EXPECTED_OUTCOMES_DETAIL_BY_HL2_ID";
/****end L2**************************************************/

/**L3***********************************************/
var spGetExpOutByHl3Id = "GET_EXPECTED_OUTCOMES_BY_HL3_ID";
var GET_HL3_KPI_BY_HL3_ID = "GET_HL3_KPI_BY_HL3_ID";
var spInsertHl3ExpOutcome = "INS_HL3_EXPECTED_OUTCOMES";
var spInsertHl3ExpOutcomeDetail = "INS_HL3_EXPECTED_OUTCOMES_DETAIL";
var spDeleteHl3ExpOutcome = "DEL_HL3_EXPECTED_OUTCOMES_BY_HL3_ID";
var spDeleteHl3ExpOutcomeDetail = "DEL_HL3_EXPECTED_OUTCOMES_DETAIL_BY_HL3_ID";
/****end L6**************************************************/

/**L5***********************************************/
var spGetExpOutByHl5Id = "GET_EXPECTED_OUTCOMES_BY_HL5_ID";
var GET_HL5_KPI_BY_HL5_ID = "GET_HL5_KPI_BY_HL5_ID";
var spInsertHl5ExpOutcome = "INS_HL5_EXPECTED_OUTCOMES";
var spInsertHl5ExpOutcomeDetail = "INS_HL5_EXPECTED_OUTCOMES_DETAIL";
var spDeleteHl5ExpOutcome = "DEL_HL5_EXPECTED_OUTCOMES_BY_HL5_ID";
var spDeleteHl5ExpOutcomeDetail = "DEL_HL5_EXPECTED_OUTCOMES_DETAIL_BY_HL5_ID";
var spDeleteHl5ExpOutcomeDetailHard = "DEL_HL5_EXPECTED_OUTCOMES_DETAIL_BY_HL5_ID_HARD";
var spDeleteHl6ExpOutcomeDetailHard = "DEL_HL6_EXPECTED_OUTCOMES_DETAIL_BY_HL6_ID_HARD";
var spDeleteHl5ExpOutcomeHard = "DEL_HL5_EXPECTED_OUTCOMES_BY_HL5_ID_HARD";
var spDeleteHl6ExpOutcomeHard = "DEL_HL6_EXPECTED_OUTCOMES_BY_HL6_ID_HARD";
/****end L5**************************************************/

/**L6***********************************************/
var spGetExpOutByHl6Id = "GET_EXPECTED_OUTCOMES_BY_HL6_ID";
var GET_HL6_KPI_BY_HL6_ID = "GET_HL6_KPI_BY_HL6_ID";
var spInsertHl6ExpOutcome = "INS_HL6_EXPECTED_OUTCOMES";
var spInsertHl6ExpOutcomeDetail = "INS_HL6_EXPECTED_OUTCOMES_DETAIL";
var spDeleteHl6ExpOutcome = "DEL_HL6_EXPECTED_OUTCOMES_BY_HL6_ID";
var spDeleteHl6ExpOutcomeDetail = "DEL_HL6_EXPECTED_OUTCOMES_DETAIL_BY_HL6_ID";
/****end L6**************************************************/


/**L1***********************************************/
// var spGetExpOutByHl1Id = "GET_EXPECTED_OUTCOMES_BY_HL1_ID";
// var GET_KPI_BY_HL1_ID = "GET_KPI_BY_HL1_ID";
var GET_HL1_KPI_BY_HL1_ID = "GET_HL1_KPI_BY_HL1_ID";
var spInsertHl1ExpOutcome = "INS_HL1_EXPECTED_OUTCOMES";
var spInsertHl1ExpOutcomeDetail = "INS_HL1_EXPECTED_OUTCOMES_DETAIL";
var spDeleteHl1ExpOutcome = "DEL_HL1_EXPECTED_OUTCOMES_BY_HL1_ID";
var spDeleteHl1ExpOutcomeDetail = "DEL_HL1_EXPECTED_OUTCOMES_DETAIL_BY_HL1_ID";
/****end L2**************************************************/


function insertExpectedOutcome(name,userId,autoCommit){
    var params = {
        'in_name': name,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(INS_EXPECTED_OUTCOME,params,'out_outcome_id');
    }else{
        rdo = db.executeScalarManual(INS_EXPECTED_OUTCOME,params,'out_outcome_id');
    }
    return rdo;
}

function updateExpectedOutcome(expected_outcome_id,name,userId,autoCommit){
    var params = {
        'in_expected_outcome_id': expected_outcome_id,
        'in_name': name,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(UPD_EXPECTED_OUTCOME,params,'out_result');
    }else{
        rdo = db.executeScalarManual(UPD_EXPECTED_OUTCOME,params,'out_result');
    }
    return rdo;
}

function deleteExpectedOutcome(expected_outcome_id,userId, autoCommit){
    var params = {
        'in_expected_outcome_id' : expected_outcome_id,
        'in_user_id': userId
    };
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(DEL_EXPECTED_OUTCOME,params,'out_result');
    }else{
        rdo = db.executeScalarManual(DEL_EXPECTED_OUTCOME,params,'out_result');
    }
    return rdo;
}

function getAllExpectedOutcomes(){
    var params = {};
    var list = db.executeProcedureManual(GET_ALL_EXPECTED_OUTCOME, params);
    return db.extractArray(list.out_result);
}

function getExpectedOutcomeById(expected_outcome_id){
    var params = {
        'in_expected_outcome_id': expected_outcome_id
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_BY_ID, params);
    return db.extractArray(list.out_result)[0];
}

function getExpectedOutcomeLevelByLevelAndOptionId(levelName, optionId){
    var params = {
        'in_hierarchy_level_id': levelName
        ,'in_outcomes_id': optionId
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_LEVEL_BY_LEVEL_OPTION, params);
    return db.extractArray(list.out_result)[0];
}



function getExpectedOutcomeInUseByExpectedOutcomeId(expected_outcome_id){
    var params = {
        'in_expected_outcome_id': expected_outcome_id
    };
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_IN_USE_BY_EXPECTED_OUTCOME_ID, params);
    return db.extractArray(list.out_result);
}

function getExpectedOutcomeByName(name){
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_EXPECTED_OUTCOME_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function getExpectedOutcomeByHl4Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl4Id, {'in_hl4_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutDetail, {'in_hl4_expected_outcomes_id':id});
        return db.extractArray(rdo.out_expected_outcomes_details);
    }
    return null;
}

function getExpOutById(id){
    if(id != ""){
        var rdo = db.executeProcedure(spGetExpOutcomeById,{'in_expected_outcome_id':id});
        return db.extractArray(rdo.out_expOut);
    }
    return null;
}

function getAllOutcomes(parametrs){
    if(parametrs.HL_ID != ""){
        var rdo = db.executeProcedure(spGetAllOutcome,parametrs);
        return db.extractArray(rdo.out_outcomes);
    }
    return null;
}

function getAllOutcomesType(parametrs){
    if(parametrs.HL_ID != ""){
        var rdo = db.executeProcedure(spGetAllOutcomeType,parametrs);
        return db.extractArray(rdo.out_outcomes_type);
    }
    return null;
}

function insertHl4ExpectedOutcomes(parameters){
    var rdo = db.executeScalarManual(spInsertExpOutcome, parameters, 'out_hl4_expected_outcomes_id');
    return rdo;
}

function insertHl4ExpectedOutcomesDetail(parameters){
    var rdo = db.executeScalarManual(spInsertExpOutcomeDetail, parameters, 'out_hl4_expected_outcomes_details_id');
    return rdo;
}

function deleteHl4ExpectedOutcomes(parameters){
    var rdo = db.executeScalarManual(spDeleteExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl4ExpectedOutcomesDetail(parameters){
    var rdo = db.executeScalarManual(spDeleteExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}


/**HL5****************************/
function getExpectedOutcomeByHl5Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl5Id, {'in_hl5_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getHl5ExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(GET_HL5_KPI_BY_HL5_ID, {'in_hl5_id':id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function insertHl5ExpectedOutcomes(in_hl5_id, in_comments, in_created_user_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    parameters.in_comments = in_comments;
    parameters.in_created_user_id = in_created_user_id;
    var rdo = db.executeScalarManual(spInsertHl5ExpOutcome, parameters, 'out_hl5_expected_outcomes_id');
    return rdo;
}

function insertHl5ExpectedOutcomesDetail(hl5ExpectedOutcomesDetail){
    var rdo = db.executeScalarManual(spInsertHl5ExpOutcomeDetail, hl5ExpectedOutcomesDetail, 'out_hl5_expected_outcomes_details_id');
    return rdo;
}

function deleteHl5ExpectedOutcomes(in_hl5_id, in_user_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl5ExpectedOutcomesHard(in_hl5_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcomeHard, parameters, 'out_result');
    return rdo;
}

function deleteHl5ExpectedOutcomesDetail(in_hl5_id, in_user_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}

function deleteHl5ExpectedOutcomesDetailHard(in_hl5_id){
    var parameters = {};
    parameters.in_hl5_id = in_hl5_id;
    var rdo = db.executeScalarManual(spDeleteHl5ExpOutcomeDetailHard, parameters, 'out_result');
    return rdo;
}
/**FIN HL5****************************/

/**HL6****************************/
function deleteHl6ExpectedOutcomesHard(in_hl6_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcomeHard, parameters, 'out_result');
    return rdo;
}

function deleteHl6ExpectedOutcomesDetailHard(in_hl6_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcomeDetailHard, parameters, 'out_result');
    return rdo;
}

function getExpectedOutcomeByHl6Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl6Id, {'in_hl6_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getHl6ExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(GET_HL6_KPI_BY_HL6_ID, {'in_hl6_id':id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function getExpectedOutcomeByHl2Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl2Id, {'in_hl2_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getHl2ExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(GET_HL2_KPI_BY_HL2_ID, {'in_hl2_id':id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function getExpectedOutcomeByHl3Id(id){
    if(id){
        var rdo = db.executeProcedure(spGetExpOutByHl3Id, {'in_hl3_id':id});
        return db.extractArray(rdo.out_expected_outcomes);
    }
    return null;
}

function getHl3ExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(GET_HL3_KPI_BY_HL3_ID, {'in_hl3_id':id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function insertHl2ExpectedOutcomes(in_hl2_id, in_comments, in_created_user_id){
    var parameters = {};
    parameters.in_hl2_id = in_hl2_id;
    parameters.in_comments = in_comments;
    parameters.in_created_user_id = in_created_user_id;
    var rdo = db.executeScalarManual(spInsertHl2ExpOutcome, parameters, 'out_hl2_expected_outcomes_id');
    return rdo;
}

function insertHl2ExpectedOutcomesDetail(arrL2Kpi){
    var rdo = db.executeScalarManual(spInsertHl2ExpOutcomeDetail, arrL2Kpi, 'out_hl2_expected_outcomes_details_id');
    return rdo;
}

function insertHl3ExpectedOutcomes(in_hl3_id, in_comments, in_created_user_id){
    var parameters = {};
    parameters.in_hl3_id = in_hl3_id;
    parameters.in_comments = in_comments;
    parameters.in_created_user_id = in_created_user_id;
    var rdo = db.executeScalarManual(spInsertHl3ExpOutcome, parameters, 'out_hl3_expected_outcomes_id');
    return rdo;
}

function insertHl3ExpectedOutcomesDetail(arrL3Kpi){
    /*var parameters = {};
    parameters.in_hl3_expected_outcomes_id = in_hl3_expected_outcomes_id;
    parameters.in_expected_outcome_level_id = in_expected_outcome_level_id;
    parameters.in_euro_value = in_euro_value;
    parameters.in_volume_value = in_volume_value;
    parameters.in_created_user_id = in_created_user_id;
*/
    var rdo = db.executeScalarManual(spInsertHl3ExpOutcomeDetail, arrL3Kpi, 'out_hl3_expected_outcomes_details_id');
    return rdo;
}

function insertHl6ExpectedOutcomes(in_hl6_id, in_comments, in_created_user_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    parameters.in_comments = in_comments;
    parameters.in_created_user_id = in_created_user_id;
    var rdo = db.executeScalarManual(spInsertHl6ExpOutcome, parameters, 'out_hl6_expected_outcomes_id');
    return rdo;
}

function insertHl6ExpectedOutcomesDetail(hl6ExpectedOutcomesDetail){
    var rdo = db.executeScalarManual(spInsertHl6ExpOutcomeDetail, hl6ExpectedOutcomesDetail, 'out_hl6_expected_outcomes_details_id');
    return rdo;
}

function deleteHl2ExpectedOutcomes(in_hl2_id, in_user_id){
    var parameters = {};
    parameters.in_hl2_id = in_hl2_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl2ExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl2ExpectedOutcomesDetail(in_hl2_id, in_user_id){
    var parameters = {};
    parameters.in_hl2_id = in_hl2_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl2ExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}

function deleteHl3ExpectedOutcomes(in_hl3_id, in_user_id){
    var parameters = {};
    parameters.in_hl3_id = in_hl3_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl3ExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl3ExpectedOutcomesDetail(in_hl3_id, in_user_id){
    var parameters = {};
    parameters.in_hl3_id = in_hl3_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl3ExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}

function deleteHl6ExpectedOutcomes(in_hl6_id, in_user_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl6ExpectedOutcomesDetail(in_hl6_id, in_user_id){
    var parameters = {};
    parameters.in_hl6_id = in_hl6_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl6ExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}
/**FIN HL6****************************/


/*L1*/
function getExpectedOutcomeByHL1Id(id){
    if(id){
        var rdo = db.executeProcedure(GET_KPI_BY_HL1_ID, {'in_hl1_id':id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function getHL1ExpectedOutcomeDetailById(id){
    if(id){
        var rdo = db.executeProcedure(GET_HL1_KPI_BY_HL1_ID, {'in_hl1_id':id});
        return db.extractArray(rdo.out_result);
    }
    return null;
}

function insertHL1ExpectedOutcomes(in_hl1_id, in_comments, in_created_user_id){
    var parameters = {};
    parameters.in_hl1_id = in_hl1_id;
    parameters.in_comments = in_comments;
    parameters.in_created_user_id = in_created_user_id;
    var rdo = db.executeScalarManual(spInsertHl1ExpOutcome, parameters, 'out_hl1_expected_outcomes_id');
    return rdo;
}

function insertHL1ExpectedOutcomesDetail(hl1ExpectedOutcomesDetail){//in_hl1_expected_outcomes_id, in_expected_outcome_level_id, in_euro_value, in_volume_value, in_created_user_id){
    // var parameters = {};
    // parameters.in_hl1_expected_outcomes_id = in_hl1_expected_outcomes_id;
    // parameters.in_expected_outcome_level_id = in_expected_outcome_level_id;
    // parameters.in_euro_value = in_euro_value;
    // parameters.in_volume_value = in_volume_value;
    // parameters.in_created_user_id = in_created_user_id;

    var rdo = db.executeScalarManual(spInsertHl1ExpOutcomeDetail, hl1ExpectedOutcomesDetail, 'out_hl1_expected_outcomes_details_id');
    return rdo;
}

function deleteHl1ExpectedOutcomes(in_hl1_id, in_user_id){
    var parameters = {};
    parameters.in_hl1_id = in_hl1_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl1ExpOutcome, parameters, 'out_result');
    return rdo;
}

function deleteHl1ExpectedOutcomesDetail(in_hl1_id, in_user_id){
    var parameters = {};
    parameters.in_hl1_id = in_hl1_id;
    parameters.in_user_id = in_user_id;
    var rdo = db.executeScalarManual(spDeleteHl1ExpOutcomeDetail, parameters, 'out_result');
    return rdo;
}
/***************************/