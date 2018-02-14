/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
var INS_COUNTRY = "INS_COUNTRY";
var UPD_COUNTRY = "UPD_COUNTRY";
var DEL_COUNTRY = "DEL_COUNTRY";


function getAllCountries() {
    var result = db.executeProcedure(GET_ALL_COUNTRIES, {});
    return db.extractArray(result.out_result);
}

function insertCountry(payload, userId) {
    return db.executeScalarManual(INS_COUNTRY, {
        in_created_user_id: userId,
        in_name: payload.NAME,
        in_crm_key: payload.CRM_KEY
    }, 'out_result');
}

function updateCountry(payload, userId) {
    return db.executeScalarManual(UPD_COUNTRY, {
        in_modified_user_id: userId,
        in_country_id: payload.COUNTRY_ID,
        in_name: payload.NAME,
        in_crm_key: payload.CRM_KEY
    }, 'out_result');
}

function deleteCountry(payload, userId) {
    return db.executeScalarManual(DEL_COUNTRY, {in_user_id: userId, in_country_id: payload.COUNTRY_ID}, 'out_result');
}