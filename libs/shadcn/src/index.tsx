import './globals.css';

// Export the main registry
export { createShadcnComponentRegistry } from './registry';

// Export individual components for customization
export { AddRowButton } from './components/AddRowButton';
export { DeleteRowButton } from './components/DeleteRowButton';
export { LoadingIndicator } from './components/LoadingIndicator';
export { FormDivider } from './components/FormDivider';
export { TabbedSection } from './components/TabbedSection';

// Export input components
export { TextField } from './inputs/TextField';
export { TextArea } from './inputs/TextArea';
export { PasswordField } from './inputs/PasswordField';
export { CheckBox } from './inputs/CheckBox';
export { Selector } from './inputs/Selector';
export { SwitchField } from './inputs/SwitchField';
export { RadioList } from './inputs/RadioList';
export { FileUpload } from './inputs/FileUpload';
export { ProgressBar } from './inputs/ProgressBar';
export { StaticText } from './inputs/StaticText';
export { ButtonSelector } from './inputs/ButtonSelector';

// Export decorators
export { FieldDecorator } from './decorators/FieldDecorator';
export { FieldsetDecorator } from './decorators/FieldsetDecorator';

// Export ListEditor
export { ListEditor } from './components/ListEditor';

// Export UI components for external use
export * from './components/ui/button';
export * from './components/ui/input';
export * from './components/ui/label';
export * from './components/ui/textarea';
export * from './components/ui/checkbox';
export * from './components/ui/select';
export * from './components/ui/progress';
export * from './components/ui/switch';
export * from './components/ui/tabs';
export * from './components/ui/radio-group';

// Export utilities
export { cn } from './lib/utils';
