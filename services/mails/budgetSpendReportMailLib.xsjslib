function parseBudgetSpendReport(reqBody, budgetSpendRequestData, budgetSpendRequestList, basicData, userName, fromApprover){
	var mailObj = {};
	
	var body = '';

    if(reqBody.HEADER){
        body += '<p>' + reqBody.HEADER + '</p>';
    } else {
        body += '<p> Dear '+userName+' </p>';
    }

    body += '<p style="margin-bottom: 1rem;">' + reqBody.NOTE + '</p>';

    if(reqBody.REJECTION_REASON){
        body += '<p> Reason: </p>';
        body += '<p style="margin-bottom: 1rem;">' + reqBody.REJECTION_REASON + '</p>';
    }

    body += '<p>Budget Spend Information:</p>';
    body += '<table><tr><th>Field</th><th>Current Value</th></tr>';
    body += '<tr><td>CRM</td><td>' + (budgetSpendRequestData.HL5_PATH || budgetSpendRequestData.HL6_PATH) + '</td></tr>';

    
    if(fromApprover){
    	body += '<tr><td>CRM Description</td><td>' + (budgetSpendRequestData.HL5_CRM_DESCRIPTION || budgetSpendRequestData.HL6_CRM_DESCRIPTION ) + '</td></tr>';
    }

    body += '<tr><td>Request Type</td><td>' + budgetSpendRequestData.BUDGET_SPEND_REQUEST_TYPE_DISPLAY_NAME + '</td></tr>';
    body += '<tr><td>Requester</td><td>' + budgetSpendRequestData.BUDGET_SPEND_REQUEST_REQUESTER + '</td></tr>';
    body += '<tr><td>Requested on</td><td>' + budgetSpendRequestData.BUDGET_SPEND_REQUEST_DATE + '</td></tr>';
    body += '<tr><td>Requested Resource</td><td>' + budgetSpendRequestData.REQUESTED_RESOURCE + '</td></tr>';
    body += '<tr><td>Amount</td><td>' + budgetSpendRequestData.BUDGET_SPEND_REQUEST_AMOUNT + '</td></tr>';

    if(fromApprover){
    	body += '<tr><td>Status</td><td>' + budgetSpendRequestData.BUDGET_SPEND_REQUEST_STATUS_DISPLAY_NAME + '</td></tr>';
    }

    body += '</table>';

    if(fromApprover){
        body += '<p>All Budget Spend Request Information:</p>';

        //throw JSON.stringify(budgetSpendRequestList);
        budgetSpendRequestList.forEach(function (budgetSpendRequest){

            budgetSpendRequest.CHILDREN.forEach(function(elem){
                body += '<table><tr><th>Field</th><th>Current Value</th></tr>';
                body += '<tr><td>CRM</td><td>' + (elem.HL5_PATH || elem.HL6_PATH) + '</td></tr>';
                body += '<tr><td>CRM Description</td><td>' + elem.CRM_DESCRIPTION + '</td></tr>';
                body += '<tr><td>Request Type</td><td>' + elem.BUDGET_SPEND_REQUEST_TYPE_DISPLAY_NAME + '</td></tr>';
                body += '<tr><td>Requester</td><td>' + elem.BUDGET_SPEND_REQUEST_REQUESTER + '</td></tr>';
                body += '<tr><td>Requested on</td><td>' + elem.BSR_MODIFIED_DATE + '</td></tr>';
                body += '<tr><td>Requested Resource</td><td>' + elem.DESCRIPTION + '</td></tr>';
                body += '<tr><td>Amount</td><td>' + elem.BUDGET + '</td></tr>';
                body += '<tr><td>Status</td><td>' + elem.BUDGET_SPEND_REQUEST_STATUS_DISPLAY_NAME + '</td></tr>';
                body += '</table>';
            });
        });
    }

    body += reqBody.FOOTER ? '<p>' + reqBody.FOOTER + '<p>' : '';
    body += '<style> table { font-family: arial, sans-serif; border-collapse: collapse; }';
    body += 'tr th{ text-align:center; }';
    body += 'td,table th {text-align: left; padding: 8px; } </style>';
	
	mailObj.body = body;
	mailObj.subject = basicData.ENVIRONMENT+' MPT - Budget Spend Report';
	return mailObj;
}


function parseBudgetSpendRRequestForDailyNotification(data, basicData){
    var body = '';
    var appUrl = config.getAppUrl();

    body += '<p> Dear '+data.BUDGET_APPROVER_NAME+',</p>';

    body += '<p style="margin-bottom: 1rem;">The table below is listing all the budget requests assigned to you. Please review them and take action.</p>';

    body += '<table><tr><th>CRM</th><th>Budget Resource</th><th>Budget(EUR)</th></tr>';
    data.budgetRequestList.forEach(function (budgetSpendRequest) {
        var link = data.IS_MPT_USER
            ? appUrl + '#/SpendBudgetRequests/' + budgetSpendRequest.LEVEL + '/' + budgetSpendRequest.HL_ID + '/bsr/'
            + budgetSpendRequest.BUDGET_SPEND_REQUEST_ID
            : appUrl + '#/BudgetSpendRequestManagement/' + budgetSpendRequest.HASH;

        body += '<tr><td><a href="' + link + '">CRM-' + budgetSpendRequest.CRM_ID + '</a></td><td>'
            + budgetSpendRequest.BUDGET_RESOURCE + '</td><td>' + budgetSpendRequest.BUDGET + '</td></tr>';
    });

    body += '</table>';
    
    return {
        body: body,
        subject: basicData.ENVIRONMENT+' MPT - Budget Spend Daily Notification',
        budgetApproverEmail: [{address: data.BUDGET_APPROVER_EMAIL}]
    };
}
