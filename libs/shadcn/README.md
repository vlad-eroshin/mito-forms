# @mito-forms/shadcn

A shadcn/ui and Tailwind CSS 4 implementation for Mito Forms.

## Installation

```bash
npm install @mito-forms/shadcn @mito-forms/core
# or
pnpm add @mito-forms/shadcn @mito-forms/core
```

## Usage

```tsx
import React from 'react';
import { EditorContext, InputForm } from '@mito-forms/core';
import { createShadcnComponentRegistry } from '@mito-forms/shadcn';

const MyForm = () => {
  const registry = createShadcnComponentRegistry();
  
  const formConfig = {
    id: 'my-form',
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
            required: true,
          },
          {
            name: 'email',
            type: 'text' as const,
            label: 'Email',
            required: true,
          },
        ],
      },
    ],
  };

  return (
    <EditorContext.Provider value={{ componentRegistry: registry }}>
      <InputForm
        config={formConfig}
        inputData={{}}
        onChange={(data) => console.log('Form data:', data)}
      />
    </EditorContext.Provider>
  );
};
```

## Features

- **Modern Design**: Built with shadcn/ui components and Tailwind CSS 4
- **Accessible**: Uses Radix UI primitives for accessibility
- **Customizable**: All components can be customized or replaced
- **Type Safe**: Full TypeScript support

## Components

### Input Fields
- `TextField` - Text input
- `TextArea` - Multi-line text input
- `PasswordField` - Password input
- `CheckBox` - Checkbox input
- `Selector` - Select dropdown
- `SwitchField` - Toggle switch
- `RadioList` - Radio button group
- `FileUpload` - File upload input
- `ProgressBar` - Progress indicator
- `StaticText` - Read-only text display
- `ButtonSelector` - Button group selector

### Utility Components
- `AddRowButton` - Add row button for lists
- `DeleteRowButton` - Delete row button for lists
- `LoadingIndicator` - Loading spinner
- `FormDivider` - Form section divider
- `TabbedSection` - Tabbed interface

### Decorators
- `FieldDecorator` - Field layout and validation
- `FieldsetDecorator` - Fieldset grouping

## Customization

You can customize individual components by importing them directly:

```tsx
import { TextField, Button } from '@mito-forms/shadcn';

// Use components individually
```

Or create a custom registry:

```tsx
import { createShadcnComponentRegistry } from '@mito-forms/shadcn';

const customRegistry = createShadcnComponentRegistry();
// Modify registry as needed
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run Storybook
pnpm storybook
```
