import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextField } from '../inputs/TextField';
import { CheckBox } from '../inputs/CheckBox';
import { Selector } from '../inputs/Selector';
import { SwitchField } from '../inputs/SwitchField';
import { ButtonSelector } from '../inputs/ButtonSelector';
import { AddRowButton } from '../components/AddRowButton';
import { DeleteRowButton } from '../components/DeleteRowButton';
import { FieldDecorator } from '../decorators/FieldDecorator';

const ComponentShowcaseComponent = () => {
  const [textValue, setTextValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [buttonValue, setButtonValue] = useState('');

  const selectOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const buttonOptions = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">shadcn/ui Components Showcase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Input Fields</h2>
          
          <FieldDecorator
            id="text-field"
            label="Text Field"
            required={true}
            isValid={true}
            controlElement={
              <TextField
                config={{ name: 'textField', type: 'text' }}
                value={textValue}
                onChange={(data) => setTextValue(data.textField as string)}
              />
            }
          />

          <FieldDecorator
            id="checkbox-field"
            label="Checkbox Field"
            isValid={true}
            controlElement={
              <CheckBox
                config={{ name: 'checkboxField', type: 'checkbox' }}
                value={checkboxValue}
                onChange={(data) => setCheckboxValue(data.checkboxField as boolean)}
                label="Subscribe to newsletter"
              />
            }
          />

          <FieldDecorator
            id="select-field"
            label="Select Field"
            isValid={true}
            controlElement={
              <Selector
                config={{ name: 'selectField', type: 'select' }}
                value={selectValue}
                onChange={(data) => setSelectValue(data.selectField as string)}
                options={selectOptions}
              />
            }
          />

          <FieldDecorator
            id="switch-field"
            label="Switch Field"
            isValid={true}
            controlElement={
              <SwitchField
                config={{ name: 'switchField', type: 'switch' }}
                value={switchValue}
                onChange={(data) => setSwitchValue(data.switchField as boolean)}
                label="Enable notifications"
              />
            }
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Button Components</h2>
          
          <FieldDecorator
            id="button-selector"
            label="Button Selector"
            isValid={true}
            controlElement={
              <ButtonSelector
                config={{ name: 'buttonSelector', type: 'buttonSelector' }}
                value={buttonValue}
                onChange={(data) => setButtonValue(data.buttonSelector as string)}
                options={buttonOptions}
              />
            }
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Utility Buttons</h3>
            <div className="flex gap-4">
              <AddRowButton 
                onClick={() => console.log('Add row clicked')}
                text="Add Item"
              />
              <DeleteRowButton 
                onClick={() => console.log('Delete row clicked')}
                text="Remove Item"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Values</h3>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{JSON.stringify({
  text: textValue,
  checkbox: checkboxValue,
  select: selectValue,
  switch: switchValue,
  button: buttonValue,
}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ComponentShowcaseComponent> = {
  title: 'shadcn/ComponentShowcase',
  component: ComponentShowcaseComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
