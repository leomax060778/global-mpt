$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var spGetAllHL4CrmAcronym = 'GET_ALL_HL4_CRM_ACRONYM';
var spGetHL4CrmAcronymById = 'GET_HL4_CRM_ACRONYM_BY_ID';

var spInsertHL4CrmAcronym = 'INS_HL4_CRM_ACRONYM';
var spUpdateHL4CrmAcronym = 'UPD_HL4_CRM_ACRONYM';
var spDeleteHL4CrmAcronym = 'DEL_HL4_CRM_ACRONYM';
var spUpdateHL4HL3CrmAcronym = 'UPD_HL4_HL3_CRM_ACRONYM';
var spGetHL4CrmAcronymByHL3Id = 'GET_HL4_CRM_ACRONYM_BY_HL3_ID';
var spGetHL4CrmAcronymByHL3Acronym = 'GET_HL4_CRM_ACRONYM_BY_HL3_ACRONYM';
var spUpdateHl4ByHl3CrmAcronym = 'UPD_HL4_BY_HL3_CRM_ACRONYM';

var spGetHL4CrmAcronymByAcronym = 'GET_HL4_CRM_ACRONYM_BY_ACRONYM';


/*********************HL3*******************************/
var spGetAllHL3CrmAcronym = 'GET_ALL_HL3_CRM_ACRONYM';
var spGetHL3CrmAcronymById = 'GET_HL3_CRM_ACRONYM_BY_ID';
var spGetHL3CrmAcronymByAcronym = 'GET_HL3_CRM_ACRONYM_BY_ACRONYM';

var spInsertHL3CrmAcronym = 'INS_HL3_CRM_ACRONYM';
var spUpdateHL3CrmAcronym = 'UPD_HL3_CRM_ACRONYM';
var spDeleteHL3CrmAcronym = 'DEL_HL3_CRM_ACRONYM';
/*********************************************************/

/**************HL4*********************************/
function getAllHl4CrmAcronym(){
    var param = {};
    param.out_result = '?';
    var result = db.executeProcedure(spGetAllHL4CrmAcronym, param);
    return db.extractArray(result.out_result);
}

function getHl4CrmAcronymById(hl4CrmAcronymId){

    var param = {};
    param.in_hl4_crm_acronym_id = hl4CrmAcronymId;
    param.out_result = '?';

    var result = db.executeProcedureManual(spGetHL4CrmAcronymById, param);
    return db.extractArray(result.out_result);
}

function getHl4CrmAcronymByHL3Acronym(hl3Acronym){
    var param = {};
    param.in_hl3_crm_acronym = hl3Acronym;
    param.out_result = '?';

    var result = db.executeProcedureManual(spGetHL4CrmAcronymByHL3Acronym, param);
    return db.extractArray(result.out_result);
}

function getHl4CrmAcronymByHL3Id(hl3CrmAcronymId){

    var param = {};
    param.in_hl3_crm_acronym_id = hl3CrmAcronymId;
    param.out_result = '?';

    var result = db.executeProcedureManual(spGetHL4CrmAcronymByHL3Id, param);
    var rdoExtract= {}
    rdoExtract.assigned=  db.extractArray(result.out_result);
    rdoExtract.availables =  db.extractArray(result.out_result_availables);

    return rdoExtract;
}

function getHl4CrmAcronymByAcronym(hl4CrmAcronym){

    var param = {};
    param.in_hl4_crm_acronym = hl4CrmAcronym;
    param.out_result = '?';

    var result = db.executeProcedureManual(spGetHL4CrmAcronymByAcronym, param);
    return db.extractArray(result.out_result);
}


function insertHl4CrmAcronym(objHL4CrmAcronym, userId){

    var param = {};
    param.in_acronym = objHL4CrmAcronym.ACRONYM;
    param.in_crm_description = objHL4CrmAcronym.CRM_DESCRIPTION || "";
    param.in_details = objHL4CrmAcronym.DETAILS || "";
    param.in_business_details = objHL4CrmAcronym.BUSINESS_DETAILS || "";
    param.in_created_user_id = userId;
    param.out_result = '?';

    return db.executeScalar(spInsertHL4CrmAcronym, param, 'out_result');
}

function updateHl4_HL3_CrmAcronym(hl3Id, hl4Id, userId){
    var param = {};
    param.in_hl3_crm_acronym_id = hl3Id;
    param.in_hl4_crm_acronym_id = hl4Id;
    param.in_modified_user_id = userId;
    param.out_result = '?';

    return db.executeScalar(spUpdateHL4HL3CrmAcronym, param, 'out_result');
}

function updateHl4CrmAcronym(objHL4CrmAcronym, userId){
    var param = {};
    param.in_hl4_crm_acronym_id = objHL4CrmAcronym.HL4_CRM_ACRONYM_ID;
    param.in_acronym = objHL4CrmAcronym.ACRONYM;
    param.in_crm_description = objHL4CrmAcronym.CRM_DESCRIPTION;
    param.in_details = objHL4CrmAcronym.DETAILS;
    param.in_business_details = objHL4CrmAcronym.BUSINESS_DETAILS;
    param.in_modified_user_id = userId;
    param.out_result = '?';

    return db.executeScalar(spUpdateHL4CrmAcronym, param, 'out_result');
}


function updateHl4ByHl3CrmAcronym(hl3CrmAcronymId, hl4CrmAcronymList, userId){
    //throw JSON.stringify({hl3CrmAcronymId:hl3CrmAcronymId, hl4CrmAcronymList:hl4CrmAcronymList});
    var param = [];
    for(var i=0;i < hl4CrmAcronymList.length ; i++){
        var obj = {IN_HL4_CRM_ACRONYM_ID:hl4CrmAcronymList[i].HL4_CRM_ACRONYM_ID,
            IN_HL3_CRM_ACRONYM_ID:hl3CrmAcronymId,
            IN_USER_ID: userId};
        param.push(obj);
    }
    return db.executeScalar(spUpdateHl4ByHl3CrmAcronym, param, 'out_result');
}

function deleteHl4CrmAcronym(hl4CrmAcronymId, userId){
    var param = {};
    param.in_hl4_crm_acronym_id = hl4CrmAcronymId;
    param.in_modified_user_id = userId;
    param.out_result = '?';

    return db.executeScalar(spDeleteHL4CrmAcronym, param, 'out_result');
}

/*********************HL3************************/
function getAllHl3CrmAcronym(){
    var param = {};
    param.out_result = '?';
    var result = db.executeProcedure(spGetAllHL3CrmAcronym, param);
    return db.extractArray(result.out_result);
}

function getHl3CrmAcronymById(hl3CrmAcronymId){

    var param = {};
    param.in_hl3_crm_acronym_id = hl3CrmAcronymId;
    param.out_result = '?';

    var result = db.executeProcedureManual(spGetHL3CrmAcronymById, param);
    return db.extractArray(result.out_result);
}

function getHl3CrmAcronymByAcronym(hl3CrmAcronym){

    var param = {};
    param.in_hl3_crm_acronym = hl3CrmAcronym;
    param.out_result = '?';

    var result = db.executeProcedureManual(spGetHL3CrmAcronymByAcronym, param);
    return db.extractArray(result.out_result);
}



function insertHl3CrmAcronym(objHL3CrmAcronym, userId){
    var param = {};
    param.in_acronym = objHL3CrmAcronym.ACRONYM;
    param.in_crm_description = objHL3CrmAcronym.CRM_DESCRIPTION;
    param.in_created_user_id = userId;
    param.out_result = '?';

    return db.executeScalar(spInsertHL3CrmAcronym, param, 'out_result');
}

function updateHl3CrmAcronym(objHL3CrmAcronym, userId){
    var param = {};
    param.in_hl3_crm_acronym_id = objHL3CrmAcronym.HL3_CRM_ACRONYM_ID;
    param.in_acronym = objHL3CrmAcronym.ACRONYM;
    param.in_crm_description = objHL3CrmAcronym.CRM_DESCRIPTION;
    param.in_modified_user_id = userId;
    param.out_result = '?';

    return db.executeScalar(spUpdateHL3CrmAcronym, param, 'out_result');
}

function deleteHl3CrmAcronym(hl3CrmAcronymId, userId){
    var param = {};
    param.in_hl3_crm_acronym_id = hl3CrmAcronymId;
    param.in_modified_user_id = userId;
    param.out_result = '?';

    return db.executeScalar(spDeleteHL3CrmAcronym, param, 'out_result');
}