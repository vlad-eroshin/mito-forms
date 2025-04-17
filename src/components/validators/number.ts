/**
 * Validates if the input string is a number
 *
 * @param value input string
 * @param min optional min
 * @param max ptional max
 * @returns
 */
export const validateNumberField = (value: string | null, min?: number, max?: number) => {
  const res =
    !value || !isInteger(value) ? ['This field must be a valid number.', undefined] : true;
  if (res !== true) {
    return res;
  }
  const minValue: number = Number.isInteger(min) ? (min as number) : Number.MIN_VALUE;
  const maxValue: number = Number.isInteger(max) ? (max as number) : Number.MAX_VALUE;
  const intValue = parseInt(value as string, 10);
  if (intValue < minValue) {
    return [`This field must be greater than ${minValue}.`, undefined];
  }
  if (intValue > maxValue) {
    return [`This field must be less than ${maxValue}.`, undefined];
  }
  return true;
};

export const validateRequiredField = (
  value: unknown,
  errorMessage?: string
): boolean | string[] => {
  if (typeof value === 'boolean') {
    return true;
  } else if (!value) {
    return [errorMessage || 'This field is required'];
  }
  return true;
};

/**
 * Checks if the string is integer
 * @param value inpiut string
 * @returns true/false
 */
export const isInteger = (value?: string | null): boolean => {
  return value ? /^-?\d+$/u.test(value) : false;
};
