$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataRegion = mapper.getDataRegion();
var dataSubRegion = mapper.getDataSubRegion();
var ErrorLib = mapper.getErrors();
var dataConfig = mapper.getDataConfig();
var InterlockLib = mapper.getInterlock();

/** ***********END INCLUDE LIBRARIES*************** */

function getAllRegions() {
	var regionlist = dataRegion.getAllRegions();
    if(regionlist){
    	regionlist = JSON.parse(JSON.stringify(regionlist));
        regionlist.forEach(function(i){
            var contactData =InterlockLib.getContactDataByOrgRelatedAndOrgId(
                dataConfig.getOrganizationRelated("REGION")
                ,i.REGION_ID);
            i.ASSOCIATED_CONTACTS = contactData.assigned;
            i.AVAILABLE_CONTACTS = contactData.availables;
        });
    }

    return regionlist;
}

function getRegionSubregion(){
	var regions = getAllRegions();
    regions = JSON.parse(JSON.stringify(regions));

    regions.forEach(function (region) {
    	region.MARKET_UNIT = dataSubRegion.getSubRegionsByRegionId(region.REGION_ID);
	});

    return regions;
}

function getRegionById(regionId) {
	var region = dataRegion.getRegionById(regionId);
	region = JSON.parse(JSON.stringify(region));

	var contacts = JSON.parse(JSON.stringify(InterlockLib.getContactDataByOrgRelatedAndOrgId(dataConfig.getOrganizationRelated("REGION"),
        region.REGION_ID)));
	region.ASSOCIATED_CONTACTS = contacts.ASSOCIATED_CONTACTS;
	region.AVAILABLE_CONTACTS = contacts.AVAILABLE_CONTACTS;

	return region;
}

function insertRegion(objRegion, userId) {
	var region = dataRegion.existRegion(objRegion);
	if (region)
		throw ErrorLib.getErrors().CustomError("","", "Region name already exist", objRegion);
	else
		return dataRegion.insertRegion(objRegion, userId);
}

function updateRegion(objRegion, userId) {
	if (validateUpdateRegion(objRegion)){
        dataRegion.updateRegion(objRegion, userId);
        return InterlockLib.updateContactDataByOrgRelatedAndOrgId(objRegion, userId);
	}

}

function deleteRegion(objRegion, userId) {
    if (validateDeleteRegion(objRegion)) {
        dataSubRegion.delSubregionsByRegion(objRegion, userId);
        return dataRegion.delRegion(objRegion, userId);
    }
	else
		throw ErrorLib.getErrors().CustomError("",
				"", "Region is already used, can't be deleted.");
}

function validateDeleteRegion(objRegion) {
	return dataRegion.canDeleteRegion(objRegion);
}

/* validations */
function validateInsertRegion(objRegion) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'IN_REGION_NAME', 'IN_REGION_ISO', 'IN_CREATED_USER_ID' ];

	if (!objRegion)
		throw ErrorLib.getErrors().CustomError("",
				"regionServices/handlePost/insertRegion",
				"The object Region is not found");

	try {
		keys.forEach(function(key) {
			if (objRegion[key] === null || objRegion[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objRegion[key])
				if (!isValid) {
					errors[key] = objRegion[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePost/insertRegion", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePost/insertRegion",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateRegion(objRegion) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'IN_REGION_ID', 'IN_REGION_NAME', 'IN_REGION_ISO',
			'IN_MODIFIED_USER_ID' ];

	if (!objRegion)
		throw ErrorLib.getErrors().CustomError("",
				"regionServices/handlePost/insertRegion",
				"The object Region is not found");

	try {
		keys.forEach(function(key) {
			if (objRegion[key] === null || objRegion[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objRegion[key])
				if (!isValid) {
					errors[key] = objRegion[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePut/updateRegion", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"regionServices/handlePut/updateRegion",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'IN_REGION_ISO':
		valid = value.length > 0 && value.length <= 100;
		break;
	case 'IN_REGION_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'IN_CREATED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_REGION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	return valid;
}

function validateRegionAndMarketUnit(idRegion, idMarketUnit){
	dataRegion.validateRegionAndMarketUnit(idRegion, idMarketUnit);
}