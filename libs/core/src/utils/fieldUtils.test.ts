import type { FieldSetMetadata, ParamsMap } from '../types';
import TEST_INPUT_OBJECT from '../../../bulma/src/__data__/mockInputObject.json';
import { convertInputOptions, getFieldValues } from './fieldUtils';

export const BASIC_FIELDSET = {
  name: 'testFieldSet',
  jsonPath: '$.path.to.fieldsetData',
  fields: [
    {
      type: 'text',
      name: 'label',
      label: 'Label',
    },
    {
      type: 'text',
      name: 'value',
      label: 'Value',
    },
  ],
};

export const TEST_FIELDSET_NO_PATH = {
  name: 'testFieldSet',
  fields: [
    {
      type: 'text',
      name: 'funcValue',
      label: 'Func Value',
      value: (inputData: { other: { numericValue1: number } }) => {
        return inputData.other.numericValue1;
      },
    },
    {
      type: 'text',
      name: 'jsonPathValue',
      label: 'Json Path Value',
      value: '{$.other.textValue}',
    },
    {
      type: 'text',
      name: 'setValue',
      label: 'Set Value',
      value: 'Set Value',
    },
    {
      type: 'text',
      name: 'defaultValue',
      label: 'Default Value',
      default: 'Default Value',
    },
  ],
};

export const TEST_FIELDSET_WITH_PATH = {
  name: 'testFieldSet',
  jsonPath: '$.otherPath',
  fields: [
    {
      type: 'text',
      name: 'funcValue',
      label: 'Func Value',
      value: (inputData: { to: { values: { numericValue: number } } }) => {
        return inputData.to.values.numericValue;
      },
    },
    {
      type: 'text',
      name: 'jsonPathValue',
      label: 'Json Path Value',
      value: '{$.to.values.textValue}',
    },
    {
      type: 'text',
      name: 'setValue',
      label: 'Set Value',
      value: 'Set Value',
    },
    {
      type: 'text',
      name: 'defaultValue',
      label: 'Default Value',
      default: 'Default Value',
    },
  ],
};

describe('FormEditor: getFieldValues', () => {
  it('test initial fields data', () => {
    const fieldValues = getFieldValues(
      TEST_INPUT_OBJECT,
      BASIC_FIELDSET as FieldSetMetadata
    ) as ParamsMap;
    expect(fieldValues.label).toBe('Label Text');
    expect(fieldValues.value).toBe('Value Text');
  });
  it('test initial field values: no json path', () => {
    const fieldValues = getFieldValues(
      TEST_INPUT_OBJECT,
      TEST_FIELDSET_NO_PATH as FieldSetMetadata
    ) as ParamsMap;
    expect(fieldValues.funcValue).toBe(10);
    expect(fieldValues.jsonPathValue).toBe('textValue123');
    expect(fieldValues.setValue).toBe('Set Value');
    expect(fieldValues.defaultValue).toBe('Default Value');
  });
  it('test initial field values: json path', () => {
    const fieldValues = getFieldValues(
      TEST_INPUT_OBJECT,
      TEST_FIELDSET_WITH_PATH as FieldSetMetadata
    ) as ParamsMap;
    expect(fieldValues.funcValue).toBe(12);
    expect(fieldValues.jsonPathValue).toBe('Text Value');
    expect(fieldValues.setValue).toBe('Set Value');
    expect(fieldValues.defaultValue).toBe('Default Value');
  });
});

describe('FormEditor: convertInputOptions', () => {
  it('test convertInputOptions from strings', () => {
    const resultOptions = convertInputOptions(['a', 'b', 'c']);
    expect(resultOptions).toStrictEqual([
      { label: 'a', value: 'a', checked: false, disabled: false, params: {} },
      { label: 'b', value: 'b', checked: false, disabled: false, params: {} },
      { label: 'c', value: 'c', checked: false, disabled: false, params: {} },
    ]);
  });
  it('test convertInputOptions from object', () => {
    const resultOptions = convertInputOptions([
      { value: 'a', label: 'a' },
      { value: 'b', label: 'b' },
      { value: 'c', label: 'c' },
    ]);
    expect(resultOptions).toStrictEqual([
      { label: 'a', value: 'a', checked: false, disabled: false, params: {} },
      { label: 'b', value: 'b', checked: false, disabled: false, params: {} },
      { label: 'c', value: 'c', checked: false, disabled: false, params: {} },
    ]);
  });
  it('test convertInputOptions from strings and some are checked', () => {
    const resultOptions = convertInputOptions(['a', 'b', 'c', 'd'], ['b', 'd']);
    expect(resultOptions).toStrictEqual([
      { label: 'a', value: 'a', checked: false, disabled: false, params: {} },
      { label: 'b', value: 'b', checked: true, disabled: false, params: {} },
      { label: 'c', value: 'c', checked: false, disabled: false, params: {} },
      { label: 'd', value: 'd', checked: true, disabled: false, params: {} },
    ]);
  });
});
