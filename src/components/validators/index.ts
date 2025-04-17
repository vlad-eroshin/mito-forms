import type { InputField, ValidationFunctionType, ValidatorType } from '../../types';
import { validateSimpleEmail } from './email';
import { validateNumberField, validateRequiredField } from './number';

export const getValidatorFunction = (
  typeOrFn: ValidatorType | ValidationFunctionType<string>,
  field?: InputField
): ValidationFunctionType<string> => {
  if (typeof typeOrFn === 'function') {
    return typeOrFn as ValidationFunctionType<string>;
  }
  const validatorType = typeOrFn as ValidatorType;
  switch (validatorType) {
    case 'required': {
      return value => {
        return validateRequiredField(value);
      };
    }
    case 'number':
      return ((value: string | null) => {
        return validateNumberField(value, field?.minValue, field?.maxValue);
      }) as ValidationFunctionType<string>;
    case 'string':
      return ((value: string | null) => {
        return value != null;
      }) as ValidationFunctionType<string>;
    case 'emailMultiline':
      // Validates that the value is a multiline string
      // with every line being a valid email
      return (value: string | null) => {
        const emails = value?.split('\n');
        if (!emails) {
          return true;
        }

        for (const email of emails) {
          if (!validateSimpleEmail(email)) {
            return `"${email}" is not a valid email`;
          }
        }

        return true;
      };
    default:
      return ((_value: string) => {
        return ['', undefined];
      }) as ValidationFunctionType<string>;
  }
};
