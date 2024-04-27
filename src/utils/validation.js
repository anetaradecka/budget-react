import validator from "validator";

export function isValidEmail(value) {
  return validator.isEmail(value);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isValidPassword(value) {
  const lowerCase = /[a-z]/g;
  const upperCase = /[A-Z]/g;
  const numbers = /[0-9]/g;

  if (
    value.match(lowerCase) &&
    value.match(upperCase) &&
    value.match(numbers) &&
    value.length >= 5
  ) {
    return true;
  } else {
    return false;
  }
}

export function isEqualToOtherValue(firstValue, secondValue) {
  return firstValue === secondValue;
}
