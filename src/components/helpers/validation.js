export const required = (value) =>
  value || (typeof value == "number" && value === 0)
    ? undefined
    : "This field is required";
export const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const digit = (value) =>
  value && !/^[0-9]*$/.test(value) ? "Must be a number" : undefined;
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLengthOTP = maxLength(6);
export const maxLengthMobileNo = maxLength(15);
export const maxLength20 = maxLength(20);
export const maxLength50 = maxLength(50);
export const maxLength150 = maxLength(150);
export const maxLength500 = maxLength(500);
export const maxLength1000 = maxLength(1000);
export const maxLength800 = maxLength(800);
const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLengthMobileNo = minLength(5);
export const minLengthOTP = minLength(6);
export const minLength8 = minLength(8);
const maxValue = (max) => (value) =>
  value && value > max ? `Must be at least ${max} or less` : undefined;
export const maxValueMobile = maxValue(999999999999999);
export const maxValueAmount = maxValue(2147483647);
export const maxValue127 = maxValue(127);
export const maxValue9 = maxValue(9);

const minValue = (min) => (value) =>
  value !== undefined && value !== null && value !== "" && value < min
    ? `Must be at least ${min}`
    : undefined;
export const minValueMobile = minValue(9999);
export const minValue10 = minValue(10);
export const minValue0 = minValue(0);
export const validateEmail = (value) =>
  value && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ? "Invalid email address"
    : undefined;
export const validateName = (value) =>
  value && !/^[a-zA-Z0-9]*$/.test(value) ? "Tên không được chứa kí tự đặc biệt" : undefined;
