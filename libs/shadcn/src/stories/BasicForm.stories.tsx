import type { Meta, StoryObj } from '@storybook/react';
import { FormEditor } from '@mito-forms/core';
import { SHADCN_REGISTRY } from '../registry';

const BasicFormComponent = () => {
  const registry = SHADCN_REGISTRY;

  const editorMetadata = {
    forms: [
      {
        id: 'basic-form',
        title: 'Basic Form Example',
        showTitle: true,
        fieldSets: [
          {
            name: 'personal',
            type: 'fieldSet' as const,
            legend: 'Personal Information',
            fields: [
              {
                name: 'firstName',
                type: 'text' as const,
                label: 'First Name',
                required: true
              },
              {
                name: 'lastName',
                type: 'text' as const,
                label: 'Last Name',
                required: true
              },
              {
                name: 'email',
                type: 'text' as const,
                label: 'Email',
                required: true
              },
              {
                name: 'bio',
                type: 'textbox' as const,
                label: 'Bio'
              },
              {
                name: 'subscribe',
                type: 'checkbox' as const,
                label: 'Subscribe to newsletter'
              }
            ]
          }
        ]
      }
    ]
  };

  const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    subscribe: false
  };


  return (
    <div className="max-w-2xl mx-auto p-6">
      <FormEditor
        editorMetadata={editorMetadata}
        initialData={initialData}
        onChange={(result, isValid) =>
          console.log('Form data changed:', { result, isValid })
        }
        componentRegistry={registry}
      />
    </div>
  );
};

const meta: Meta<typeof BasicFormComponent> = {
  title: 'shadcn/BasicForm',
  component: BasicFormComponent,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
