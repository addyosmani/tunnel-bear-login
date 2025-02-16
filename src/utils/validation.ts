/**
 * Validates if the input string is a valid email address.
 * @param email - The email address to validate.
 * @returns `true` if the email is valid, otherwise `false`.
 */
export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }