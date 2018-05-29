/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataBudgetSourcedReport = mapper.getDataBudgetSourceReport();
var util = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

function calculateCurrencyRates(data) {
    return (Number(data.REQUESTED_BUDGET) * Number(data.CURRENCY_VALUE));
}

function completeCRMPath(array, key) {
	var convertedBudget;

	var path = 'CRM-';
	array.forEach(function(data) {
		convertedBudget = calculateCurrencyRates(data);

		if (data.CURRENCY_ABBREVIATION === "EUR") {
			data.REQUESTED_BUDGET = "" + util.numberToLocaleString(data.REQUESTED_BUDGET) + " EUR";
		} else {
			data.REQUESTED_BUDGET = "" + util.numberToLocaleString(convertedBudget) + " "
					+ data.CURRENCY_ABBREVIATION + " (" + util.numberToLocaleString(data.REQUESTED_BUDGET)
					+ " EUR)";
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