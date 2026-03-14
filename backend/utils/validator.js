const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isPasswordStrong = (password) => {
  return password.length >= 6;
};

const isFieldEmpty = (field) => {
  return !field || field.trim() === "";
};

module.exports = {
  isEmailValid,
  isPasswordStrong,
  isFieldEmpty
};
