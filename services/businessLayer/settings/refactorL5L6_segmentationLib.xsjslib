/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var data = mapper.getDataSegmentation();
var AllocationCategory = mapper.getAllocationCategoryLib();
var AllocationOptionLib = mapper.getAllocationOptionLib();
var level4Lib = mapper.getLevel4();
var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var blRegion = mapper.getRegion();
var util = mapper.getUtil();
var businessAttachment = mapper.getAttachment();

/*************************************************/
/**/
var MSG_SEGMENATION_MARKET_CANT_DELETE = "The selected Market can not be deleted because is already in use.";
var MSG_SEGMENATION_SALES_CANT_DELETE = "The selected Sale can not be deleted because is already in use.";
var MSG_SEGMENATION_REGION_BUYING_CANT_DELETE = "The selected Regional buying classification can not be deleted because is already in use.";
var MSG_SEGMENATION_DEPARTMENT_CANT_DELETE = "The selected Department can not be deleted because is already in use.";
var MSG_SEGMENATION_ITEM_INTEREST_CANT_DELETE = "The selected Item of Interest can not be deleted because is already in use.";
var MSG_SEGMENATION_FUNCTION_CANT_DELETE = "The selected Function can not be deleted because is already in use.";
var MSG_SEGMENATION_INDUSTRY_OPTION_CANT_DELETE = "The selected Industry Option can not be deleted because is already in use.";
var MSG_SEGMENATION_TACTIC_CANT_DELETE = "The selected Tactic can not be deleted because is already in use.";


/*CONST*/
var INDUSTRIES = "industries";

var FORM_STATUS = {
    DRAFT: 1
    , COMPLETE: 2
};

var CUSTOMER_TYPE = {
    CUSTOMER: 1
    , NON_CUSTOMER: 2
    , EX_CUSTOMER: 3
};

/*segmentation market region*/

function getAllSegmentationMarket() {
    return data.getAllSegmentationMarket();
}

function getSegmentationMarketById(id) {
    return data.getSegmentationMarketById(id);
}

function getSegmentationFormData(hl4Id) {
    var nonAdministrableFields = data.getSegmentationNonAdministrableFields();
    var hl1 = dataHl1.getHl1ByHl4Id(hl4Id);
    var hl2 = dataHl2.getHl2ByHl4Id(hl4Id);
    var segmentationSale = getAllSegmentationSales();
    var segmentationFunction = getAllSegmentationFunction();
    var segmentationDepartment = getAllSegmentationDepartment();
    return {
        SEGMENTATION_MARKET: getAllSegmentationMarket(),
        SEGMENTATION_TACTIC: getAllSegmentationTactic(),
        SEGMENTATION_SALES: hierarchicalDataParser(segmentationSale),
        SEGMENTATION_REGION_BUYING: getAllSegmentationRegionBuying(),
        SEGMENTATION_FUNCTION: hierarchicalDataParser(segmentationFunction),
        SEGMENTATION_DEPARTMENT: hierarchicalDataParser(segmentationDepartment),
        SEGMENTATION_ITEM_INTEREST: getAllSegmentationItemInterest(),
        SEGMENTATION_CATEGORY_OPTION: getSegmentationCategoryOptionByIndustriesCategory(),
        CAMPAIGN: level4Lib.getHl4ByBudgetYear(hl4Id),
        COUNTRY: nonAdministrableFields.COUNTRY,
        PARTNER: nonAdministrableFields.PARTNER,
        UNQUALIFIED_ADDRESS: nonAdministrableFields.UNQUALIFIED_ADDRESS,
        ACCOUNT_WITH_ACTIVE_PIPELINE: nonAdministrableFields.ACCOUNT_WITH_ACTIVE_PIPELINE,
        ACCOUNT_WITH_ACTIVE_LEAD: nonAdministrableFields.ACCOUNT_WITH_ACTIVE_LEAD,
        MATCH_CRITERIA: nonAdministrableFields.MATCH_CRITERIA,
        TARGET_SELECT_CRITERIA: nonAdministrableFields.TARGET_SELECT_CRITERIA,
        COMPETITOR: nonAdministrableFields.COMPETITOR,
        DEFAULT_REGION_ID: hl1.REGION_ID,
        DEFAULT_MARKET_UNIT_ID: hl2.SUBREGION_ID,
        DEFAULT: {
        		REGION_ID: hl1.REGION_ID
                , MARKET_UNIT_ID: hl2.SUBREGION_ID
            },
        REGION: blRegion.getRegionSubregion()
    };
}

function updateSegmentationMarket(reqbody, userId) {
    return data.updateSegmentationMarket(reqbody.SEGMENTATION_MARKET_ID, reqbody.NAME, userId);
}

function deleteSegmentationMarket(id, userId) {
    if (data.countRelatedSegmentationMarket(id))
        throw ErrorLib.getErrors().CustomError("", "segmentationLib/deleteSegmentationMarket", MSG_SEGMENATION_MARKET_CANT_DELETE);
    return data.deleteSegmentationMarket(id, userId);
}

function insertSegmentationMarket(reqbody, userId) {
    return data.insertSegmentationMarket(reqbody.NAME, userId);
}

function processForm(formData, userId) {
    if (!formData.SEGMENTATION_FORM_ID) {
        return insertSegmentationForm(formData, userId);
    } else {
        return updateSegmentationForm(formData, userId);
    }
}

function getSegmentationFormByHl5Id(hl5Id) {
    var result = {};
    var segmentationForms = data.getSegmentationFormByHl5Id(hl5Id);
    segmentationForms = JSON.parse(JSON.stringify(segmentationForms));
    segmentationForms.forEach(function (segmentationForm) {
        segmentationForm.SEGMENTATION_MARKET = getMarketForEdit(segmentationForm.SEGMENTATION_FORM_ID);
        segmentationForm.SEGMENTATION_SALE = getSaleForEdit(segmentationForm.SEGMENTATION_FORM_ID);
        segmentationForm.SEGMENTATION_INDUSTRY = getIndustryForEdit(segmentationForm.SEGMENTATION_FORM_ID);
        segmentationForm.SEGMENTATION_FUNCTION = getFunctionForEdit(segmentationForm.SEGMENTATION_FORM_ID);
        segmentationForm.SEGMENTATION_DEPARTMENT = getDepartmentForEdit(segmentationForm.SEGMENTATION_FORM_ID);
        segmentationForm.SEGMENTATION_TACTIC = getTacticForEdit(segmentationForm.SEGMENTATION_FORM_ID);
        segmentationForm.SEGMENTATION_ITEM_OF_INTEREST = getItemForInterestForEdit(segmentationForm.SEGMENTATION_FORM_ID);
        segmentationForm.ATTACHMENTS = segmentationForm.ATTACHMENT_ID ? getSegmentationFormAttachment(segmentationForm.ATTACHMENT_ID) : [];
        segmentationForm.TARGET_GROUP_APPROVAL_WORKFLOW = !!segmentationForm.TARGET_GROUP_APPROVAL_WORKFLOW;
        segmentationForm.APPLY_SALE_PLAY_FOR_TARGET = !!segmentationForm.APPLY_SALE_PLAY_FOR_TARGET;
        segmentationForm.APPLY_PREDICTIVE_ANALYTICS_FOR_TARGET = !!segmentationForm.APPLY_PREDICTIVE_ANALYTICS_FOR_TARGET;
        segmentationForm.MATCHING_REQUIRED = !!segmentationForm.APPLY_PREDICTIVE_ANALYTICS_FOR_TARGET;
        segmentationForm.DEFAULT = {
            REGION_ID: segmentationForm.REGION_ID
            , SUBREGION_ID: segmentationForm.SUBREGION_ID
        };
        result[segmentationForm.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID] = segmentationForm;
    });
    return result;
}

function getMarketForEdit(segmentation_form_id) {
    var segmentationMarket = data.getSegmentationFormMarketBySegmentationFormId(segmentation_form_id);
    return segmentationMarket.map(function (elem) {
        return elem.SEGMENTATION_MARKET_ID
    });
}

function getSaleForEdit(segmentation_form_id) {
    var segmentationSale = data.getSegmentationFormSaleBySegmentationFormId(segmentation_form_id);
    return segmentationSale.map(function (elem) {
        return elem.SEGMENTATION_SALE_ID
    });
}

function getIndustryForEdit(segmentation_form_id) {
    var segmentationIndustry = data.getSegmentationFormIndustryBySegmentationFormId(segmentation_form_id);
    return segmentationIndustry.map(function (elem) {
        return elem.SEGMENTATION_INDUSTRY_OPTION_ID
    });
}

function getFunctionForEdit(segmentation_form_id) {
    var segmentationFunction = data.getSegmentationFormFunctionBySegmentationFormId(segmentation_form_id);
    return segmentationFunction.map(function (elem) {
        return elem.SEGMENTATION_FUNCTION_ID
    });
}

function getDepartmentForEdit(segmentation_form_id) {
    var segmentationDepartment = data.getSegmentationFormDepartmentBySegmentationFormId(segmentation_form_id);
    return segmentationDepartment.map(function (elem) {
        return elem.SEGMENTATION_DEPARTMENT_ID
    });
}

function getTacticForEdit(segmentation_form_id) {
    var segmentationTactic = data.getSegmentationFormTacticBySegmentationFormId(segmentation_form_id);
    return segmentationTactic.map(function (elem) {
        return elem.SEGMENTATION_TACTIC_ID
    });
}

function getItemForInterestForEdit(segmentation_form_id) {
    var segmentationItemOfInterest = data.getSegmentationFormItemOfInterestBySegmentationFormId(segmentation_form_id);
    return segmentationItemOfInterest.map(function (elem) {
        return elem.SEGMENTATION_ITEM_OF_INTEREST_ID
    });
}

function getSegmentationFormAttachment(attachmentId) {
    return [businessAttachment.getAttachmentById(attachmentId)];
}

function insertSegmentationForm(segmentationFormInfo, userId) {

    validateSegmentationForm(segmentationFormInfo);

    var segmentationFormId = data.insertSegmentationForm(
        segmentationFormInfo.FORM_STATUS_DETAIL_ID,
        segmentationFormInfo.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID,
        segmentationFormInfo.HL5_ID,
        segmentationFormInfo.REGION_ID || null,
        segmentationFormInfo.SUBREGION_ID || null,
        segmentationFormInfo.COUNTRY || null,
        segmentationFormInfo.HL4_ID,
        segmentationFormInfo.TARGET_GROUP_APPROVAL_WORKFLOW ? 1 : 0,
        segmentationFormInfo.MATCHING_REQUIRED ? 1 : 0,
        segmentationFormInfo.MATCH_CRITERIA_ID || null,
        segmentationFormInfo.NUMBER_OF_RECORD_NEED_MATCHING || null,
        segmentationFormInfo.TARGET_SELECT_CRITERIA_ID || null,
        segmentationFormInfo.SPECIAL_NOTE || null,
        segmentationFormInfo.ATTACHMENT_ID = segmentationFormInfo.ATTACHMENTS && segmentationFormInfo.ATTACHMENTS.length ? segmentationFormInfo.ATTACHMENTS[0].ATTACHMENT_ID : null,
        segmentationFormInfo.REVENUE_RANGE_FROM || null,
        segmentationFormInfo.REVENUE_RANGE_TO || null,
        segmentationFormInfo.CURRENCY_ID || null,
        segmentationFormInfo.NUMBER_OF_EMPLOYEE_FROM || null,
        segmentationFormInfo.NUMBER_OF_EMPLOYEE_TO || null,
        segmentationFormInfo.CUSTOMER_STATUS_ID || null,
        segmentationFormInfo.REGIONAL_BUYING_CLASSIFICATION_ID || null,
        segmentationFormInfo.COMPETITOR_ID || null,
        segmentationFormInfo.PARTNER_ID || null,
        segmentationFormInfo.UNQUALIFIED_ADDRESS_ID || null,
        segmentationFormInfo.ACCOUNT_WITH_ACTIVE_PIPELINE_ID || null,
        segmentationFormInfo.ACCOUNT_WITH_ACTIVE_LEAD_ID || null,
        segmentationFormInfo.CONTACT_DETAIL || null,
        segmentationFormInfo.MAX_CONTACT_PER_ORGANIZATION || null,
        segmentationFormInfo.EXCLUDE_CONTACS_TOUCHED_BY_TELEMARKETING || null,
        segmentationFormInfo.APPLY_SALE_PLAY_FOR_TARGET ? 1 : 0,
        segmentationFormInfo.APPLY_PREDICTIVE_ANALYTICS_FOR_TARGET ? 1 : 0,
        userId,
        segmentationFormInfo.SUMMARY || null
    );

    insertSegmentationFormMarket(segmentationFormInfo, segmentationFormId, userId);

    insertSegmentationFormSale(segmentationFormInfo, segmentationFormId, userId);

    insertSegmentationFormIndustry(segmentationFormInfo, segmentationFormId, userId);

    insertSegmentationFormFunction(segmentationFormInfo, segmentationFormId, userId);

    insertSegmentationFormDepartment(segmentationFormInfo, segmentationFormId, userId);

    insertSegmentationFormTactic(segmentationFormInfo, segmentationFormId, userId);

    insertSegmentationFormItemOfInterest(segmentationFormInfo, segmentationFormId, userId);

    return segmentationFormId;
}

function updateSegmentationForm(segmentationFormInfo, userId) {

    validateSegmentationForm(segmentationFormInfo);

    data.updateSegmentationForm(
        segmentationFormInfo.SEGMENTATION_FORM_ID,
        segmentationFormInfo.FORM_STATUS_DETAIL_ID,
        segmentationFormInfo.HL5_ID,
        segmentationFormInfo.REGION_ID || null,
        segmentationFormInfo.SUBREGION_ID || null,
        segmentationFormInfo.COUNTRY || null,
        segmentationFormInfo.HL4_ID,
        segmentationFormInfo.TARGET_GROUP_APPROVAL_WORKFLOW ? 1 : 0,
        segmentationFormInfo.MATCHING_REQUIRED ? 1 : 0,
        segmentationFormInfo.MATCH_CRITERIA_ID || null,
        segmentationFormInfo.NUMBER_OF_RECORD_NEED_MATCHING || null,
        segmentationFormInfo.TARGET_SELECT_CRITERIA_ID || null,
        segmentationFormInfo.SPECIAL_NOTE || null,
        segmentationFormInfo.ATTACHMENT_ID = segmentationFormInfo.ATTACHMENTS && segmentationFormInfo.ATTACHMENTS.length ? segmentationFormInfo.ATTACHMENTS[0].ATTACHMENT_ID : null,
        segmentationFormInfo.REVENUE_RANGE_FROM || null,
        segmentationFormInfo.REVENUE_RANGE_TO || null,
        segmentationFormInfo.CURRENCY_ID || null,
        segmentationFormInfo.NUMBER_OF_EMPLOYEE_FROM || null,
        segmentationFormInfo.NUMBER_OF_EMPLOYEE_TO || null,
        segmentationFormInfo.CUSTOMER_STATUS_ID || null,
        segmentationFormInfo.REGIONAL_BUYING_CLASSIFICATION_ID || null,
        segmentationFormInfo.COMPETITOR_ID || null,
        segmentationFormInfo.PARTNER_ID || null,
        segmentationFormInfo.UNQUALIFIED_ADDRESS_ID || null,
        segmentationFormInfo.ACCOUNT_WITH_ACTIVE_PIPELINE_ID || null,
        segmentationFormInfo.ACCOUNT_WITH_ACTIVE_LEAD_ID || null,
        segmentationFormInfo.CONTACT_DETAIL || null,
        segmentationFormInfo.MAX_CONTACT_PER_ORGANIZATION || null,
        segmentationFormInfo.EXCLUDE_CONTACS_TOUCHED_BY_TELEMARKETING || null,
        segmentationFormInfo.APPLY_SALE_PLAY_FOR_TARGET ? 1 : 0,
        segmentationFormInfo.APPLY_PREDICTIVE_ANALYTICS_FOR_TARGET ? 1 : 0,
        userId,
        segmentationFormInfo.SUMMARY || null
    );

    updateSegmentationFormMarket(segmentationFormInfo, userId);

    updateSegmentationFormSale(segmentationFormInfo, userId);

    updateSegmentationFormIndustry(segmentationFormInfo, userId);

    updateSegmentationFormFunction(segmentationFormInfo, userId);

    updateSegmentationFormDepartment(segmentationFormInfo, userId);

    updateSegmentationFormTactic(segmentationFormInfo, userId);

    updateSegmentationFormItemOfInterest(segmentationFormInfo, userId);

    return true;
}

function deleteSegmentationForm(hl5Id, userId) {
    var segmentationFormIds = data.getSegmentationFormIdByHl5Id(hl5Id);

    segmentationFormIds.forEach(function (segmentationFormId) {
        data.deleteSegmentationFormMarketBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormSaleBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormIndustryBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormFunctionBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormDepartmentBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormTacticBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormItemOfInterestBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormBySegmentationFormId(segmentationFormId, userId);
    });
}

function deleteSegmentationFormByHl5IdOptionId(hl5Id, optionIds, userId) {
    var segmentationFormIds = data.getSegmentationFormByHl5IdOptionId(hl5Id, optionIds);
    segmentationFormIds.forEach(function (segmentationForm) {
        var segmentationFormId = segmentationForm.SEGMENTATION_FORM_ID;
        data.deleteSegmentationFormMarketBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormSaleBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormIndustryBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormFunctionBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormDepartmentBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormTacticBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormItemOfInterestBySegmentationFormId(segmentationFormId, userId);
        data.deleteSegmentationFormBySegmentationFormId(segmentationFormId, userId);
    });
}

function insertSegmentationFormMarket(segmentationFormInfo, segmentationFormId, userId) {
    var arrSegmentationMarket = [];

    segmentationFormInfo.SEGMENTATION_MARKET.forEach(function (id) {
        arrSegmentationMarket.push({
            in_segmentation_market_id: id,
            in_user_id: userId,
            in_segmentation_form_id: segmentationFormId
        });
    });

    if (arrSegmentationMarket.length)
        data.insertSegmentationFormMarket(arrSegmentationMarket);
}

function insertSegmentationFormSale(segmentationFormInfo, segmentationFormId, userId) {
    var arrSegmentationSale = [];

    segmentationFormInfo.SEGMENTATION_SALE.forEach(function (id) {
        arrSegmentationSale.push({
            in_segmentation_sale_id: id,
            in_user_id: userId,
            in_segmentation_form_id: segmentationFormId
        });
    });

    if (arrSegmentationSale.length)
        data.insertSegmentationFormSale(arrSegmentationSale);
}

function insertSegmentationFormIndustry(segmentationFormInfo, segmentationFormId, userId) {
    var arrSegmentationIndustry = [];

    segmentationFormInfo.SEGMENTATION_INDUSTRY.forEach(function (id) {
        arrSegmentationIndustry.push({
            in_segmentation_industry_id: id,
            in_user_id: userId,
            in_segmentation_form_id: segmentationFormId
        });
    });

    if (arrSegmentationIndustry.length)
        data.insertSegmentationFormIndustry(arrSegmentationIndustry);
}

function insertSegmentationFormFunction(segmentationFormInfo, segmentationFormId, userId) {
    var arrSegmentationFunction = [];

    segmentationFormInfo.SEGMENTATION_FUNCTION.forEach(function (id) {
        arrSegmentationFunction.push({
            in_segmentation_function_id: id,
            in_user_id: userId,
            in_segmentation_form_id: segmentationFormId
        });
    });

    if (arrSegmentationFunction.length)
        data.insertSegmentationFormFunction(arrSegmentationFunction);
}

function insertSegmentationFormDepartment(segmentationFormInfo, segmentationFormId, userId) {
    var arrSegmentationDepartment = [];

    segmentationFormInfo.SEGMENTATION_DEPARTMENT.forEach(function (id) {
        arrSegmentationDepartment.push({
            in_segmentation_department_id: id,
            in_user_id: userId,
            in_segmentation_form_id: segmentationFormId
        });
    });

    if (arrSegmentationDepartment.length)
        data.insertSegmentationFormDepartment(arrSegmentationDepartment);
}

function insertSegmentationFormTactic(segmentationFormInfo, segmentationFormId, userId) {
    var arrSegmentationTactic = [];

    segmentationFormInfo.SEGMENTATION_TACTIC.forEach(function (id) {
        arrSegmentationTactic.push({
            in_segmentation_tactic_id: id,
            in_user_id: userId,
            in_segmentation_form_id: segmentationFormId
        });
    });

    if (arrSegmentationTactic.length)
        data.insertSegmentationFormTactic(arrSegmentationTactic);
}

function insertSegmentationFormItemOfInterest(segmentationFormInfo, segmentationFormId, userId) {
    var arrSegmentationItemOfInterest = [];

    segmentationFormInfo.SEGMENTATION_ITEM_OF_INTEREST.forEach(function (id) {
        arrSegmentationItemOfInterest.push({
            in_segmentation_item_of_interest_id: id,
            in_user_id: userId,
            in_segmentation_form_id: segmentationFormId
        });
    });

    if (arrSegmentationItemOfInterest.length)
        data.insertSegmentationFormItemOfInterest(arrSegmentationItemOfInterest);
}

function updateSegmentationFormMarket(segmentationFormInfo, userId) {
    data.deleteHardSegmentationFormMarketBySegmentationFormId(segmentationFormInfo.SEGMENTATION_FORM_ID);
    insertSegmentationFormMarket(segmentationFormInfo, segmentationFormInfo.SEGMENTATION_FORM_ID, userId)
}

function updateSegmentationFormSale(segmentationFormInfo, userId) {
    data.deleteHardSegmentationFormSaleBySegmentationFormId(segmentationFormInfo.SEGMENTATION_FORM_ID);
    insertSegmentationFormSale(segmentationFormInfo, segmentationFormInfo.SEGMENTATION_FORM_ID, userId)
}

function updateSegmentationFormIndustry(segmentationFormInfo, userId) {
    data.deleteHardSegmentationFormIndustryBySegmentationFormId(segmentationFormInfo.SEGMENTATION_FORM_ID);
    insertSegmentationFormIndustry(segmentationFormInfo, segmentationFormInfo.SEGMENTATION_FORM_ID, userId)
}

function updateSegmentationFormFunction(segmentationFormInfo, userId) {
    data.deleteHardSegmentationFormFunctionBySegmentationFormId(segmentationFormInfo.SEGMENTATION_FORM_ID);
    insertSegmentationFormFunction(segmentationFormInfo, segmentationFormInfo.SEGMENTATION_FORM_ID, userId)
}

function updateSegmentationFormDepartment(segmentationFormInfo, userId) {
    data.deleteHardSegmentationFormDepartmentBySegmentationFormId(segmentationFormInfo.SEGMENTATION_FORM_ID);
    insertSegmentationFormDepartment(segmentationFormInfo, segmentationFormInfo.SEGMENTATION_FORM_ID, userId)
}

function updateSegmentationFormTactic(segmentationFormInfo, userId) {
    data.deleteHardSegmentationFormTacticBySegmentationFormId(segmentationFormInfo.SEGMENTATION_FORM_ID);
    insertSegmentationFormTactic(segmentationFormInfo, segmentationFormInfo.SEGMENTATION_FORM_ID, userId)
}

function updateSegmentationFormItemOfInterest(segmentationFormInfo, userId) {
    data.deleteHardSegmentationFormItemOfInterestBySegmentationFormId(segmentationFormInfo.SEGMENTATION_FORM_ID);
    insertSegmentationFormItemOfInterest(segmentationFormInfo, segmentationFormInfo.SEGMENTATION_FORM_ID, userId)
}

function validateSegmentationForm(segmentationFormInfo) {
    if (segmentationFormInfo.FORM_STATUS_DETAIL_ID == FORM_STATUS.COMPLETE) {
        var requiredFields = getRequiredFields();
        var msg = '';
        Object.keys(requiredFields).forEach(function (field) {
            switch (field) {
                case 'HL5_ID':
                case 'HL4_ID':
                case 'MATCH_CRITERIA_ID':
                case 'NUMBER_OF_RECORD_NEED_MATCHING':
                case 'TARGET_SELECT_CRITERIA_ID':
                case 'COMPETITOR_ID':
                case 'PARTNER_ID':
                case 'UNQUALIFIED_ADDRESS_ID':
                case 'ACCOUNT_WITH_ACTIVE_PIPELINE_ID':
                case 'ACCOUNT_WITH_ACTIVE_LEAD_ID':
                    if (!segmentationFormInfo[field] || !Number(segmentationFormInfo[field])) {
                        msg = requiredFields[field] + ' can not be found.';
                        throw ErrorLib.getErrors().CustomError("", "", msg);
                    }
                    break;
                case 'FUNCTION_ID':
                case 'DEPARTMENT_ID':
                    var object = field === 'FUNCTION_ID' ? 'SEGMENTATION_FUNCTION' : 'SEGMENTATION_DEPARTMENT';

                    if (!segmentationFormInfo[object] || !segmentationFormInfo[object].length) {
                        msg = requiredFields[field] + ' can not be found.';
                        throw ErrorLib.getErrors().CustomError("", "", msg);
                    }

                    segmentationFormInfo[object].forEach(function (id) {
                        if (!id || !Number(id)) {
                            msg = requiredFields[field] + ' ID is invalid.';
                            throw ErrorLib.getErrors().CustomError("", "", msg);
                        }
                    });
                    break;
            }
        });
    }
}

function getRequiredFields() {
    return {
        HL5_ID: 'Tactic ID'
        , HL4_ID: 'Campaign ID'
        , MATCH_CRITERIA_ID: 'Match criteria'
        , NUMBER_OF_RECORD_NEED_MATCHING: 'Number of records that need matching'
        , TARGET_SELECT_CRITERIA_ID: 'Target select criteria'
        , COMPETITOR_ID: 'Competitor'
        , PARTNER_ID: 'Partner'
        , UNQUALIFIED_ADDRESS_ID: 'Unqualified address'
        , ACCOUNT_WITH_ACTIVE_PIPELINE_ID: 'Account with active pipeline'
        , ACCOUNT_WITH_ACTIVE_LEAD_ID: 'Account with active load'
        , FUNCTION_ID: 'Function option'
        , DEPARTMENT_ID: 'Department option'
    };
}

/*end segmentation market region*/

/*segmentation sales region*/

function getAllSegmentationSales() {
    return data.getAllSegmentationSales();
}

function getSegmentationSalesById(id) {
    return data.getSegmentationSalesById(id);
}

function getSegmentationSalesByParentId(id) {
    return data.getSegmentationSalesByParentId(id);
}

function updateSegmentationSales(reqbody, userId) {
    return data.updateSegmentationSales(reqbody.SEGMENTATION_SALES_ID, reqbody.NAME, userId);
}

function deleteSegmentationSales(id, userId) {
    return data.deleteSegmentationSales(id, userId);
}

function insertSegmentationSales(reqbody, userId) {
    return data.insertSegmentationSales(reqbody.NAME, reqbody.PARENT_ID, userId);
}

/*end segmentation sales region*/

/*segmentation region buying*/

function getAllSegmentationRegionBuying() {
    return data.getAllSegmentationRegionBuying();
}

function getSegmentationRegionBuyingById(id) {
    return data.getSegmentationRegionBuyingById(id);
}

function updateSegmentationRegionBuying(reqbody, userId) {
    return data.updateSegmentationRegionBuying(reqbody.SEGMENTATION_REGION_BUYING_ID, reqbody.NAME, userId);
}

function deleteSegmentationRegionBuying(id, userId) {
    if (data.countRelatedSegmentationRegionBuying(id))
        throw ErrorLib.getErrors().CustomError("", "segmentationLib/deleteSegmentationSales", MSG_SEGMENATION_REGION_BUYING_CANT_DELETE);
    return data.deleteSegmentationRegionBuying(id, userId);
}

function insertSegmentationRegionBuying(reqbody, userId) {
    return data.insertSegmentationRegionBuying(reqbody.NAME, userId);
}

/*end segmentation region buying*/

/*segmentation function */

function getAllSegmentationFunction() {
    return data.getAllSegmentationFunction();
}

function getSegmentationFunctionById(id) {
    return data.getSegmentationFunctionById(id);
}

function getSegmentationFunctionByParentId(id) {
    return data.getSegmentationFunctionByParentId(id);
}

function updateSegmentationFunction(reqbody, userId) {
    return data.updateSegmentationFunction(reqbody.SEGMENTATION_FUNCTION_ID, reqbody.NAME, userId);
}

function deleteSegmentationFunction(id, userId) {
    if (data.countRelatedSegmentationFunction(id))
        throw ErrorLib.getErrors().CustomError("", "segmentationLib/deleteSegmentationFunction", MSG_SEGMENATION_FUNCTION_CANT_DELETE);
    return data.deleteSegmentationFunction(id, userId);
}

function insertSegmentationFunction(reqbody, userId) {
    return data.insertSegmentationFunction(reqbody.NAME, reqbody.PARENT_ID, userId);
}

/*end segmentation Department */

/*segmentation function */

function getAllSegmentationDepartment() {
    return data.getAllSegmentationDepartment();
}

function getSegmentationDepartmentById(id) {
    return data.getSegmentationDepartmentById(id);
}

function getSegmentationDepartmentByParentId(id) {
    return data.getSegmentationDepartmentByParentId(id);
}

function updateSegmentationDepartment(reqbody, userId) {
    return data.updateSegmentationDepartment(reqbody.SEGMENTATION_DEPARTMENT_ID, reqbody.NAME, userId);
}

function deleteSegmentationDepartment(id, userId) {
    if (data.countRelatedSegmentationDepartment(id))
        throw ErrorLib.getErrors().CustomError("", "segmentationLib/deleteSegmentationDepartment", MSG_SEGMENATION_DEPARTMENT_CANT_DELETE);
    return data.deleteSegmentationDepartment(id, userId);
}

function insertSegmentationDepartment(reqbody, userId) {
    return data.insertSegmentationDepartment(reqbody.NAME, reqbody.PARENT_ID, userId);
}

/*end segmentation Department */

/*segmentation Item of Interest*/

function getAllSegmentationItemInterest() {
    return data.getAllSegmentationItemInterest();
}

function getSegmentationItemInterestById(id) {
    return data.getSegmentationItemInterestById(id);
}

function updateSegmentationItemInterest(reqbody, userId) {
    return data.updateSegmentationItemInterest(reqbody.SEGMENTATION_ITEM_INTEREST_ID, reqbody.NAME, userId);
}

function deleteSegmentationItemInterest(id, userId) {
    if (data.countRelatedSegmentationItemInterest(id))
        throw ErrorLib.getErrors().CustomError("", "segmentationLib/deleteSegmentationItemInterest", MSG_SEGMENATION_ITEM_INTEREST_CANT_DELETE);
    return data.deleteSegmentationItemInterest(id, userId);
}

function insertSegmentationItemInterest(reqbody, userId) {
    return data.insertSegmentationItemInterest(reqbody.NAME, userId);
}

/*end segmentation Item of Interest*/

/* Segmentation Category Option - Industries*/
function insertSegmentationCategoryOption(reqbody, userId) {
    return data.insertSegmentationCategoryOption(reqbody.SEGMENTATION_CATEGORY_ID, reqbody.NAME, userId)
}

function updateSegmentationCategoryOption(reqbody, userId) {
    return data.updateSegmentationCategoryOption(reqbody.SEGMENTATION_CATEGORY_OPTION_ID, reqbody.NAME, userId)
}

function updateSegmentationCategoryOptionByAllocationCategoryId(allocationCategoryId, allocationOptionList, optionToDelete, userId) {
    var segmentationOptionToDelete = [];
    var segmentationCategoryId = data.getSegmentationCategoryIdByAllocationId(allocationCategoryId);
    if (segmentationCategoryId) {
        var segmentationOptionToInsert = data.getSegmentationCategoryOptionToInsert(allocationOptionList);


        if (optionToDelete && optionToDelete.length)
            segmentationOptionToDelete = data.getSegmentationCategoryOptionToDelete(optionToDelete);

        segmentationOptionToInsert.forEach(function (option) {
            insertSegmentationCategoryOption({
                SEGMENTATION_CATEGORY_ID: segmentationCategoryId,
                NAME: option.NAME
            }, userId);
        });

        segmentationOptionToDelete.forEach(function (option) {
            deleteSegmentationCategoryOption(option.SEGMENTATION_CATEGORY_OPTION_ID, userId);
        });
    }
}

function deleteSegmentationCategoryOption(segmentation_category_option_id, userId) {
    if (data.countRelatedSegmentationIndustryOption(id))
        throw ErrorLib.getErrors().CustomError("", "segmentationLib/deleteSegmentationCategoryOption", MSG_SEGMENATION_INDUSTRY_OPTION_CANT_DELETE);
    return data.deleteSegmentationCategoryOption(segmentation_category_option_id, userId)
}

function getAllSegmentationCategoryOption() {
    //return data.getAllSegmentationCategoryOption();
    var idIndustries = AllocationCategory.getAllocationCategoryByName(INDUSTRIES).CATEGORY_ID;
    var ret = {};
    ret.result = data.getAllSegmentationCategoryOption();
    ret.SEGMENTATION_CATEGORY_ID = data.getSegmentationCategoryIdByAllocationId(idIndustries);
    return ret;
}

function getSegmentationCategoryOptionByIndustriesCategory() {
    var idIndustries = AllocationCategory.getAllocationCategoryByName(INDUSTRIES).CATEGORY_ID;
    //return data.getSegmentationCategoryOptionByCategoryId(Id);
    var ret = {};
    ret.result = data.getAllSegmentationCategoryOption();
    ret.SEGMENTATION_CATEGORY_ID = data.getSegmentationCategoryIdByAllocationId(idIndustries);
    return ret;
}

/* end Segmentation Category Option - Industries*/

function hierarchicalDataParser(data) {
    var result = {};

    data.forEach(function (elem) {
        if (!Number(elem.PARENT_ID)) {
            var id = elem.SEGMENTATION_SALES_ID || elem.SEGMENTATION_FUNCTION_ID || elem.SEGMENTATION_DEPARTMENT_ID;
            if (!result[id]) {
                result[id] = {};
                result[id].CHILDREN = [];
            }

            result[id].NAME = elem.NAME;
            result[id].SEGMENTATION_SALES_ID = elem.SEGMENTATION_SALES_ID;
            result[id].SEGMENTATION_FUNCTION_ID = elem.SEGMENTATION_FUNCTION_ID;
            result[id].SEGMENTATION_DEPARTMENT_ID = elem.SEGMENTATION_DEPARTMENT_ID;
        } else {
            if (!result[elem.PARENT_ID]) {
                result[elem.PARENT_ID] = {
                    CHILDREN: []
                };
            }

            result[elem.PARENT_ID].CHILDREN.push(elem);
        }
    });
    return util.objectToArray(result);
}

/*segmentation Tactic*/

function getAllSegmentationTactic() {
    return data.getAllSegmentationTactic();
}

function getSegmentationTacticById(id) {
    return data.getSegmentationTacticById(id);
}

function updateSegmentationTactic(reqbody, userId) {
    return data.updateSegmentationTactic(reqbody.SEGMENTATION_TACTIC_ID, reqbody.NAME, userId);
}

function deleteSegmentationTactic(id, userId) {
    if (data.countRelatedSegmentationTactic(id))
        throw ErrorLib.getErrors().CustomError("", "segmentationLib/deleteSegmentationTactic", MSG_SEGMENATION_TACTIC_CANT_DELETE);
    return data.deleteSegmentationTactic(id, userId);
}

function insertSegmentationTactic(reqbody, userId) {
    return data.insertSegmentationTactic(reqbody.NAME, userId);
}

/*end segmentation Tactic*/