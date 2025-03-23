import { getValidatorFunction } from '.';

describe('validator tests', () => {
  it('number validator', () => {
    const validatorFunction = getValidatorFunction('number', {
      name: 'fieldName',
      type: 'select'
    });
    expect(validatorFunction('5000')).toBe(true);
    expect(validatorFunction('500000000')).toBe(true);
    expect(validatorFunction('vlad')).toEqual([expect.anything(), undefined]);
  });

  it('number validator, min max', () => {
    const validatorFunction = getValidatorFunction('number', {
      name: 'fieldName',
      type: 'select',
      minValue: -5,
      maxValue: 100000
    });

    expect(validatorFunction('5000')).toBe(true);
    expect(validatorFunction('-1')).toBe(true);
    expect(validatorFunction('-10')).toEqual([expect.anything(), undefined]);
    expect(validatorFunction('100000')).toBe(true);
    expect(validatorFunction('100001')).toEqual([expect.anything(), undefined]);
    expect(validatorFunction('vlad')).toEqual([expect.anything(), undefined]);
  });

  it('string validator', () => {
    const validatorFunction = getValidatorFunction('string', {
      name: 'fieldName',
      type: 'select'
    });

    expect(validatorFunction('5000')).toBe(true);
    expect(validatorFunction(null)).toBe(false);
  });

  it('emailMultiline', () => {
    const validatorFunction = getValidatorFunction('emailMultiline', {
      name: 'fieldName',
      type: 'select'
    });

    expect(validatorFunction('abcdef')).toBe('"abcdef" is not a valid email');
    expect(validatorFunction(null)).toBe(true);
  });

  it('custom validator function', () => {
    const validatorFunction = getValidatorFunction(
      (x: string | null) => {
        return x === 'vlad';
      },
      {
        name: 'fieldName',
        type: 'select'
      }
    );

    expect(validatorFunction('abcdef')).toBe(false);
    expect(validatorFunction('vlad')).toBe(true);
  });
});
