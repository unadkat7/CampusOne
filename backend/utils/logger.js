const logInfo = (message) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
};

const logError = (message) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
};

const logWarning = (message) => {
  console.warn(`[WARNING] ${new Date().toISOString()} - ${message}`);
};

module.exports = {
  logInfo,
  logError,
  logWarning
};
