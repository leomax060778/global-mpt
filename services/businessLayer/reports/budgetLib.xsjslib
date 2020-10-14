/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataBudget = mapper.getDataBudgetReports();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var userbl = mapper.getUser();
var config = mapper.getDataConfig();
/*************************************************/

function getAllBudget(){
	var myBudget = dataBudget.getAllBudget();
	return myBudget;	
}

function getHl4ByFilter2(reqBody,userSessionID){
	var result = [];
	var myBudget = dataBudget.getHl4ByFilter(reqBody.arrPlan, reqBody.arrRegion, reqBody.arrSubRegion, reqBody.arrCentralTeam, userSessionID);
	if(myBudget){
		myBudget.forEach(function(obj) {
			var aux = util.extractObject(obj);
			aux.budget_region = {}//;dataBudget.getBudgetRegionByHl4(aux.HL4_ID);
			aux.budget_subregion = {};//dataBudget.getBudgetSubRegionByHl4(aux.HL4_ID);
			aux.budget_globalteam = dataBudget.getBudgetGlobalTeamByHl4(aux.HL4_ID);
			result.push(aux);
		});
	}
	return result;	
}

function getHl2ByHl1Id(hl1Id, userId) {
    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    return dataHl2.getHl2ByHl1Id(hl1Id, userId, isSA);
}

function getHl4ByFilter(reqBody,userSessionID){
	var result = [];
	var arrPlan = [];
	var arrRegion = [];
	var arrBudgetYear = [];
	
	var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userSessionID) ? 1 : 0;
    }
	
	//if has filter plan then apply filter by parameter, else apply filter to related user plan
	if(reqBody.arrPlan)
		arrPlan = reqBody.arrPlan;
	else
		arrPlan = dataBudget.getPlansUser(userSessionID);
		
	if(reqBody.arrRegion)
		arrRegion = reqBody.arrRegion;

	if(reqBody.arrBudgetYear)
		arrBudgetYear = reqBody.arrBudgetYear;

	
	var myBudget = dataBudget.getHl4ByFilter(arrPlan, arrRegion, arrBudgetYear, isSA, userSessionID);
	
	if(myBudget){
		var aux = {};
		var list = Object.keys(myBudget.OUT_RESULT);
		for (var i = 0; i < list.length; i++) {
			var elem = myBudget.OUT_RESULT[i];
			if (aux.plan_id !== elem.PLAN_ID) {
				aux = {
						  plan: elem.PLAN
						, plan_id: elem.PLAN_ID
						, l2_acronym: elem.ORGANIZATION_ACRONYM
						, budget_year:  elem.BUDGET_YEAR
						, budget_total: elem.HL2_BUDGET_TOTAL
						, remaining: !elem.REMAINING ? 0 : elem.REMAINING
						, allocated: !elem.ALLOCATED ? 0 : elem.ALLOCATED
						, value: elem.VALUE
			    };
				result.push(aux);
			}
			aux[elem.BUDGET_REGION_NAME] = !elem.PERCENTAGE ? 0 : elem.PERCENTAGE;
		}
	}
	var myObj = {};
	myObj.result = result;
	myObj.regions = myBudget.out_result_rg_name;
	return myObj;	
}

function getBudgetDistributionReport(reqBody, userId){
	var arrPlan = [];
	var arrRegion = [];
	var arrBudgetYear = [];

	var isSA = false;
	if (config.getApplySuperAdminToAllInitiatives()) {
		isSA = userbl.isSuperAdmin(userId) ? 1 : 0;
	}

	//if has filter plan then apply filter by parameter, else apply filter to related user plan
	if(reqBody.arrPlan)
		arrPlan = reqBody.arrPlan;
	else
		arrPlan = dataBudget.getPlansUser(userId);

	if(reqBody.arrRegion)
		arrRegion = reqBody.arrRegion;

	if(reqBody.arrBudgetYear)
		arrBudgetYear = reqBody.arrBudgetYear;

	var result = dataBudget.getBudgetDistributionReport(arrPlan, arrRegion, arrBudgetYear, isSA, userId);
	var hl4List = result.out_result;
	var attributes = result.out_attributes;
	var attributesMap = {};
	var report = [];

	if(hl4List && hl4List.length){
		if(attributes && attributes.length){
			attributes.forEach(function(attr){
				if(!attributesMap[attr.HL4_ID]){
					attributesMap[attr.HL4_ID] = [];
				}

				attributesMap[attr.HL4_ID].push(attr);
			});
		}

		hl4List.forEach(function(elem){
			var hl1Object = {
				L1_PARENT: '',
				L1_PARENT_DESC: '',
				L2_PARENT: '',
				L2_PARENT_DESC: '',
				L3_PARENT: '',
				L3_PARENT_DESC: '',
				CRM_ID: elem.HL1_CRM_ID,
				PLAN_CODE: elem.HL1_ACRONYM,
				PLAN_DESCRIPTION: elem.HL1_DESCRIPTION,
				LEVEL: '1',
				STATUS_DETAIL: '',
				BUDGET: elem.HL1_BUDGET,
				COST_CENTER: elem.HL1_COST_CENTER,
				SHOPPING_CART_APPROVER: elem.HL1_SHOPPING_CART_APPROVER,
				CREATED_DATE: elem.HL1_CREATED_DATE,
				CREATED_USER_NAME: elem.HL1_CREATED_USER_NAME,
				MODIFIED_DATE: elem.HL1_MODIFIED_DATE,
				MODIFIED_USER_NAME: elem.HL1_MODIFIED_USER_NAME
			};

			var hl2Object = {
				L1_PARENT: elem.HL1_CRM_ID,
				L1_PARENT_DESC: elem.HL1_DESCRIPTION,
				L2_PARENT: '',
				L2_PARENT_DESC: '',
				L3_PARENT: '',
				L3_PARENT_DESC: '',
				CRM_ID: elem.HL2_CRM_ID,
				PLAN_CODE: elem.HL2_ACRONYM,
				PLAN_DESCRIPTION: elem.HL2_DESCRIPTION,
				LEVEL: '2',
				STATUS_DETAIL: '',
				BUDGET: elem.HL2_BUDGET,
				COST_CENTER: elem.HL2_COST_CENTER,
				SHOPPING_CART_APPROVER: elem.HL2_SHOPPING_CART_APPROVER,
				CREATED_DATE: elem.HL2_CREATED_DATE,
				CREATED_USER_NAME: elem.HL2_CREATED_USER_NAME,
				MODIFIED_DATE: elem.HL2_MODIFIED_DATE,
				MODIFIED_USER_NAME: elem.HL2_MODIFIED_USER_NAME
			};

			var hl3Object = {
				L1_PARENT: elem.HL1_CRM_ID,
				L1_PARENT_DESC: elem.HL1_DESCRIPTION,
				L2_PARENT: elem.HL2_CRM_ID,
				L2_PARENT_DESC: elem.HL2_DESCRIPTION,
				L3_PARENT: '',
				L3_PARENT_DESC: '',
				CRM_ID: elem.HL3_CRM_ID,
				PLAN_CODE: elem.HL3_ACRONYM,
				PLAN_DESCRIPTION: elem.HL3_DESCRIPTION,
				LEVEL: '3',
				STATUS_DETAIL: '',
				BUDGET: elem.HL3_BUDGET,
				COST_CENTER: elem.HL3_COST_CENTER,
				SHOPPING_CART_APPROVER: elem.HL3_SHOPPING_CART_APPROVER,
				CREATED_DATE: elem.HL3_CREATED_DATE,
				CREATED_USER_NAME: elem.HL3_CREATED_USER_NAME,
				MODIFIED_DATE: elem.HL3_MODIFIED_DATE,
				MODIFIED_USER_NAME: elem.HL3_MODIFIED_USER_NAME
			};

			var hl4Object = {
				L1_PARENT: elem.HL1_CRM_ID,
				L1_PARENT_DESC: elem.HL1_DESCRIPTION,
				L2_PARENT: elem.HL2_CRM_ID,
				L2_PARENT_DESC: elem.HL2_DESCRIPTION,
				L3_PARENT: elem.HL3_CRM_ID,
				L3_PARENT_DESC: elem.HL3_DESCRIPTION,
				CRM_ID: elem.HL4_CRM_ID,
				PLAN_CODE: elem.HL4_ACRONYM,
				PLAN_DESCRIPTION: elem.HL4_DESCRIPTION,
				LEVEL: '4',
				STATUS_DETAIL: elem.HL4_STATUS_DETAIL,
				BUDGET: elem.HL4_BUDGET,
				COST_CENTER: elem.HL4_COST_CENTER,
				SHOPPING_CART_APPROVER: elem.HL4_SHOPPING_CART_APPROVER,
				CREATED_DATE: elem.HL4_CREATED_DATE,
				CREATED_USER_NAME: elem.HL4_CREATED_USER_NAME,
				MODIFIED_DATE: elem.HL4_MODIFIED_DATE,
				MODIFIED_USER_NAME: elem.HL4_MODIFIED_USER_NAME
			};

			if(attributesMap[elem.HL4_ID] && attributesMap[elem.HL4_ID].length){
				attributesMap[elem.HL4_ID].forEach(function(attr, index){
					hl1Object[attr.CATEGORY_NAME] = '';
					hl2Object[attr.CATEGORY_NAME] = '';
					hl3Object[attr.CATEGORY_NAME] = '';

					if(!hl4Object[attr.CATEGORY_NAME]){
						hl4Object[attr.CATEGORY_NAME] = attr.OPTION_NAME + '(' + attr.CRM_KEY + ')';
					} else {
						hl4Object[attr.CATEGORY_NAME] = hl4Object[attr.CATEGORY_NAME] + ", " + attr.OPTION_NAME + '(' + attr.CRM_KEY + ')';
					}
				});
			}

			report.push(hl1Object);
			report.push(hl2Object);
			report.push(hl3Object);
			report.push(hl4Object);
		});
	}

	return report;
}
