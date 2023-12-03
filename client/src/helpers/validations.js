export function validateEmail(email) {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailPattern.test(email)) {
    return "Incorrect email format";
  }
  return "";
}
export function validatePassword(password) {
  if (password.length < 8 || password.length > 30) {
    return "Password length should be between 8 and 30 characters";
  }
  const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  const numberPattern = /[0-9]/;
  const lowercasePattern = /[a-z]/;
  const uppercasePattern = /[A-Z]/;
  if (
    !specialCharPattern.test(password) ||
    !numberPattern.test(password) ||
    !lowercasePattern.test(password) ||
    !uppercasePattern.test(password)
  ) {
    return "Password should contain at least one special character, one number, one lowercase letter, and one uppercase letter";
  }
  return "";
}

export function validatePasswordLength(password) {
  return password.length < 8 || password.length > 30
    ? "Password length should be between 8 and 30 characters"
    : "";
}

export function validateUsername(username) {
  return !username
    ? "Username is required"
    : username.length < 4 || username.length > 20
    ? "Username length should be between 4 and 20 characters"
    : !/^[A-Za-z ]+$/.test(username)
    ? "Username can only contain alphabets and spaces."
    : username.startsWith(" ") || username.endsWith(" ")
    ? "Username cannot start or end with a space."
    : /  +/.test(username)
    ? "Username cannot have more than one consecutive space."
    : "";
}
export function validateFace(face) {
  return !face ? "Face ID is required" : "";
}