import React, { ReactElement, useCallback, useState } from 'react';
import type {
  FieldSetMetadata,
  FormDividerConfig,
  FormDividerProps,
  InputField,
  InputOption,
  ParamsMap,
} from './types';
import { FormInputField } from './FormInputField';
import { generateReactKey } from './utils';
import { getValidatorFunction } from './validators';
import { useDecorator, useUtilComponent } from './hooks';
import { useFieldsetState } from './hooks/useFieldsetState';

/**
 * Component representing fieldset UI.
 * Fieldset is a container for the group of fields listed in the config. Fieldset can have its own title.
 */
export type FieldSetUIProps = {
  config: FieldSetMetadata;
  inputData?: ParamsMap;
  onChange: (data: ParamsMap, isValid?: boolean) => void;
  onRowDelete?: (() => void) | undefined;
  rowIndex?: number;
  showFieldLabels?: boolean;
};
type FieldValidationStates = { [key: string]: { isValid: boolean; validationErrors: string[] } };

export function FormFieldset<T>({
  config,
  inputData,
  onChange,
  rowIndex = -1,
  onRowDelete,
  showFieldLabels = true,
}: FieldSetUIProps): ReactElement {
  const arrangeFields = config.arrangeFields || 'column';
  const [fieldsValidationState, setFieldValidationState] = useState<FieldValidationStates>({});

  const fieldSetValues = inputData;
  const [collapsed, setCollapsed] = useState<boolean>(!!config.collapsible && !!config.collapsed);

  const { getVisibleFields, populateFieldData, fieldsLayout } = useFieldsetState(config);

  const FormDivider = useUtilComponent<FormDividerProps>('divider');

  const visibleFormFields = getVisibleFields(inputData);
  const showTitle = config.showTitle !== undefined ? config.showTitle : true;

  const { getFieldsetDecorator } = useDecorator();
  const defaultDecoratorName = getFieldsetDecoratorName(arrangeFields);
  const decoratorName = config.fieldSetDecorator || defaultDecoratorName;
  const FieldSetDecorator = getFieldsetDecorator(decoratorName);

  const isFieldSetValid = useCallback(
    (fieldsData: ParamsMap): boolean => {
      const tmpValidationStates: FieldValidationStates = {};
      for (let i = 0; i < visibleFormFields.length; i++) {
        const field = visibleFormFields[i];
        if (field.type === 'divider') {
          continue;
        }
        const value = fieldsData[field.name];
        if (field.required) {
          const validatorFn = getValidatorFunction('required', field);
          const validationRes = validatorFn(value);
          if (validationRes !== true) {
            tmpValidationStates[field.name] = {
              isValid: false,
              validationErrors: validationRes as string[],
            };
            setFieldValidationState(tmpValidationStates);
            return false;
          }
        }
        if (field.validator) {
          const validatorFn = getValidatorFunction(field.validator, field);
          const validationRes = validatorFn(value as string);
          if (validationRes !== true) {
            tmpValidationStates[field.name] = {
              isValid: false,
              validationErrors: validationRes as string[],
            };
            setFieldValidationState(tmpValidationStates);
            return false;
          }
        }
      }
      setFieldValidationState(tmpValidationStates);
      return true;
    },
    [visibleFormFields]
  );

  const handleCollapsExpand = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const handleFieldChange = useCallback(
    (params: ParamsMap) => {
      const newFieldSetData = {
        ...fieldSetValues,
        ...params,
      };
      if (onChange) {
        const fieldSetIsValid = isFieldSetValid(newFieldSetData);
        onChange(newFieldSetData, fieldSetIsValid);
      }
    },
    [fieldSetValues, isFieldSetValid, onChange]
  );

  const renderFields = (fields: (InputField | FormDividerConfig)[]) => {
    return fields.map((field: InputField | FormDividerConfig, fieldIndex) => {
      if (field.type === 'divider') {
        return (
          <FormDivider
            key={generateReactKey('divider', `${fieldIndex}`)}
            config={field as FormDividerConfig}
          />
        );
      }
      const { fieldConfig, componentDataStatus, value } = populateFieldData(field, inputData);
      const validationResult = fieldsValidationState[field.name];
      const isValidField = validationResult ? validationResult.isValid : true;
      return (
        <FormInputField<T>
          key={generateReactKey(config.name, field.type, field.name)}
          value={value}
          label={showFieldLabels ? field.label : undefined}
          options={fieldConfig.options as InputOption[] | string[]}
          config={fieldConfig as InputField}
          onChange={handleFieldChange}
          status={componentDataStatus}
          isValid={isValidField}
          validationErrors={validationResult?.validationErrors || []}
          fieldLayout={fieldsLayout}
        />
      );
    });
  };
  return (
    <FieldSetDecorator
      onCollapse={handleCollapsExpand}
      legend={showTitle ? config.title : undefined}
      collapsible={config.collapsible}
      collapsed={collapsed}
      config={config}
      onRowDelete={onRowDelete}
      rowIndex={rowIndex}
    >
      {renderFields(visibleFormFields)}
    </FieldSetDecorator>
  );
}

function getFieldsetDecoratorName(arrangeFields: string): string {
  switch (arrangeFields) {
    case 'tableRow':
      return 'tableRowFieldset';
    case 'column':
      return 'columnFieldset';
    case 'row':
      return 'rowFieldset';
    default:
      return 'columnFieldset';
  }
}
