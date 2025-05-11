import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import {
  FormInputFieldProps,
  InputFieldType,
  FieldsLayout,
  FormMetadata,
  ListEditorMetadata,
} from './editorMetadata';

export type LoadingComponentProps = {
  className?: string;
  loadingText?: string;
  size?: 'small' | 'medium' | 'large';
};
export type BlockComponentProps = {
  className?: string;
  children?: ReactElement | ReactElement[];
};

export type FieldsetProps = {
  legend?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: () => void;
  layout?: FieldsLayout;
};

export type UtilityButtonProps = {
  text?: string;
  showIcon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type TabProps = {
  id: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  content: ReactNode;
};

export type TabbedSectionProps = {
  selected: string | number;
  onTab: (tabId: string | number) => void;
  tabs: Omit<TabProps, 'onClick' | 'selected'>[];
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number | string;
};

export interface DecoratorRegistry {
  defaultFieldDecorator: React.FunctionComponent<FormInputFieldProps>;
  defaultFieldsetDecorator: React.FunctionComponent<FieldsetProps>;
  defaultFormDecorator: React.FunctionComponent<FormMetadata>;
  defaultListEditorDecorator: React.FunctionComponent<ListEditorMetadata>;
  [key: string]: React.FunctionComponent;
}

export interface ComponentRegistry {
  inputFields: InputFieldRegistry;
  utilityComponents: UtilityComponentRegistry;
  decorators?: DecoratorRegistry;
}

export type InputFieldLayoutProps = {
  id: string;
  label?: string;
  controlElement: ReactElement;
  infoElement?: ReactElement;
  required?: boolean;
  fieldLayout?: FieldsLayout;
  isValid: boolean;
};

export type UtilityComponentRegistry = {
  loading: FunctionComponent<LoadingComponentProps>;
  block: FunctionComponent<BlockComponentProps>;
  tabbedSection: FunctionComponent<TabbedSectionProps>;
  fieldset: FunctionComponent<FieldsetProps>;
  deleteRowButton: FunctionComponent<UtilityButtonProps>;
  addRowButton: FunctionComponent<UtilityButtonProps>;
  inputFieldLayout: FunctionComponent<InputFieldLayoutProps>;
};

export type InputFieldRegistry = {
  [key in InputFieldType]: React.FunctionComponent<FormInputFieldProps>;
};
