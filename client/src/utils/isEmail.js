export function isEmail(email) {
  if (typeof email !== "string") return false;

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate format and google domain
  return emailRegex.test(email) && email.toLowerCase().endsWith("@gmail.com");
}
