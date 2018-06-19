$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_VALIDATE_DATE_RULE_BY_CAMPAIGN_TYPE_ID_CAMPAIGN_SUBTYPE_ID = "GET_VALIDATE_DATE_RULE_BY_CAMPAIGN_TYPE_ID_CAMPAIGN_SUBTYPE_ID";
var GET_BUDGET_YEAR_BY_HL_ID_BY_LEVEL = "GET_BUDGET_YEAR_BY_HL_ID_BY_LEVEL";

function getValidateDateRule(campaignTypeId, campaignSubTypeId){
        var parameters = {
            in_campaign_type_id: campaignTypeId
            , in_campaign_sub_type_Id: campaignSubTypeId
        };
        return db.executeScalarManual(GET_VALIDATE_DATE_RULE_BY_CAMPAIGN_TYPE_ID_CAMPAIGN_SUBTYPE_ID, parameters, 'out_result');
}

/**
 *
 * @param HlId
 * @param {NVARCHAR(3)}Level - HL1,HL2....HL6
 * @returns {*}
 */
function getBudgetYearByIdLevel(HlId, Level, isLegacy){
    var data = db.executeProcedureManual(GET_BUDGET_YEAR_BY_HL_ID_BY_LEVEL, {in_hl_id: HlId, in_level: Level.toUpperCase(), in_is_legacy: isLegacy || 0});
    return db.extractArray(data.out_result);
}