const apiResponse = ({ statusCode, data, error, message }) => {
  return (res)=>{
    switch (statusCode) {
      case 200:
        return res.status(statusCode).json(successResponse({ data, message, statusCode }));
        break;
  
      case 400:
        return res.status(statusCode).json(errorResponse({ error, message, statusCode }));
        break;
  
      default:
        break;
    }
  }
  
};

const successResponse = ({ data, message, statusCode }) => {
  return {
    data,
    success: true,
    message,
    statusCode,
  };
};

const errorResponse = ({ error, message, statusCode }) => {
  return {
    error,
    success: false,
    message,
    statusCode,
  };
};

module.exports = apiResponse;
