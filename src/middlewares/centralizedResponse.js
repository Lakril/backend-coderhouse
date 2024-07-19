// Import HTTP status codes for readability
const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_AUTHORIZED: 401,
};

// Centralized response handler
function sendResponse(res, statusCode, statusMessage, payload = {}, additionalFields = {}) {
    res.status(statusCode).json({
        status: statusMessage,
        // Ensuring payload is always in JSON format
        payload: JSON.parse(JSON.stringify(payload)),
        ...additionalFields,
    });
}

export function centralizedResponse(req, res, next) {
    // Success responses
    res.created = (objCreated, otherFields = {}) => {
        sendResponse(res, STATUS_CODES.CREATED, 'success', objCreated, otherFields);
    };

    res.ok = (result) => {
        sendResponse(res, STATUS_CODES.OK, 'success', result);
    };

    // Error responses
    res.notFound = (message) => {
        sendResponse(res, STATUS_CODES.NOT_FOUND, 'error', {}, { message });
    };

    res.notServer = (message) => {
        sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'error', {}, { message });
    };
    res.notAuthorized = (message) => {
        sendResponse(res, STATUS_CODES.NOT_AUTHORIZED, 'error', {}, { message });
    };

    next();
}
