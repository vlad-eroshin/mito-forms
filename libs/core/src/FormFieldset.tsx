import React, { ReactElement, useCallback, useState } from 'react';
import type {
  FieldSetMetadata,
  FieldsetProps,
  FormDividerConfig,
  InputField,
  InputOption,
  ParamsMap,
} from './types';
import { FormDivider } from './FormDivider';
import { FormInputField } from './FormInputField';
import { EditableRow } from './ListEditor/EditableTableRow';
import { generateReactKey } from './utils';
import { getValidatorFunction } from './validators';
import { useUtilComponent } from './hooks';
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
  const FieldsetCmp = useUtilComponent<FieldsetProps>('fieldset');
  const [collapsed, setCollapsed] = useState<boolean>(!!config.collapsible && !!config.collapsed);

  const { getVisibleFields, populateFieldData, fieldsLayout } = useFieldsetState(config);

  const visibleFormFields = getVisibleFields(inputData);

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
          label={field.label}
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
  return arrangeFields !== 'tableRow' ? (
    <FieldsetCmp
      onCollapse={handleCollapsExpand}
      legend={config.title}
      collapsible={config.collapsible}
      collapsed={collapsed}
    >
      {!collapsed &&
        (arrangeFields === 'column' ? (
          <>{renderFields(visibleFormFields)}</>
        ) : (
          <div className={'mf-row-layout'}>{renderFields(visibleFormFields)}</div>
        ))}
    </FieldsetCmp>
  ) : (
    <EditableRow
      rowIndex={rowIndex}
      fields={visibleFormFields.filter(f => f.type !== 'divider') as InputField[]}
      values={fieldSetValues as ParamsMap}
      onChange={handleFieldChange}
      onDelete={onRowDelete}
      showFieldLabels={showFieldLabels}
    />
  );
}

FormFieldset.displayName = 'FieldSetUI';
