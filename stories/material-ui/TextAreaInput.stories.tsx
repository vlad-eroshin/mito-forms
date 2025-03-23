import { TextBoxInput } from '../../src/components/EditorInput/TextBoxInput';


export default {
  title: 'Material UI/TextAreaInput',
  component: TextBoxInput,
  parameters: {},
  args: {}
};

export const Basic = {
  args: {
    config: {
      name: 'basicInput',
      label: 'Basic Text Area',
      value: 'Some Text Value'
    }
  }
};
