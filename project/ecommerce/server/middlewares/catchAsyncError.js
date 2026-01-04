export const catchAsyncErrors = (thefunction) => {
  return (req, res, next) => {
    promise.resolve(thefunction(req, res, next)).catch(next);
  };
};
