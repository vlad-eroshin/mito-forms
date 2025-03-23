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
      jsonPath: '$.other.textValue',
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
      jsonPath: '$.to.values.textValue',
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
