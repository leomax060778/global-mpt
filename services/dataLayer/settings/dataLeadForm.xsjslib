$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var spInsLeadForm = "INS_LEAD_FORM";
var spUpdLeadForm = "UPD_LEAD_FORM";
var spUpdLeadFormCSDData = "UPD_LEAD_FORM_CSD_DATA";
var spGetLeadFormByHl4Id = "GET_LEAD_FORM_BY_HL4_ID";
var spGetLeadFormById = "GET_LEAD_FORM_BY_ID";
var spGetLeadFormByHl5Id = "GET_LEAD_FORM_BY_HL5_ID";
var spDelLeadFormByHl5Id = "DEL_LEAD_FORM_BY_HL5_ID";

/** GET **/

function getLeadFormByHl4Id(hl4Id){
    var params = {};
    params.in_hl4_id = hl4Id;

    var result = db.executeProcedureManual(spGetLeadFormByHl4Id, params);

    return db.extractArray(result.out_result);
}

function getLeadFormById(leadFormId){
    var params = {};
    params.in_lead_form_id = leadFormId;

    var result = db.executeProcedureManual(spGetLeadFormById, params);

    return (result && result.length)? db.extractArray(result.out_result)[0] : null;
}

function getLeadFormByHl5Id(hl5Id){
    var params = {};
    params.in_hl5_id = hl5Id;

    var result = db.executeProcedureManual(spGetLeadFormByHl5Id, params);

    return db.extractArray(result.out_result);
}

/** INSERT **/
function insertLeadForm(formData, userId){
    var params = {};
    params.in_hl5_id = formData.HL5_ID;
    params.in_form_status_detail_id = formData.FORM_STATUS_DETAIL_ID;
    params.in_service_request_category_option_level_id = formData.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID;
    params.in_summary = formData.SUMMARY;
    params.in_region_id = formData.REGION_ID;
    params.in_subregion_id = formData.SUBREGION_ID;
    params.in_country_id = formData.COUNTRY_ID || null;
    params.in_hl4_id = formData.HL4_ID;
    params.in_special_routing = formData.SPECIAL_ROUTING;
    params.in_target_select_criteria_id = formData.TARGET_SELECT_CRITERIA_ID || null; //Related with: Does your file include CRM ID?
    params.in_special_notes = formData.SPECIAL_NOTES || null;
    params.in_upload_lead = formData.UPLOAD_LEAD || 0;
    params.in_upload_data_source = formData.UPLOAD_DATA_SOURCE || null;
    params.in_upload_data_purpose = formData.UPLOAD_DATA_PURPOSE || null;
    params.in_upload_data_leased = formData.UPLOAD_DATA_LEASED || null;
    params.in_upload_data_source = formData.UPLOAD_DATA_SOURCE || null;
    params.in_upload_dummy_sic_code_approval = formData.UPLOAD_DUMMY_SIC_CODE_APPROVAL || null;
    params.in_upload_dummy_duns_approval = formData.UPLOAD_DUMMY_DUNS_APPROVAL || null;
    params.in_attachment_id = formData.ATTACHMENT_ID || null;
    params.in_number_of_records = formData.NUMBER_OF_RECORDS;
    params.in_complexity = formData.COMPLEXITY || null;

    params.in_csd_self = formData.CSD_SELF || null;
    params.in_csd_id = formData.CSD_ID || null;
    params.in_csd_key = formData.CSD_KEY || null;

    params.in_created_user_id = userId;

    return db.executeScalarManual(spInsLeadForm, params, "out_result");
}

/** UPDATE **/
function updateLeadForm(formData, userId){
    var params = {};
    params.in_form_status_detail_id = formData.FORM_STATUS_DETAIL_ID;
    params.in_summary = formData.SUMMARY;
    params.in_region_id = formData.REGION_ID;
    params.in_subregion_id = formData.SUBREGION_ID;
    params.in_country_id = formData.COUNTRY_ID || null;
    params.in_hl4_id = formData.HL4_ID;
    params.in_special_routing = formData.SPECIAL_ROUTING;
    params.in_target_select_criteria_id = formData.TARGET_SELECT_CRITERIA_ID || null; //Related with: Does your file include CRM ID?
    params.in_special_notes = formData.SPECIAL_NOTES || null;
    params.in_upload_lead = formData.UPLOAD_LEAD || 0;
    params.in_upload_data_source = formData.UPLOAD_DATA_SOURCE || null;
    params.in_upload_data_purpose = formData.UPLOAD_DATA_PURPOSE || null;
    params.in_upload_data_leased = formData.UPLOAD_DATA_LEASED || null;
    params.in_upload_data_source = formData.UPLOAD_DATA_SOURCE || null;
    params.in_upload_dummy_sic_code_approval = formData.UPLOAD_DUMMY_SIC_CODE_APPROVAL || null;
    params.in_upload_dummy_duns_approval = formData.UPLOAD_DUMMY_DUNS_APPROVAL || null;
    params.in_attachment_id = formData.ATTACHMENT_ID || null;
    params.in_number_of_records = formData.NUMBER_OF_RECORDS;
    params.in_complexity = formData.COMPLEXITY || null;

    params.in_modified_user_id = userId;

    return db.executeScalarManual(spUpdLeadForm, params, "out_result");
}

function updateLeadFormCSDData(formData, userId){
    var params = {};
    params.in_csd_self = formData.CSD_SELF || null;
    params.in_csd_id = formData.CSD_ID || null;
    params.in_csd_key = formData.CSD_KEY || null;

    params.in_lead_form_id = formData.LEAD_FORM_ID;
    params.in_modified_user_id = userId;

    return db.executeScalarManual(spUpdLeadFormCSDData, params, "out_result");
}

/** DELETE **/

function deleteLeadFormByHl5Id(hl5Id, userId){
    var params = {};
    params.in_hl5_id = hl5Id;
    params.in_modified_user_id = userId;

    return db.executeScalarManual(spDelLeadFormByHl5Id, params, "out_result");
}