import { RadiolistInput } from '../../src/components/EditorInput/RadiolistInput';


export default {
  title: 'Material UI/Radio List',
  component: RadiolistInput,
  parameters: {},
  args: {}
};

export const Basic = {
  args: {
    config: {
      name: 'checkList',
      label: 'Radio List',
      value: '2'
    },
    value: '2',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ]
  }
};