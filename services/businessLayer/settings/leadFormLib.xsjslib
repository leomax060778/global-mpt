/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var data = mapper.getDataLeadForm();
var apiCSD = mapper.getApiCSD();

/************** validation messages ***************/
var idNotFound = "The Lead Form can not be found";
var l5NotFound = "The L5 can not be found";
var userNotFound = "The User can not be found";
var statusDetailNotFound = "The Status Detail can not be found";
var summaryNotFound = "The Summary can not be found";
var regionNotFound = "The Region can not be found";
var subregionNotFound = "The Market Unit can not be found";
var campaignNotFound = "The Campaign ID can not be found";
var numberOfRecordNotFound = "The Number of Records can not be found";
var categoryOptionNotFound = "The Option related can not be found";

/** CONST **/
var FORM_STATUS_DETAIL = {
    DRAFT: 1,
    COMPLETE: 2
};
/** GET **/

function getLeadFormByHl4Id(hl4Id){
    if(!hl4Id){
        throw ErrorLib.getErrors().CustomError("", "", campaignNotFound);
    }

    return data.getLeadFormByHl4Id(hl4Id);
}

function getLeadFormById(leadFormId){
    if(!leadFormId){
        throw ErrorLib.getErrors().CustomError("", "", idNotFound);
    }

    return data.getLeadFormById(leadFormId);
}

function getLeadFormByHl5Id(hl5Id){
    if(!hl5Id){
        throw ErrorLib.getErrors().CustomError("", "", l5NotFound);
    }

    var leadResult = JSON.parse(JSON.stringify(data.getLeadFormByHl5Id(hl5Id)));
    var result = {};
    
    leadResult.forEach(function (leadForm) {
        leadForm.ATTACHMENTS = [];
        if(leadForm.ATTACHMENT_ID){
            leadForm.ATTACHMENTS.push({
                ATTACHMENT_ID: leadForm.ATTACHMENT_ID,
                ATTACHMENT_SIZE: (parseFloat(Number(leadForm.ATTACHMENT_SIZE) / 1048576).toFixed(2)) + " MB",
                ORIGINAL_NAME: leadForm.ORIGINAL_NAME,
                SAVED_NAME: leadForm.SAVED_NAME,
                USER_ID: leadForm.ATTACHMENT_USER_ID,
                CREATED_DATE: leadForm.ATTACHMENT_CREATED_DATE
            });
        }
        result[leadForm.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID] = leadForm;
    });
    
    return result;
}

/** INSERT **/
function insertLeadForm(formData, userId){
    validateInsertLeadForm(formData, userId);

    var csdResult = false;
    
    //Parsing attachment
    if(formData.ATTACHMENTS && formData.ATTACHMENTS.length){
        formData.ATTACHMENT_ID = formData.ATTACHMENTS[0].ATTACHMENT_ID;
    }
    var result = data.insertLeadForm(formData, userId);
    if(result && Number(formData.FORM_STATUS_DETAIL_ID) === FORM_STATUS_DETAIL.COMPLETE && !formData.CSD_ID){
        csdResult = apiCSD.createLeadFormInCsd(formData);
    }
    // throw JSON.stringify({csdResult: csdResult});
    if(csdResult && Object.keys(csdResult).length){
        var csdData = {};
        csdData.LEAD_FORM_ID = result;
        csdData.CSD_ID = csdResult.id;
        csdData.CSD_KEY = csdResult.key;
        csdData.CSD_SELF = csdResult.self;

        updateLeadFormCSDData(csdData, userId);
    }

    return result;
}

/** UPDATE **/
function updateLeadForm(formData, userId){
    validateUpdateLeadForm(formData, userId);

    return data.updateLeadForm(formData, userId);
}

function updateLeadFormCSDData(csdData, userId){
    return data.updateLeadFormCSDData(csdData, userId);
}

/** DELETE **/

function deleteLeadFormByHl5Id(hl5Id, userId){
    return data.deleteLeadFormByHl5Id(hl5Id, userId);
}

/** VALIDATION **/
function validateInsertLeadForm(data, userId){
    if(!userId){
        throw ErrorLib.getErrors().CustomError("", "", userNotFound);
    }

    if(!data.HL5_ID){
        throw ErrorLib.getErrors().CustomError("", "", l5NotFound);
    }

    if(!data.FORM_STATUS_DETAIL_ID){
        throw ErrorLib.getErrors().CustomError("", "", statusDetailNotFound);
    }

    if(!data.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID){
        throw ErrorLib.getErrors().CustomError("", "", categoryOptionNotFound);
    }

    //If it isn't a draft
    if(Number(data.FORM_STATUS_DETAIL_ID) === FORM_STATUS_DETAIL.COMPLETE){
        if(!data.SUMMARY){
            throw ErrorLib.getErrors().CustomError("", "", summaryNotFound);
        }

        if(!data.REGION_ID){
            throw ErrorLib.getErrors().CustomError("", "", regionNotFound);
        }

        if(!data.SUBREGION_ID){
            throw ErrorLib.getErrors().CustomError("", "", subregionNotFound);
        }

        if(!data.HL4_ID){
            throw ErrorLib.getErrors().CustomError("", "", campaignNotFound);
        }

        if(!data.NUMBER_OF_RECORDS){
            throw ErrorLib.getErrors().CustomError("", "", numberOfRecordNotFound);
        }
    }

}

function validateUpdateLeadForm(data, userId){
    if(!userId){
        throw ErrorLib.getErrors().CustomError("", "", userNotFound);
    }

    if(!data.LEAD_FORM_ID){
        throw ErrorLib.getErrors().CustomError("", "", idNotFound);
    }

    if(!data.FORM_STATUS_DETAIL_ID){
        throw ErrorLib.getErrors().CustomError("", "", statusDetailNotFound);
    }

    if(!data.SUMMARY){
        throw ErrorLib.getErrors().CustomError("", "", summaryNotFound);
    }

    if(!data.REGION_ID){
        throw ErrorLib.getErrors().CustomError("", "", regionNotFound);
    }

    if(!data.SUBREGION_ID){
        throw ErrorLib.getErrors().CustomError("", "", subregionNotFound);
    }

    if(!data.HL4_ID){
        throw ErrorLib.getErrors().CustomError("", "", campaignNotFound);
    }

    if(!data.NUMBER_OF_RECORDS){
        throw ErrorLib.getErrors().CustomError("", "", numberOfRecordNotFound);
    }
}