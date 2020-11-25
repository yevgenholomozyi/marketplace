const errorFunc = (errorObj) => {
    const error = new Error(errorObj);
    error.httpStatusCode = 500;
    console.log(error);
    return error;
};
module.exports = errorFunc;