// Simple validation of whether a string is an email
// this is not exhaustive -- the exhaustive regex is complex and
// unnecessary for our purposes.
// https://stackoverflow.com/a/4964766
export const validateSimpleEmail = (email: string) => {
  return /^\S+@\S+\.\S+$/u.test(email);
};
