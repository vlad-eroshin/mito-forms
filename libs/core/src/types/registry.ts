import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import {
  FieldSetMetadata,
  FieldsLayout,
  FormDividerProps,
  FormInputFieldProps,
  FormMetadata,
  InputFieldType,
  ListInputProps,
} from './editorMetadata';
import { DataStatus } from './dataSource';
import type { ParamsMap } from './common';

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
  children: ReactElement | ReactElement[];
  legend?: string;
  config?: FieldSetMetadata;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: () => void;
  layout?: FieldsLayout;
  showLabels?: boolean;
  rowIndex?: number;
  onRowDelete?: (() => void) | undefined;
  onFieldChange?: (params: ParamsMap) => void; //handleFieldChange
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
  defaultFieldDecorator: React.FunctionComponent<InputFieldLayoutProps>;
  defaultFieldsetDecorator: React.FunctionComponent<FieldsetProps>;
  defaultFormDecorator: React.FunctionComponent<FormMetadata>;
  defaultListEditorDecorator: React.FunctionComponent<ListInputProps>;
  customDecorators: { [key: string]: React.FunctionComponent };
}

export interface ComponentRegistry {
  inputFields: InputFieldRegistry;
  utilityComponents: UtilityComponentRegistry;
  decorators?: DecoratorRegistry;
  getFieldDecorator: (decoratorName: string) => React.FunctionComponent<InputFieldLayoutProps>;
  getFieldsetDecorator: (decoratorName: string) => React.FunctionComponent<FieldsetProps>;
  getFormDecorator: (decoratorName: string) => React.FunctionComponent<FormMetadata>;
  getListEditorDecorator: (decoratorName: string) => React.FunctionComponent<ListInputProps>;
}

export type InputFieldLayoutProps = {
  id: string;
  label?: string;
  controlElement: ReactElement;
  helpText?: string;
  required?: boolean;
  fieldLayout?: FieldsLayout;
  isValid: boolean;
  validationErrors?: string[];
  status?: DataStatus | undefined;
  customProps?: ParamsMap;
};

export type UtilityComponentRegistry = {
  loading: FunctionComponent<LoadingComponentProps>;
  block: FunctionComponent<BlockComponentProps>;
  tabbedSection: FunctionComponent<TabbedSectionProps>;
  deleteRowButton: FunctionComponent<UtilityButtonProps>;
  addRowButton: FunctionComponent<UtilityButtonProps>;
  divider: FunctionComponent<FormDividerProps>;
};

export type InputFieldRegistry = {
  [key in InputFieldType]: React.FunctionComponent<FormInputFieldProps>;
};
