function getTracer(){
    $.import("mktgplanningtool.services.commonLib","tracer");
    return $.mktgplanningtool.services.commonLib.tracer;
}

/************Business Layer Mapper*****************/

function getUtil(){
    $.import("mktgplanningtool.services.businessLayer.util","util");
    return $.mktgplanningtool.services.businessLayer.util.util;
}

function getLogin(){
    $.import("mktgplanningtool.services.businessLayer.admin","loginLib");
    return $.mktgplanningtool.services.businessLayer.admin.loginLib;
}

function getMail(){
    $.import("mktgplanningtool.services.businessLayer.util","mail");
    return $.mktgplanningtool.services.businessLayer.util.mail;
}

function getLogError(){
    $.import("mktgplanningtool.services.businessLayer.util","logError");
    return $.mktgplanningtool.services.businessLayer.util.logError;
}

function getErrors(){
    $.import("mktgplanningtool.services.commonLib","errorLib");
    return $.mktgplanningtool.services.commonLib.errorLib;
}

function getHttp(){
    $.import("mktgplanningtool.services.commonLib","httpLib");
    return $.mktgplanningtool.services.commonLib.httpLib;
}

function getApplication(){
    $.import("mktgplanningtool.services.businessLayer.settings","applicationLib");
    return $.mktgplanningtool.services.businessLayer.settings.applicationLib;
}

function getPlanning(){
    $.import("mktgplanningtool.services.businessLayer.settings","planningLib");
    return $.mktgplanningtool.services.businessLayer.settings.planningLib;
}

function getLevel3(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level3Lib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level3Lib;
}

function getLevel4(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level4Lib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level4Lib;
}
function getLevel5(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level5Lib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level5Lib;
}
function getLevel6(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level6Lib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level6Lib;
}

function getCampaignTypeLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","campaignTypeLib");
    return $.mktgplanningtool.services.businessLayer.settings.campaignTypeLib;
}

function getCampaignSubTypeLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","campaignSubTypeLib");
    return $.mktgplanningtool.services.businessLayer.settings.campaignSubTypeLib;
}
function getMarketingProgramLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","marketingProgramLib");
    return $.mktgplanningtool.services.businessLayer.settings.marketingProgramLib;
}

function getObjectiveLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","objectivesLib");
    return $.mktgplanningtool.services.businessLayer.settings.objectivesLib;
}
function getCampaignObjectiveLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","campaignObjectiveLib");
    return $.mktgplanningtool.services.businessLayer.settings.campaignObjectiveLib;
}

function getSaleOrganizationLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","saleOrganizationLib");
    return $.mktgplanningtool.services.businessLayer.settings.saleOrganizationLib;
}

function getRouteToMarketLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","routeToMarketLib");
    return $.mktgplanningtool.services.businessLayer.settings.routeToMarketLib;
}

function getCostCenter(){
    $.import("mktgplanningtool.services.businessLayer.settings","costCenterLib");
    return $.mktgplanningtool.services.businessLayer.settings.costCenterLib;
}

function getUser(){
    $.import("mktgplanningtool.services.businessLayer.admin","userLib");
    return $.mktgplanningtool.services.businessLayer.admin.userLib;
}

function getRegion(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","regionLib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.regionLib;
}

function getSubRegion(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","subRegionLib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.subRegionLib;
}

function getLevel1(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level1Lib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level1Lib;
}

function getLevel2(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level2Lib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level2Lib;
}

function getRole(){
    $.import("mktgplanningtool.services.businessLayer.admin","roleLib");
    return $.mktgplanningtool.services.businessLayer.admin.roleLib;
}

function getPath(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","pathLib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.pathLib;
}

function getUserRole(){
    $.import("mktgplanningtool.services.businessLayer.admin","userRoleLib");
    return $.mktgplanningtool.services.businessLayer.admin.userRoleLib;
}

function getInterlock(){
    $.import("mktgplanningtool.services.businessLayer.interlock","interlockLib");
    return $.mktgplanningtool.services.businessLayer.interlock.interlockLib;
}

function getPartner(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","partnerLib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.partnerLib;
}

function getOutcomes2(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","outcomesLib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.outcomesLib;
}

function getOutcomesType(){
    $.import("mktgplanningtool.services.businessLayer.settings","outcomesTypeLib");
    return $.mktgplanningtool.services.businessLayer.settings.outcomesTypeLib;
}

function getValidationLib(){
    $.import("mktgplanningtool.services.businessLayer.util","validationLib");
    return $.mktgplanningtool.services.businessLayer.util.validationLib;
}

function getOutcomes(){
    $.import("mktgplanningtool.services.businessLayer.settings","outcomesLib");
    return $.mktgplanningtool.services.businessLayer.settings.outcomesLib;
}

function getExpectedOutcomes(){
    $.import("mktgplanningtool.services.businessLayer.settings","expectedOutcomesLib");
    return $.mktgplanningtool.services.businessLayer.settings.expectedOutcomesLib;
}

function getCategory(){
    $.import("mktgplanningtool.services.businessLayer.settings","categoryLib");
    return $.mktgplanningtool.services.businessLayer.settings.categoryLib;
}

function getMeasure(){
    $.import("mktgplanningtool.services.businessLayer.settings","measureLib");
    return $.mktgplanningtool.services.businessLayer.settings.measureLib;
}

function getLevel4DEReport(){
    $.import("mktgplanningtool.services.businessLayer.dataEntryReport","level4ReportLib");
    return $.mktgplanningtool.services.businessLayer.dataEntryReport.level4ReportLib;
}

function getLevel5DEReport(){
    $.import("mktgplanningtool.services.businessLayer.dataEntryReport","level5ReportLib");
    return $.mktgplanningtool.services.businessLayer.dataEntryReport.level5ReportLib;
}

function getLevel6DEReport(){
    $.import("mktgplanningtool.services.businessLayer.dataEntryReport","level6ReportLib");
    return $.mktgplanningtool.services.businessLayer.dataEntryReport.level6ReportLib;
}

function getRolePermission(){
    $.import("mktgplanningtool.services.businessLayer.admin","rolePermissionLib");
    return $.mktgplanningtool.services.businessLayer.admin.rolePermissionLib;
}

function getPermission(){
    $.import("mktgplanningtool.services.businessLayer.admin","permissionLib");
    return $.mktgplanningtool.services.businessLayer.admin.permissionLib;
}

function getResource(){
    $.import("mktgplanningtool.services.businessLayer.admin","resourceLib");
    return $.mktgplanningtool.services.businessLayer.admin.resourceLib;
}

function getBudgetReport(){
    $.import("mktgplanningtool.services.businessLayer.reports","budgetLib");
    return $.mktgplanningtool.services.businessLayer.reports.budgetLib;
}

function getDetailedReport(){
    $.import("mktgplanningtool.services.businessLayer.reports","detailedReportLib");
    return $.mktgplanningtool.services.businessLayer.reports.detailedReportLib;
}

function getContactData(){
    $.import("mktgplanningtool.services.businessLayer.interlock","contactDataLib");
    return $.mktgplanningtool.services.businessLayer.interlock.contactDataLib;
}

function getBudgetYear(){
    $.import("mktgplanningtool.services.businessLayer.settings","budgetYearLib");
    return $.mktgplanningtool.services.businessLayer.settings.budgetYearLib;
}

function getHl(){
    $.import("mktgplanningtool.services.businessLayer.settings","hlLib");
    return $.mktgplanningtool.services.businessLayer.settings.hlLib;
}

function getMarketingOrganization(){
    $.import("mktgplanningtool.services.businessLayer.settings","marketingOrganizationLib");
    return $.mktgplanningtool.services.businessLayer.settings.marketingOrganizationLib;
}

function getEmployeeResponsible(){
    $.import("mktgplanningtool.services.businessLayer.settings","employeeResponsibleLib");
    return $.mktgplanningtool.services.businessLayer.settings.employeeResponsibleLib;
}

function getResponsiblePerson(){
    $.import("mktgplanningtool.services.businessLayer.settings","responsiblePersonLib");
    return $.mktgplanningtool.services.businessLayer.settings.responsiblePersonLib;
}

function getBudgetApprover(){
    $.import("mktgplanningtool.services.businessLayer.settings","budgetApproverLib");
    return $.mktgplanningtool.services.businessLayer.settings.budgetApproverLib;
}

function getApi(){
    $.import("mktgplanningtool.services.businessLayer.api","apiLib");
    return $.mktgplanningtool.services.businessLayer.api.apiLib;
}

function getCurrency(){
    $.import("mktgplanningtool.services.businessLayer.settings","currencyLib");
    return $.mktgplanningtool.services.businessLayer.settings.currencyLib;
}

function getCategory(){
    $.import("mktgplanningtool.services.businessLayer.settings","categoryLib");
    return $.mktgplanningtool.services.businessLayer.settings.categoryLib;
}

function getMeasure(){
    $.import("mktgplanningtool.services.businessLayer.settings","measureLib");
    return $.mktgplanningtool.services.businessLayer.settings.measureLib;
}

function getConfig(){
    $.import("mktgplanningtool.services.businessLayer.util","configuration");
    return $.mktgplanningtool.services.businessLayer.util.configuration;
}

function getExpectedOutcomeLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","expectedOutcomesLib");
    return $.mktgplanningtool.services.businessLayer.settings.expectedOutcomesLib;
}

function getExpectedOutcomesOptionLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","expectedOutcomesOptionLib");
    return $.mktgplanningtool.services.businessLayer.settings.expectedOutcomesOptionLib;
}

function getExpectedOutcomesLevelLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","expectedOutcomesLevelLib");
    return $.mktgplanningtool.services.businessLayer.settings.expectedOutcomesLevelLib;
}

function getAllocationCategoryLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","allocationCategoryLib");
    return $.mktgplanningtool.services.businessLayer.settings.allocationCategoryLib;
}

function getAllocationOptionLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","allocationOptionLib");
    return $.mktgplanningtool.services.businessLayer.settings.allocationOptionLib;
}

function getAllocationCategoryOptionLevelLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","allocationCategoryOptionLevelLib");
    return $.mktgplanningtool.services.businessLayer.settings.allocationCategoryOptionLevelLib;
}

function getServiceRequestCategoryLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","serviceRequestCategoryLib");
    return $.mktgplanningtool.services.businessLayer.settings.serviceRequestCategoryLib;
}

function getServiceRequestOptionLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","serviceRequestOptionLib");
    return $.mktgplanningtool.services.businessLayer.settings.serviceRequestOptionLib;
}

function getServiceRequestCategoryOptionLevelLib(){
    $.import("mktgplanningtool.services.businessLayer.settings","serviceRequestCategoryOptionLevelLib");
    return $.mktgplanningtool.services.businessLayer.settings.serviceRequestCategoryOptionLevelLib;
}

function getUploadLib(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","uploadLib");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.uploadLib;
}

function getPriority(){
    $.import("mktgplanningtool.services.businessLayer.settings","priorityLib");
    return $.mktgplanningtool.services.businessLayer.settings.priorityLib;
}

function getPlanning(){
    $.import("mktgplanningtool.services.businessLayer.settings","planningLib");
    return $.mktgplanningtool.services.businessLayer.settings.planningLib;
}

function getBudgetSpendRequest(){
    $.import("mktgplanningtool.services.businessLayer.budgetSpendRequest","budgetSpendRequestLib");
    return $.mktgplanningtool.services.businessLayer.budgetSpendRequest.budgetSpendRequestLib;
}

function getBudgetSpendReportLib(){
	$.import("mktgplanningtool.services.businessLayer.dataEntryReport","budgetSpendReportLib");
    return $.mktgplanningtool.services.businessLayer.dataEntryReport.budgetSpendReportLib;
}

function getBudgetSourceReportLib(){
	$.import("mktgplanningtool.services.businessLayer.reports","budgetSourceReportLib");
    return $.mktgplanningtool.services.businessLayer.reports.budgetSourceReportLib;
}

function getAttachment(){
    $.import("mktgplanningtool.services.businessLayer.attachment","attachmentLib");
    return $.mktgplanningtool.services.businessLayer.attachment.attachmentLib;
}

/************Data Layer Mapper*****************/

function getdbHelper(){
    $.import("mktgplanningtool.services.dataLayer.util","dbHelper");
    return $.mktgplanningtool.services.dataLayer.util.dbHelper;
}

function getDataLogin(){
    $.import("mktgplanningtool.services.dataLayer.admin","dataLogin");
    return $.mktgplanningtool.services.dataLayer.admin.dataLogin;
}

function getDataLogError(){
    $.import("mktgplanningtool.services.dataLayer.util","dataLogError");
    return $.mktgplanningtool.services.dataLayer.util.dataLogError;
}

function getDataApplication(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataApplication");
    return $.mktgplanningtool.services.dataLayer.settings.dataApplication;
}

function getDataPriority(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataPriority");
    return $.mktgplanningtool.services.dataLayer.settings.dataPriority;
}

function getDataLevel3(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel3");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel3;
}

function getDataLevel4(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel4");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel4;
}

function getDataPartner(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataPartner");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataPartner;
}

function getDataInterLock(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataInterlock");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataInterlock;
}

function getDataUser(){
    $.import("mktgplanningtool.services.dataLayer.admin","dataUser");
    return $.mktgplanningtool.services.dataLayer.admin.dataUser;
}

function getDataRegion(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataRegion");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataRegion;
}

function getDataValidation(){
    $.import("mktgplanningtool.services.dataLayer.util","dataValidation");
    return $.mktgplanningtool.services.dataLayer.util.dataValidation;
}

function getDataSubRegion(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataSubRegion");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataSubRegion;
}

function getDataLevel1(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel1");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel1;
}

function getDataLevel1User(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel1User");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel1User;
}

function getDataLevel2(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel2");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel2;
}

function getDataLevel2User(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel2User");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel2User;
}

function getDataUserRole(){
    $.import("mktgplanningtool.services.dataLayer.admin","dataUserRole");
    return $.mktgplanningtool.services.dataLayer.admin.dataUserRole;
}

function getDataPath(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataPath");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataPath;
}

function getDataRole(){
    $.import("mktgplanningtool.services.dataLayer.admin","dataRole");
    return $.mktgplanningtool.services.dataLayer.admin.dataRole;
}

function getDataLevel3User(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel3User");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel3User;
}

function getDataCategory(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCategory");
    return $.mktgplanningtool.services.dataLayer.settings.dataCategory;
}

function getDataMeasure(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataMeasure");
    return $.mktgplanningtool.services.dataLayer.settings.dataMeasure;
}

function getDataCurrency(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCurrency");
    return $.mktgplanningtool.services.dataLayer.settings.dataCurrency;
}

function getDataOption(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCategoryOption");
    return $.mktgplanningtool.services.dataLayer.settings.dataCategoryOption;
}

function getDataCategoryOptionLevel(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCategoryOptionLevel");
    return $.mktgplanningtool.services.dataLayer.settings.dataCategoryOptionLevel;
}

function getDataOutcomeType(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataOutcomeType");
    return $.mktgplanningtool.services.dataLayer.settings.dataOutcomeType;
}

function getDataOutcome(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataOutcome");
    return $.mktgplanningtool.services.dataLayer.settings.dataOutcome;
}

function getDataCostCenter(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCostCenter");
    return $.mktgplanningtool.services.dataLayer.settings.dataCostCenter;
}

function getDataLevel4Report(){
    $.import("mktgplanningtool.services.dataLayer.dataEntryReport","dataLevel4Report");
    return $.mktgplanningtool.services.dataLayer.dataEntryReport.dataLevel4Report;
}

function getDataLevel5Report(){
    $.import("mktgplanningtool.services.dataLayer.dataEntryReport","dataLevel5Report");
    return $.mktgplanningtool.services.dataLayer.dataEntryReport.dataLevel5Report;
}

function getDataLevel6Report(){
    $.import("mktgplanningtool.services.dataLayer.dataEntryReport","dataLevel6Report");
    return $.mktgplanningtool.services.dataLayer.dataEntryReport.dataLevel6Report;
}

function getDataRolePermission(){
    $.import("mktgplanningtool.services.dataLayer.admin","dataRolePermission");
    return $.mktgplanningtool.services.dataLayer.admin.dataRolePermission;
}
function getDataCampaignObjective(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCampaignObjective");
    return $.mktgplanningtool.services.dataLayer.settings.dataCampaignObjective;
}

function getDataConfig(){
    $.import("mktgplanningtool.services.dataLayer.util","dataConfiguration");
    return $.mktgplanningtool.services.dataLayer.util.dataConfiguration;
}

function getDataPermission(){
    $.import("mktgplanningtool.services.dataLayer.admin","dataPermission");
    return $.mktgplanningtool.services.dataLayer.admin.dataPermission;
}

function getDataResource(){
    $.import("mktgplanningtool.services.dataLayer.admin","dataResource");
    return $.mktgplanningtool.services.dataLayer.admin.dataResource;
}

function getDataBudgetReports(){
    $.import("mktgplanningtool.services.dataLayer.reports","dataBudget");
    return $.mktgplanningtool.services.dataLayer.reports.dataBudget;
}

function getDataDetailedReport(){
    $.import("mktgplanningtool.services.dataLayer.reports","dataDetailedReport");
    return $.mktgplanningtool.services.dataLayer.reports.dataDetailedReport;
}

function getDataContactData(){
    $.import("mktgplanningtool.services.dataLayer.interlock","dataContactData");
    return $.mktgplanningtool.services.dataLayer.interlock.dataContactData;
}


function getDataBudgetYear(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataBudgetYear");
    return $.mktgplanningtool.services.dataLayer.settings.dataBudgetYear;
}

function getDataHl(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataHl");
    return $.mktgplanningtool.services.dataLayer.settings.dataHl;
}

function getDataMarketingOrganization(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataMarketingOrganization");
    return $.mktgplanningtool.services.dataLayer.settings.dataMarketingOrganization;
}


function getDataLevel5(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel5");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel5;
}
function getDataLevel6(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel6");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel6;
}

function getDataCampaignType(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCampaignType");
    return $.mktgplanningtool.services.dataLayer.settings.dataCampaignType;
}

function getDataCampaignSubType(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataCampaignSubType");
    return $.mktgplanningtool.services.dataLayer.settings.dataCampaignSubType;
}
function getDataMarketingProgram(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataMarketingProgram");
    return $.mktgplanningtool.services.dataLayer.settings.dataMarketingProgram;
}

function getDataSalesOrganization(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataSalesOrganizations");
    return $.mktgplanningtool.services.dataLayer.settings.dataSalesOrganizations;
}

function getDataObjectives(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataObjectives");
    return $.mktgplanningtool.services.dataLayer.settings.dataObjectives;
}

function getDataRouteToMarket(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataRouteToMarket");
    return $.mktgplanningtool.services.dataLayer.settings.dataRouteToMarket;
}

function getDataEmployeeResponsible(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataEmployeeResponsible");
    return $.mktgplanningtool.services.dataLayer.settings.dataEmployeeResponsible;
}

function getDataResponsiblePerson(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataResponsiblePerson");
    return $.mktgplanningtool.services.dataLayer.settings.dataResponsiblePerson;
}

function getDataBudgetApprover(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataBudgetApprover");
    return $.mktgplanningtool.services.dataLayer.settings.dataBudgetApprover;
}

function getDataApi(){
    $.import("mktgplanningtool.services.dataLayer.api","dataApi");
    return $.mktgplanningtool.services.dataLayer.api.dataApi;
}

function getDataMarketingProgram(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataMarketingProgram");
    return $.mktgplanningtool.services.dataLayer.settings.dataMarketingProgram;
}

function getDataBusinessOwner(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataBusinessOwner");
    return $.mktgplanningtool.services.dataLayer.settings.dataBusinessOwner;
}

function getDataExpectedOutcome(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataExpectedOutcome");
    return $.mktgplanningtool.services.dataLayer.settings.dataExpectedOutcome;
}

function getDataExpectedOutcomeOption(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataExpectedOutcomeOption");
    return $.mktgplanningtool.services.dataLayer.settings.dataExpectedOutcomeOption;
}

function getDataExpectedOutcomeLevel(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataExpectedOutcomeLevel");
    return $.mktgplanningtool.services.dataLayer.settings.dataExpectedOutcomeLevel;
}

function getDataServiceRequest(){
    $.import("mktgplanningtool.services.dataLayer.settings","dataServiceRequestCategoryOptionLevel");
    return $.mktgplanningtool.services.dataLayer.settings.dataServiceRequestCategoryOptionLevel;
}


function getDataUpload(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataUpload");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataUpload;
}

function getDataAttachment(){
    $.import("mktgplanningtool.services.dataLayer.attachment","dataAttachment");
    return $.mktgplanningtool.services.dataLayer.attachment.dataAttachment;
}

/***************************************** LEGACY *****************************************/
function getLevel5Legacy(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level5LibLegacy");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level5LibLegacy;
}
function getLevel6Legacy(){
    $.import("mktgplanningtool.services.businessLayer.teamPlanHierarchy","level6LibLegacy");
    return $.mktgplanningtool.services.businessLayer.teamPlanHierarchy.level6LibLegacy;
}
function getLevel5DEReportLegacy(){
    $.import("mktgplanningtool.services.businessLayer.dataEntryReport","level5ReportLibLegacy");
    return $.mktgplanningtool.services.businessLayer.dataEntryReport.level5ReportLibLegacy;
}
function getLevel6DEReportLegacy(){
    $.import("mktgplanningtool.services.businessLayer.dataEntryReport","level6ReportLibLegacy");
    return $.mktgplanningtool.services.businessLayer.dataEntryReport.level6ReportLibLegacy;
}
function getDataLevel5Legacy(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel5Legacy");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel5Legacy;
}
function getDataLevel6Legacy(){
    $.import("mktgplanningtool.services.dataLayer.teamPlanHierarchy","dataLevel6Legacy");
    return $.mktgplanningtool.services.dataLayer.teamPlanHierarchy.dataLevel6Legacy;
}
function getDataLevel5ReportLegacy(){
    $.import("mktgplanningtool.services.dataLayer.dataEntryReport","dataLevel5ReportLegacy");
    return $.mktgplanningtool.services.dataLayer.dataEntryReport.dataLevel5ReportLegacy;
}
function getDataLevel6ReportLegacy(){
    $.import("mktgplanningtool.services.dataLayer.dataEntryReport","dataLevel6ReportLegacy");
    return $.mktgplanningtool.services.dataLayer.dataEntryReport.dataLevel6ReportLegacy;
}

function getDataBudgetSpendRequest(){
    $.import("mktgplanningtool.services.dataLayer.budgetSpendRequest","dataBudgetSpendRequest");
    return $.mktgplanningtool.services.dataLayer.budgetSpendRequest.dataBudgetSpendRequest;
}

function getDataBudgetSpendReport(){
	$.import("mktgplanningtool.services.dataLayer.dataEntryReport","dataBudgetSpendReport");
    return $.mktgplanningtool.services.dataLayer.dataEntryReport.dataBudgetSpendReport;
}

function getDataBudgetSourceReport(){
    $.import("mktgplanningtool.services.dataLayer.reports","dataBudgetSourceReport");
    return $.mktgplanningtool.services.dataLayer.reports.dataBudgetSourceReport;
}