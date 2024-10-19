const defaultResponse = (success = true, message = '', data = {}, statusCode = 200) => {
    return {
        success,
        message,
        data,
        statusCode
    };
};

const errorResponse = (message = 'Something went wrong', statusCode = 500, errors = null) => {
    return {
        success: false,
        message,
        errors,
        statusCode
    };
};

module.exports = {
    defaultResponse,
    errorResponse
};