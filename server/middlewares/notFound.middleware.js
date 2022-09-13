const notFoundMiddleware = (request, response) => {
  return response.status(404).json({
    message:"Resource not found"
  });
};

export default notFoundMiddleware;