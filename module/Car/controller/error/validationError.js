module.exports = class AutoValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AutoValidationError';
  }
};
