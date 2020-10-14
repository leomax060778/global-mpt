$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

// List of stored procedures
var GET_ALL_HL4_DE_REPORT = "GET_HL4_DE_REPORT";
var GET_PROCESSING_REPORT_FOR_DOWNLOAD = "GET_PROCESSING_REPORT_FOR_DOWNLOAD";
var GET_ALL_HL4_CHANGED_FIELDS = "GET_ALL_HL4_CHANGED_FIELDS";
var spGetL4ChangedFieldsByHl4Id = "GET_HL4_CHANGED_FIELDS_BY_HL4_ID";
var spDelL4ChangedFieldsByHl4Id = "DEL_HL4_CRM_BINDING";
var spMassDelL4ChangedFieldsByHl4Id = "DEL_MASS_HL4_CRM_BINDING";
var UPD_PROCESSING_REPORT_EXPORT_DATA = "UPD_PROCESSING_REPORT_EXPORT_DATA";
var UPD_MASS_PROCESSING_REPORT_EXPORT_DATA = "UPD_MASS_PROCESSING_REPORT_EXPORT_DATA";
var GET_REPORT_DELETION_REQUEST = "GET_REPORT_DELETION_REQUEST";

/*********** END LIST OF PROCEDURES ***************/

function getAllLevel4Report(userId) {
    var parameters = {};
    var result = db.executeProcedureManual(GET_ALL_HL4_DE_REPORT, {});
    var list = result['out_result'];
    var spResult = [];
    Object.keys(list).forEach(function (key) {
        spResult.push(list[key]);
    });
    return spResult;
}

function getAllL4CreateInCrmDEReportForDownload() {
    var data = db.executeProcedureManual(GET_PROCESSING_REPORT_FOR_DOWNLOAD, {in_object_type: 'MPL'});
    return db.extractArray(data.out_result);
}

function getAllHL4ChangedFields() {
    var data = db.executeProcedureManual(GET_ALL_HL4_CHANGED_FIELDS, {});
    return {
        out_hl4_changed_fields: db.extractArray(data.out_hl4_changed_fields),
        out_hl4: db.extractArray(data.out_hl4),
        out_hl4_category_options: db.extractArray(data.out_hl4_category_options),
        out_top_hl4_in_crm_version: db.extractArray(data.out_top_hl4_in_crm_version)
    };
}

function updateLevel4ReportForDownload(HL4_ID) {
    var data = db.executeProcedureManual(UPD_PROCESSING_REPORT_EXPORT_DATA, {
        IN_HL_ID: HL4_ID,
        IN_HIERARCHY_LEVEL: 'HL4'
    });
    return db.extractArray(data.out_result);
}

function getL4ChangedFieldsByHl4Id(id) {
    if (id) {
        var rdo = db.executeProcedureManual(spGetL4ChangedFieldsByHl4Id, {'in_hl4_id': id});
        return db.extractArray(rdo.out_hl4_changed_fields);
    }
    return null;
}

function deleteL4ChangedFieldsByHl4Id(id) {
    if (id) {
        var rdo = db.executeScalarManual(spDelL4ChangedFieldsByHl4Id, {'in_hl4_id': id}, 'out_result');
        return rdo;
    }
    return null;
}

function massDeleteL4ChangedFieldsByHl4Id(ids) {
    var rdo = db.executeScalarManual(spMassDelL4ChangedFieldsByHl4Id, {'in_hl4_ids': ids}, 'out_result');
    return rdo;
}


function getAllHL4DeletionRequest(level){
    var rdo = db.executeProcedureManual(GET_REPORT_DELETION_REQUEST, {'IN_LEVEL': level});
    return db.extractArray(rdo.out_result);
}
