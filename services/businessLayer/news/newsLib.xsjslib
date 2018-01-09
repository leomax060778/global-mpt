$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var dataNews = mapper.getDataNews();
var ErrorLib = mapper.getErrors();
// var userRoleLib = mapper.getUserRole();
var dataPermission = mapper.getDataPermission();

var statusMap = {
	"Pending": 1,
	"Archive": 2,
	"Published": 3
};

function getAllNewsStatus() {
    return dataNews.getAllNewsStatus();
}

function getNewsUnread(userId) {
	try {
	    var result = dataNews.getNewsUnreadManual(userId);
	    result = JSON.parse(JSON.stringify(result));
	    var newsTextLength = 5000;
	    var splitNumber = result.CONTENT_LENGTH / newsTextLength;
	    var startPosition = 1;
	    var newsContent = "";
	    var newsId = result.NEWS_ID;
	    var i;
	    for (i = 0; i < splitNumber; i++) {
	        newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
	        startPosition = startPosition + newsTextLength;
	    }
	    result.CONTENT = newsContent;
	    dbHelper.commit();
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
	} finally {
		dbHelper.closeConnection();
	}
	return [result];
}

function getNewsById(newsId, userId) {
    if (!newsId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "", newsId);
    }
    try {
        var result = dataNews.getManualNewsById(newsId);
        result = JSON.parse(JSON.stringify(result));

        var newsTextLength = 5000;
        var splitNumber = result.CONTENT_LENGTH / newsTextLength;
        var startPosition = 1;
        var newsContent = "";
        var i;
        for (i = 0; i < splitNumber; i++) {
            newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
            startPosition = startPosition + newsTextLength;
        }
        result.CONTENT = newsContent;
        dbHelper.commit();
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "",
            e.toString());
    } finally {
        dbHelper.closeConnection();
    }
    return result;
}

function getManualNewsById(newsId) {
    if (!newsId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "", newsId);
    }
    if (!newsId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "", newsId);
    }
    
    var result = dataNews.getManualNewsById(newsId);
    result = JSON.parse(JSON.stringify(result));
    var newsTextLength = 5000;
    var splitNumber = result.CONTENT_LENGTH / newsTextLength;
    var startPosition = 1;
    var newsContent = "";
    var i;
    for (i = 0; i < splitNumber; i++) {
        newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
        startPosition = startPosition + newsTextLength;
    }
    result.CONTENT = newsContent;

    return result;
}

function getAllNews(userId) {
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var news = dataNews.getAllNews();

    news = JSON.parse(JSON.stringify(news));
    news.forEach(function(elem){
    	var splitNumber;
        var newsId;
        var i;
    	var startPosition = 1;
    	var newsTextLength = 5000;
    	var newsContent = "";
	    splitNumber = elem.CONTENT_LENGTH / newsTextLength;
	    newsId = elem.NEWS_ID;
	    for (i = 0; i < splitNumber; i++) {
	        newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
	        startPosition = startPosition + newsTextLength;
	    }
	    elem.CONTENT = newsContent;
    });
    return news;
}

function getNewsByStatus(statusId, userId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }

    return dataNews.getNewsByStatus(statusId);
}

function getNewsByYear(budgetYearId, userId) {
    if (!budgetYearId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter in_year is not found", "", budgetYearId);
    }
    
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    
    var news = dataNews.getNewsByYear(budgetYearId);

    news = JSON.parse(JSON.stringify(news));
    news.forEach(function(elem){
    	var splitNumber;
        var newsId;
        var i;
    	var startPosition = 1;
    	var newsTextLength = 5000;
    	var newsContent = "";
	    splitNumber = elem.CONTENT_LENGTH / newsTextLength;
	    newsId = elem.NEWS_ID;
	    for (i = 0; i < splitNumber; i++) {
	        newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
	        startPosition = startPosition + newsTextLength;
	    }
	    elem.CONTENT = newsContent;
    });
    return news;
}

function getNewsByStatusYear(statusId, year) {
    if (!year) {
        throw ErrorLib.getErrors().BadRequest("The Parameter in_year is not found", "", year);
    }
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }

    var objNews = {};
    objNews.BUDGET_YEAR_ID = year;
    objNews.STATUS_ID = statusId;

    var news = dataNews.getNewsByStatusYear(objNews);

    news = JSON.parse(JSON.stringify(news));
    news.forEach(function(elem){
        var splitNumber;
        var newsId;
        var i;
        var startPosition = 1;
        var newsTextLength = 5000;
        var newsContent = "";
        splitNumber = elem.CONTENT_LENGTH / newsTextLength;
        newsId = elem.NEWS_ID;
        for (i = 0; i < splitNumber; i++) {
            newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
            startPosition = startPosition + newsTextLength;
        }
        elem.CONTENT = newsContent;
    });
    return news;
}

function newsRead(objNews, userId) {
    if (!objNews.NEWS_ID) {
        throw ErrorLib.getErrors().BadRequest("The Parameter NEWS_ID is not found", "", "");
    }
    return dataNews.insertNewsRead(objNews, userId);
}

function insertNews(objNews, userId) {
    if (validateInsertNews(objNews, userId)) {
        return dataNews.insertNews(objNews, userId);
    }
}

function existNews(newsId) {
    return Object.keys(getManualNewsById(newsId)).length > 0;
}

function updateNews(objNews, userId) {
    if (validateUpdateNews(objNews, userId)) {
    	var oldNews = getManualNewsById(objNews.NEWS_ID);
    	
        if (!Object.keys(oldNews).length > 0) {
            throw ErrorLib.getErrors().CustomError("", "", "The News with the id " + objNews.NEWS_ID + " does not exist");
        }
        if(Number(objNews.STATUS_ID) === statusMap.Published && Number(oldNews.STATUS_ID) !== statusMap.Published){
        	dataNews.updateNewsPublishedStatus(objNews, userId);
        }
        return dataNews.updateNews(objNews, userId);
    }
}

function updateNewsStatus(objNews, userId) {
    if (!(Array.isArray(objNews.NEWS_STATUS) && objNews.NEWS_STATUS.length > 0)) {
        throw ErrorLib.getErrors().BadRequest("The Parameter news elements is not found", "", objNews);
    }
    try {
        (objNews.NEWS_STATUS).forEach(function (news) {
            updateSingleNewsStatus(news, userId);
        });
        dbHelper.commit();
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.closeConnection();
    }
    return {};
}

function updateSingleNewsStatus(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!objNews.STATUS_ID) {
        throw ErrorLib.getErrors().BadRequest("The Parameter STATUS_ID is not found", "", objNews.STATUS_ID);
    }
    if (validateUpdateNewsStatus(objNews, userId)) {
    	var oldNews = getManualNewsById(objNews.NEWS_ID);
    	
        if (!Object.keys(oldNews).length > 0) {
            throw ErrorLib.getErrors().CustomError("",
                "",
                "The News with the id " + objNews.NEWS_ID + " does not exist");
        } else {
        	 if(Number(objNews.STATUS_ID) === statusMap.Published && Number(oldNews.STATUS_ID) !== statusMap.Published){
             	return dataNews.updateNewsPublishedStatus(objNews, userId);
             }else{
            	return dataNews.updateNewsStatusManual(objNews, userId);
             }
           
        }
    }
}

function deleteNews(newsId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!newsId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "", newsId);
    }
    if (!existNews(newsId, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The News with the id " + newsId + " does not exist");
    } else {
        return dataNews.deleteNews(newsId, userId);
    }
}

function validateInsertNews(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['TITLE',
        'DESCRIPTION',
        'STATUS_ID',
        'CONTENT'
    ];

    var optionalKeys = ['ATTACHMENT_ID'];

    if (!objNews) {
        throw ErrorLib.getErrors().CustomError("", "", "The object News is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objNews[key] === null || objNews[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objNews[key]);
                if (!isValid) {
                    errors[key] = objNews[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    if (objNews.ATTACHMENT_ID) {
        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objNews[key]);
            if (!isValid) {
                errors[key] = objNews[key];
                throw BreakException;
            }
        });
        isValid = true;
    }
    return isValid;
}

function validateUpdateNews(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['NEWS_ID',
        'TITLE',
        'DESCRIPTION',
        'STATUS_ID',
        'CONTENT'
    ];

    var optionalKeys = ['ATTACHMENT_ID'];

    if (!objNews) {
        throw ErrorLib.getErrors().CustomError("", "", "The object News is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objNews[key] === null || objNews[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objNews[key]);
                if (!isValid) {
                    errors[key] = objNews[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    if (objNews.ATTACHMENT_ID) {
        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objNews[key]);
            if (!isValid) {
                errors[key] = objNews[key];
                throw BreakException;
            }
        });
        isValid = true;
    }
    return isValid;
}

function validateUpdateNewsStatus(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['NEWS_ID',
        'STATUS_ID'
    ];

    if (!objNews) {
        throw ErrorLib.getErrors().CustomError("", "", "The object News is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objNews[key] === null || objNews[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objNews[key]);
                if (!isValid) {
                    errors[key] = objNews[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'NEWS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'TITLE':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 2000;
            break;
        case 'AUTHOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ATTACHMENT_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CONTENT':
            valid = (value && value.length > 0);
            break;
    }
    return valid;
}