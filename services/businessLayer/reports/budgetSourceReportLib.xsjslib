/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataBudgetSourcedReport = mapper.getDataBudgetSourceReport();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

function calculateBudgetInEuros(data) {
	var kEurAmount = (data.REQUESTED_BUDGET * data.CURRENCY_VALUE);
	return kEurAmount;
}

function completeCRMPath(array, key) {
	var kEurAmount;

	var path = 'CRM-';
	array.forEach(function(data) {
		kEurAmount = calculateBudgetInEuros(data);

		if (data.CURRENCY_ABBREVIATION === "EUR") {
			data.REQUESTED_BUDGET = "" + Number(kEurAmount).toFixed(2) + " K EUR";
		} else {
			data.REQUESTED_BUDGET = "" + data.REQUESTED_BUDGET + " "
					+ data.CURRENCY_ABBREVIATION + " (" + Number(kEurAmount).toFixed(2)
					+ " K EUR)";
		}
	});
}

function getBudgetSourceReport(budgetYearId, userId) {
	var budgetSourceReport = dataBudgetSourcedReport.getBudgetSourceReport(
			budgetYearId, userId);
	budgetSourceReport = JSON.parse(JSON.stringify(budgetSourceReport));
	completeCRMPath(budgetSourceReport, "PATH");

	return budgetSourceReport;
}