import { SwitchInput } from '../../src/components/EditorInput/SwitchInput';


export default {
  title: 'Material UI/Switch List',
  component: SwitchInput,
  parameters: {},
  args: {}
};

export const Basic = {
  args: {
    config: {
      name: 'switchList',
      label: 'Switch List',
      value: '2'
    },
    value: ['1', '4'],
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ]
  }
};