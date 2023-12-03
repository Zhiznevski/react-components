export function checkPasswordStrength(password: string) {
  const regex =
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
  if (regex.test(password)) {
    return 'strong';
  } else if (password.length && password.length >= 8) {
    return 'medium';
  } else {
    return 'weak';
  }
}
