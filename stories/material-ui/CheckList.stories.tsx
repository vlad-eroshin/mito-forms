import { ChecklistInput } from '../../src/components/EditorInput/ChecklistInput';


export default {
  title: 'Material UI/CheckList',
  component: ChecklistInput,
  parameters: {},
  args: {}
};

export const Basic = {
  args: {
    config: {
      name: 'checkList',
      label: 'Check List',
      value: '2'
    },
    value: ['1', '2'],
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ]
  }
};