$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var budgetSpendReportLib = mapper.getBudgetSpendReportLib();

function sendDailyNotification() {
    budgetSpendReportLib.sendBudgetApproversDailyNotification();
    return true;
}

