/**/$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataValidation = mapper.getDataValidation();

/** ***********END INCLUDE LIBRARIES*************** */

function getQuarterDates() {
    return {
        '1' : {
            start:new Date(new Date().getFullYear(), 0, 1).setHours(0, 0, 0, 0),
            end: new Date(new Date().getFullYear(), 2, 31).setHours(0, 0, 0, 0)
        },
        '2' : {
            start:new Date(new Date().getFullYear(), 3, 1).setHours(0, 0, 0, 0),
            end: new Date(new Date().getFullYear(), 5, 30).setHours(0, 0, 0, 0)
        },
        '3' : {
            start:new Date(new Date().getFullYear(), 6, 1).setHours(0, 0, 0, 0),
            end: new Date(new Date().getFullYear(), 8, 30).setHours(0, 0, 0, 0)
        },
        '4' : {
            start:new Date(new Date().getFullYear(), 9, 1).setHours(0, 0, 0, 0),
            end: new Date(new Date().getFullYear(), 11, 31).setHours(0, 0, 0, 0)
        }
    };
}

function validateActualDatesRange(campaignTypeId, campaignSubTypeId, Actual_Start_Date, Actual_End_Date){
    var Quarter = getQuarterDates();

	if(dataValidation.getValidateDateRule(campaignTypeId, campaignSubTypeId)){
		if(!Actual_Start_Date || !Actual_End_Date) return false;

		Actual_End_Date = new Date(Actual_End_Date).setHours(0, 0, 0, 0);
		Actual_Start_Date = new Date(Actual_Start_Date).setHours(0, 0, 0, 0);

		if(Actual_Start_Date.valueOf() == Quarter[1].start.valueOf() && Actual_End_Date.valueOf() == Quarter[4].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[1].start.valueOf() && Actual_End_Date.valueOf() == Quarter[1].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[2].start.valueOf() && Actual_End_Date.valueOf() == Quarter[2].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[3].start.valueOf() && Actual_End_Date.valueOf() == Quarter[3].end.valueOf()) return true;
		if(Actual_Start_Date.valueOf() == Quarter[4].start.valueOf() && Actual_End_Date.valueOf() == Quarter[4].end.valueOf()) return true;

	}
	return false;
}

function getMinMaxDateByIdAndLevel(HlId, Level){
	var bYear = dataValidation.getBudgetYearByIdLevel(HlId, Level, 0)[0];
    //var minDate = new Date(bYear.BUDGET_YEAR, 0, 1);
    //var maxDate = new Date(bYear.BUDGET_YEAR, 11, 31);
    // throw JSON.stringify(bYear);
    var minDate = new Date(bYear.START_DATE);
    var maxDate = new Date(bYear.END_DATE);
    return {MIN_DATE : formatDateToString(minDate), MAX_DATE: formatDateToString(maxDate)};
}

function formatDateToString (date, dateFormat) {
    if (!date) {
        return "";
    }

    var parsedDate = new Date(date);
    var year = parsedDate.getFullYear();
    var month = parsedDate.getMonth() + 1;
    var day = parsedDate.getDate();
    var hours = parsedDate.getHours();
    var minutes = parsedDate.getMinutes();
    var currentFormattedDate = "";
    switch (dateFormat) {
        case "MM-DD-YYYY":
            currentFormattedDate = ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2) + "-" + year;
            break;
        case "YYYY-MM-DD":
            currentFormattedDate = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);
            break;
        case "MM-DD-YYYY hh:mm":
            currentFormattedDate = ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2) + "-" + year + " " + hours + ":" + ("0" + minutes).slice(-2);
            break;
        case "defaultMessage":
            //Currently the default format for messages is MM-DD-YYYY hh:mm
            currentFormattedDate = ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2) + "-" + year + " " + hours + ":" + ("0" + minutes).slice(-2);
            break;
        default:
            //Currently the default format is MM-DD-YYYY
            currentFormattedDate = ("0" + month).slice(-2) + "/" + ("0" + day).slice(-2) + "/" + year;
            break;
    }
    return currentFormattedDate;
}