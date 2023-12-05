const apiResponse = ({ statusCode, data, error, message }) => {
  switch (statusCode) {
    case 200:
      return successResponse({ data, message, statusCode });
      break;

    case 400:
      return errorResponse({ error, message, statusCode });
      break;

    default:
      break;
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
