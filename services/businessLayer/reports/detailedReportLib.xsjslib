/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataDetailedReport = mapper.getDataDetailedReport();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getL4DetailedReport(){
	var detailedReport = dataDetailedReport.getL4DetailedReport();
	return detailedReport;	
}

function getL5DetailedReport(){
	var detailedReport = dataDetailedReport.getL5DetailedReport();
	return detailedReport;	
}

function getPathHl1Hl2Hl3(budgetYear, regionId){
	return dataDetailedReport.getPathHl1Hl2Hl3(budgetYear, regionId);
}

function getDetailedReport(hl1_id, hl2_id, hl3_id){
	var rdo = dataDetailedReport.getDetailedReport(hl1_id, hl2_id, hl3_id);


	var map_hl5_cat = {};
    rdo.HL5_CATEGORY.forEach(function(hl5_cat){
        map_hl5_cat[hl5_cat.HL5_ID] = map_hl5_cat[hl5_cat.HL5_ID] || {};
        map_hl5_cat[hl5_cat.HL5_ID]["category_"+hl5_cat.HL5_CATEGORY_NAME] = map_hl5_cat[hl5_cat.HL5_ID]["category_"+hl5_cat.HL5_CATEGORY_NAME]|| "";
        map_hl5_cat[hl5_cat.HL5_ID]["category_"+hl5_cat.HL5_CATEGORY_NAME] += hl5_cat.HL5_OPTION_NAME + ": " + hl5_cat.HL5_AMOUNT + "; ";
        map_hl5_cat[hl5_cat.HL5_ID]["category_" + hl5_cat.HL5_CATEGORY_NAME + "_" + hl5_cat.HL5_OPTION_NAME] = hl5_cat.HL5_AMOUNT;
    });

    var map_hl6_cat = {};
    rdo.HL6_CATEGORY.forEach(function(hl6_cat){
        map_hl6_cat[hl6_cat.HL6_ID] =  map_hl6_cat[hl6_cat.HL6_ID] ||{};
        map_hl6_cat[hl6_cat.HL6_ID]["category_"+hl6_cat.HL6_CATEGORY_NAME] = map_hl6_cat[hl6_cat.HL6_ID]["category_"+hl6_cat.HL6_CATEGORY_NAME]|| "";
        map_hl6_cat[hl6_cat.HL6_ID]["category_"+hl6_cat.HL6_CATEGORY_NAME] += hl6_cat.HL6_OPTION_NAME + ": " + hl6_cat.HL6_AMOUNT + "; ";
        map_hl6_cat[hl6_cat.HL6_ID]["category_" + hl6_cat.HL6_CATEGORY_NAME + "_" + hl6_cat.HL6_OPTION_NAME] = hl6_cat.HL6_AMOUNT;
    });

    var map_hl5_kpi = {};
    var outcomesNameL5 = "";
    rdo.HL5_KPI.forEach(function(hl5_kpi){
        map_hl5_kpi[hl5_kpi.HL5_ID] = map_hl5_kpi[hl5_kpi.HL5_ID] || {};
        map_hl5_kpi[hl5_kpi.HL5_ID].KPI_COMMENTS = hl5_kpi.HL5_COMMENTS;
        if (hl5_kpi.HL5_OUTCOMES_NAME.indexOf("/") > 0) {
            outcomesNameL5 = hl5_kpi.HL5_OUTCOMES_NAME.replace("/", " ");
        } else {
            outcomesNameL5 = hl5_kpi.HL5_OUTCOMES_NAME;
        }
        map_hl5_kpi[hl5_kpi.HL5_ID][outcomesNameL5 + " VALUE"] = hl5_kpi.HL5_EURO_VALUE;
        map_hl5_kpi[hl5_kpi.HL5_ID][outcomesNameL5 + " VOLUME"] = hl5_kpi.HL5_VOLUME_VALUE;
    });

    var map_hl6_kpi = {};
    var outcomesNameL6 = "";
    rdo.HL6_KPI.forEach(function(hl6_kpi){
        map_hl6_kpi[hl6_kpi.HL6_ID] = map_hl6_kpi[hl6_kpi.HL6_ID] || {};
        map_hl6_kpi[hl6_kpi.HL6_ID].KPI_COMMENTS = hl6_kpi.HL6_COMMENTS;
        if (hl6_kpi.HL6_OUTCOMES_NAME.indexOf("/") > 0) {
            outcomesNameL6 = hl6_kpi.HL6_OUTCOMES_NAME.replace("/", " ");
        } else {
            outcomesNameL6 = hl6_kpi.HL6_OUTCOMES_NAME;
        }
        map_hl6_kpi[hl6_kpi.HL6_ID][outcomesNameL6 + " VALUE"] = hl6_kpi.HL6_EURO_VALUE;
        map_hl6_kpi[hl6_kpi.HL6_ID][outcomesNameL6 + " VOLUME"] = hl6_kpi.HL6_VOLUME_VALUE;
    });


    rdo.DATA = JSON.parse(JSON.stringify(rdo.DATA));

    rdo.DATA.forEach(function(row){

        if (map_hl6_cat[row.HL6_ID]) {
            Object.keys(map_hl6_cat[row.HL6_ID]).forEach(function (catKey) {
                row["HL6_" + catKey] = map_hl6_cat[row.HL6_ID][catKey];
            });
        }

        if (map_hl5_cat[row.HL5_ID]) {
            Object.keys(map_hl5_cat[row.HL5_ID]).forEach(function (catKey) {
                row["HL5_" + catKey] = map_hl5_cat[row.HL5_ID][catKey];
            });
        }

        if (map_hl6_kpi[row.HL6_ID]) {
            Object.keys(map_hl6_kpi[row.HL6_ID]).forEach(function (kpiKey) {
                row["HL6_" + kpiKey] = map_hl6_kpi[row.HL6_ID][kpiKey];
            });
        }

        if (map_hl5_kpi[row.HL5_ID]) {
            Object.keys(map_hl5_kpi[row.HL5_ID]).forEach(function (kpiKey) {
                row["HL5_" + kpiKey] = map_hl5_kpi[row.HL5_ID][kpiKey];
            });
        }
        //if (map_hl5_kpi[row.HL5_ID] || map_hl6_kpi[row.HL6_ID])  throw JSON.stringify(row);
    });

    return rdo.DATA;
}