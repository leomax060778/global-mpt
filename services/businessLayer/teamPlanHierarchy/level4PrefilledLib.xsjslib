$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataHL4Prefilled = mapper.getDataLevel4Prefilled();
var ErrorLib = mapper.getErrors();

function getAllHL4Prefilled() {
	return dataHL4Prefilled.getAllHL4Prefilled();
}

function getHL4PrefilledById(hl4PrefilledId, userId) {
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"level4PrefilledService/handleGet/getHL4PrefilledById", userId);
	if (!hl4PrefilledId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter hl4PrefilledId is not found",
				"level4PrefilledService/handleGet/getHL4PrefilledById", hl4PrefilledId);

	return dataHL4Prefilled.getHL4PrefilledById(hl4PrefilledId);
}

function insertHL4Prefilled(reqBody, userId) {
	if (validateInsertHL4Prefilled(reqBody, userId)) {
		return dataHL4Prefilled.insertHL4Prefilled(reqBody, userId);
	}
}

function updateHL4Prefilled(reqBody, userId) {
	if (validateUpdateHL4Prefilled(reqBody, userId)) {
		if (!existHL4Prefilled(reqBody.HL4_PREFILLED_ID, userId)) {
			throw ErrorLib.getErrors().CustomError("",
					"level4PrefilledService/handlePut/updateHL4Prefilled",
					"The object HL4 Prefilled doesn't exist");
		} else {
			return dataHL4Prefilled.updateHL4Prefilled(reqBody, userId);
		}
	}
}

function deleteHL4Prefilled(hl4PrefilledId, userId) {
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"level4PrefilledService/handleDelete/deleteHL4Prefilled", userId);
	if (!hl4PrefilledId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter hl4PrefilledId is not found",
				"level4PrefilledService/handleDelete/deleteHL4Prefilled", hl4PrefilledId);
	if (!existHL4Prefilled(hl4PrefilledId, userId)) {
		throw ErrorLib.getErrors().CustomError("",
				"level4PrefilledService/handleDelete/deleteHL4Prefilled",
				"The object HL4 Prefilled doesn't exist");
	}

	return dataHL4Prefilled.deleteHL4Prefilled(hl4PrefilledId, userId);
}

function validateInsertHL4Prefilled(objHL4Prefilled, userId) {

	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"level4PrefilledService/handlePost/insertHL4Prefilled", userId);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'ACRONYM', 'CRM_DESCRIPTION', 'DETAILS', 'BUSINESS_DETAILS' ];

	if (!objHL4Prefilled)
		throw ErrorLib.getErrors().CustomError("",
				"level4PrefilledService/handlePost/insertHL4Prefilled",
				"The object objHL4Prefilled is not found");

	try {
		keys.forEach(function(key) {
			if (objHL4Prefilled[key] === null || objHL4Prefilled[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objHL4Prefilled[key])
				if (!isValid) {
					errors[key] = objHL4Prefilled[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"level4PrefilledService/handlePost/insertHL4Prefilled", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"level4PrefilledService/handlePost/insertHL4Prefilled",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateHL4Prefilled(objHL4Prefilled, userId) {

	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"level4PrefilledService/handlePut/updateHL4Prefilled", userId);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'HL4_PREFILLED_ID', 'ACRONYM', 'CRM_DESCRIPTION', 'DETAILS', 'BUSINESS_DETAILS' ];

	if (!objHL4Prefilled)
		throw ErrorLib.getErrors().CustomError("",
				"level4PrefilledService/handlePut/updateHL4Prefilled",
				"The object objHL4Prefilled is not found");

	try {
		keys.forEach(function(key) {
			if (objHL4Prefilled[key] === null || objHL4Prefilled[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objHL4Prefilled[key])
				if (!isValid) {
					errors[key] = objHL4Prefilled[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"level4PrefilledService/handlePut/updateHL4Prefilled", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"level4PrefilledService/handlePut/updateHL4Prefilled",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'HL4_PREFILLED_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ACRONYM':
		valid = value.length > 0 && value.length <= 25;
		break;
	case 'CRM_DESCRIPTION':
		valid = value.length > 0 && value.length <= 100;
		break;
	case 'DETAILS':
		valid = value.length > 0 && value.length <= 3000;
		break;
	case 'BUSINESS_DETAILS':
		valid = value.length > 0 && value.length <= 3000;
		break;
	}
	return valid;
}

function existHL4Prefilled(hl4PrefilledId, userId) {
	return getHL4PrefilledById(hl4PrefilledId, userId).length > 0;
}