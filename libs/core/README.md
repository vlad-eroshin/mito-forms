# @mito-forms/core

**Mito Forms Core** is the lightweight, framework-agnostic core engine for building dynamic, state-managed forms.  
It provides a highly flexible and minimalistic foundation for form state management, input validation, and dynamic
updates — without forcing any specific UI framework or heavy dependencies.

This package powers Mito Forms' modular architecture, allowing it to adapt easily to various UI libraries (e.g., React,
Material UI, Bulma, Bootstrap) while keeping your form logic cleanly separated from your components.

---

## Features

- 🚀 **Lightweight:** Minimal runtime footprint with no external UI dependencies.
- 🔄 **Dynamic Forms:** Supports dynamic field updates, conditional logic, and computed fields.
- 🗋l **Validation Engine:** Built-in support for synchronous and asynchronous validation.
- 🧹 **Composable:** Cleanly separate form state, field definitions, and validation logic.
- 🛠️ **Framework-Agnostic:** Integrates easily with React, Vue, Angular, or any rendering system.

---

## Installation

```bash
npm install @mito-forms/core
# or
pnpm add @mito-forms/core
# or
yarn add @mito-forms/core
```

---

## Core Concepts

- **Form State** — Central store for all fields and their metadata (values, errors, touched status, etc.)
- **Field Definitions** — Define initial values, validators, and dynamic behaviors.
- **Validators** — Built-in rules like `required`, `email`, `minLength`, and ability to add custom ones.
- **Subscriptions** — Listen reactively to form or field-level changes.

---

## Documentation

| Section                            | Link          |
|:-----------------------------------|:--------------|
| Full API Reference                 | (coming soon) |
| Building a Custom UI               | (coming soon) |
| Adapters (React, Bulma, Bootstrap) | (coming soon) |

(Documentation contributions welcome!)

---

## Contributing

We welcome contributions to improve Mito Forms Core!  
If you'd like to help:

1. Fork the repository
2. Create a new branch
3. Submit a pull request

Please ensure your code follows the existing style and passes all tests.

---

## License

MIT License © 2025 [Vladislav Eroshin](https://github.com/vlad-eroshin)
