import { SelectInput } from '../../src/components/EditorInput/SelectInput';

export default {
  title: 'Material UI/Selector',
  component: SelectInput,
  parameters: {},
  args: {}
};

export const Basic = {
  args: {
    config: {
      name: 'switchList',
      label: 'Selector'
    },
    value: ['1'],
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ]
  }
};