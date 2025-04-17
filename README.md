[![Mito Forms CI](https://github.com/vlad-eroshin/mito-forms/actions/workflows/webpack.yml/badge.svg)](https://github.com/vlad-eroshin/mito-forms/actions/workflows/webpack.yml)

# Mito Forms - Declarative Form Framework

Mito Forms is a powerful React-based framework for building form editors declaratively. Define your form UI in JSON and let Mito Forms handle the state management and data capture. Perfect for complex forms and configuration interfaces.

## Features

- 🎨 **Declarative Form Definition**: Define your forms using JSON configuration
- 🔄 **Dynamic Field Visibility**: Show/hide fields based on user input
- 🗺️ **JSON Path Support**: Easily work with complex nested data structures
- 🎯 **Two-way Data Binding**: Seamlessly read and write to source objects
- 🎭 **UI Framework Agnostic**: Works with any design system (default support for Bulma)
- 🌐 **Internationalization**: Built-in support for multiple languages
- 🧪 **Comprehensive Testing**: Full test coverage with Jest and React Testing Library
- 📚 **Storybook Documentation**: Interactive component documentation

## Installation

```bash
npm install mito-forms
# or
yarn add mito-forms
```

## Quick Start

```typescript
import { FormEditor } from 'mito-forms';

const formConfig = {
  id: 'user-form',
  title: 'User Profile',
  fields: [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true
    }
  ]
};

function App() {
  const handleChange = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormEditor
      editorMetadata={formConfig}
      initialData={{}}
      onChange={handleChange}
    />
  );
}
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/vlad-eroshin/mito-forms.git
cd mito-forms
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run storybook` - Start Storybook
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
src/
├── components/     # React components
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── index.ts       # Main entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Vladislav Eroshin** - [GitHub](https://github.com/vlad-eroshin)

## Acknowledgments

- [Bulma](https://bulma.io/) - CSS framework
- [React](https://reactjs.org/) - JavaScript library
- [Storybook](https://storybook.js.org/) - UI component explorer
