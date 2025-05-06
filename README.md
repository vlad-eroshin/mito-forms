[![Mito Forms CI](https://github.com/vlad-eroshin/mito-forms/actions/workflows/devBuild.yml/badge.svg)](https://github.com/vlad-eroshin/mito-forms/actions/workflows/devBuild.yml)

# Mito Forms (WORK IN PROGRESS)

Mito Forms is a lightweight, modular, and extensible form state management library.
It provides a declarative, JSON-driven approach to building forms with dynamic behavior across different UI frameworks.

[Usage Examples Storybook](https://vlad-eroshin.github.io/mito-forms/storybook/bulma)

## What Makes it Different 

- Lightweight by Design: Mito Forms avoids the bloat common in many form libraries. Its minimal core keeps your bundle size small and performance snappy.

- UI-Agnostic Core: Core logic is decoupled from any UI framework, enabling seamless integration with design systems like Material UI, Bulma, Bootstrap, or even custom components.

- Framework-Agnostic State Handling: It does not rely on Redux, Zustand, Recoil. This makes Mito Forms highly portable across different app architectures.

- Composable and Declarative API: Developers can define forms using schema-based configuration while maintaining the flexibility to extend or override behavior as needed.

- Modular Architecture: Core logic, UI adapters, and features like validation or conditional logic are packaged independently—so you only import what you need.

- Ideal for Adaptive UI and AI-Driven Interfaces: Mito Forms is well-suited for adaptive user interfaces, where form fields change dynamically based on context, user input, or AI-generated schemas.

- Adaptable to Custom Form Engines: With no opinionated rendering model, it's a natural fit for use cases like dynamic page builders, low-code platforms, and smart form generation pipelines.

- First-Class TypeScript Support: Built in TypeScript with strong types, it provides full type-safety, auto-completion, and schema validation support in modern code editors.

- Storybook-Friendly: Easily test and preview forms in isolation. Mito Forms works well with Storybook for component-driven development.

- Extensible by Design: Clean plugin architecture allows you to introduce custom field types, advanced validation, conditional logic, or layout behaviors with minimal friction.

- Great for Both Static and Dynamic Forms: Whether you’re building a fixed layout form or generating fields at runtime, Mito Forms handles both use cases gracefully.

## Project Structure

Mito Forms is organized as a modular monorepo:

- `libs/core/` — Core form state management engine (framework-agnostic)
- `libs/bulma/` — Bulma CSS framework implementation (custom fields and components)

More UI framework adapters (e.g., Material-UI, Bootstrap) may be added in the future.

## Key Features

- **Declarative Forms:** Define forms as JSON schemas.
- **Dynamic Field Visibility:** Show or hide fields dynamically based on form state.
- **Custom Components:** Easily integrate with different UI frameworks.
- **Minimal Dependencies:** Focused on keeping the core library lightweight.

## Dynamic Field Logic

Mito Forms uses **JMESPath** expressions to control field visibility and dynamic behavior.

### How it works

- Each field can have an optional `render` or `disabled`.
- The condition must be written inside `!{<path>}` using a **JMESPath** expression.
- At runtime, Mito Forms evaluates the JMESPath expression against the current form state and other contextual objects (
  `_STATE`, `_CONTEXT`, and current fieldset field values).

If the evaluated result is truthy (non-empty array, true value, non-null), the field will be shown or enabled.

### Example

Only show field if `color` selected is `blue`

```json
{
  "name": "favoriteColor",
  ........................
  "render": "!{_STATE.Form1.fieldset2.data.color == `blue`}"
}
```

Disable field if user indicated that he has a car

```json
{
  "name": "makeOfTheCar",
  ........................
  "disable": "!{_STATE.Form1.fieldset2.data.userHasNoCar}"
}
```

### Expression Rules

- Expressions must start and end with `{}`.
- Inside the braces `{}`, you must use **JMESPath** syntax.
- String comparisons must use backticks \` in JMESPath.
- Array filtering and projections are fully supported.

### Resources

- [JMESPath Tutorial](https://jmespath.org/tutorial.html)
- [JMESPath Examples](https://jmespath.org/examples.html)

## Building the Project

To build all Mito Forms packages (core and UI libraries):

```bash
pnpm run build
```

This will:

- Build `libs/core`
- Build `libs/bulma`

### Developing locally

You can start a Storybook server for the Bulma package:

```bash
cd libs/bulma
pnpm run storybook
```

Make sure the core package is built first if you modify it.

## Dependencies

- [jmespath](https://www.npmjs.com/package/jmespath) — Used for evaluating dynamic field visibility conditions and for accessing data in the input objects.

## Future Plans

- Support for additional UI frameworks (Material UI, Bootstrap, etc.)
- Dynamic field validation rules
- More powerful form layout options

---

Built with focus on modularity, lightness, and developer experience.
