import React, { useCallback, useContext, useEffect, useState } from 'react';
import type {
  DataSourceBinding,
  EditorContextProps,
  EditorState,
  FieldSetMetadata,
  FieldsetProps,
  FormDividerConfig,
  InputField,
  InputOption,
  ParamsMap,
  ParamValue,
} from './types';
import { DataStatus } from './types';
import EditorContext from './EditorContext';
import './FormFieldset.scss';
import { FormDivider } from './FormDivider';
import { FormInputField } from './FormInputField';
import { EditableRow } from './ListEditor/EditableTableRow';
import { accessAndTransformData, evaluateLogicInContext } from './data';
import { generateReactKey, retrieveInputOptions } from './utils';
import { getValidatorFunction } from './validators';
import { useUtilComponent } from './hooks';

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
}: FieldSetUIProps) {
  const arrangeFields = config.arrangeFields || 'column';
  const [fieldsValidationState, setFieldValidationState] = useState<FieldValidationStates>({});

  const editorContextData = useContext<EditorContextProps>(EditorContext) as EditorContextProps<T>;
  const fieldsLayout = config.fieldsLayout || editorContextData.fieldsLayout;
  const dataSourceStates = editorContextData.dataSources;
  const allEditorState = editorContextData.editorState;
  const fieldSetValues = inputData;
  const [visibleFormFields, setVisibleFormFields] = useState<(InputField | FormDividerConfig)[]>(
    []
  );
  const FieldsetCmp = useUtilComponent<FieldsetProps>('fieldset');
  const [collapsed, setCollapsed] = useState<boolean>(!!config.collapsible && !!config.collapsed);
  const getVisibleFormFields = useCallback(
    (editorState: EditorState<T>) => {
      return config.fields.filter(field => {
        if (field.type === 'divider') {
          return true;
        }
        if (field.showIf) {
          return evaluateLogicInContext(field.showIf, {
            ...inputData,
            ...editorState.formStates,
            contextParams: editorContextData.contextParams,
          } as object);
        }
        return true;
      });
    },
    [config.fields, editorContextData.contextParams, inputData]
  );

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
    [visibleFormFields, fieldsValidationState]
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

  useEffect(() => {
    setVisibleFormFields(getVisibleFormFields(editorContextData.editorState));
  }, [inputData, config, allEditorState, getVisibleFormFields, editorContextData.editorState]);

  const renderFields = (fields: (InputField | FormDividerConfig)[]) => {
    return fields.map((field: InputField | FormDividerConfig, fieldIndex) => {
      let componentDataStatus: DataStatus = DataStatus.Loaded;
      if (field.type === 'divider') {
        return (
          <FormDivider
            key={generateReactKey('divider', `${fieldIndex}`)}
            config={field as FormDividerConfig}
          />
        );
      }

      const options = retrieveInputOptions(field, inputData as object);

      const genericInputFieldConfig: ParamsMap = {
        ...field,
      };

      genericInputFieldConfig['options'] = options as ParamValue;

      let value = fieldSetValues ? fieldSetValues[field.name] : null;
      if (field.dataBindings) {
        field.dataBindings.forEach((dataBinding: DataSourceBinding) => {
          const dataSourceState = dataSourceStates[dataBinding.datasourceId];
          if (dataSourceState && dataSourceState.status === DataStatus.Loaded) {
            const propData = accessAndTransformData(
              dataSourceState.data,
              dataBinding.accessor,
              dataBinding.transformers
            );
            if (dataBinding.targetProperty === 'value') {
              value = propData;
            } else if (dataBinding.targetProperty) {
              genericInputFieldConfig[dataBinding.targetProperty] = propData as object;
            }
          } else {
            componentDataStatus = DataStatus.Loading;
          }
        });
      }
      const validationResult = fieldsValidationState[field.name];
      const isValidField = validationResult ? validationResult.isValid : true;
      return (
        <FormInputField<T>
          key={generateReactKey(config.name, field.type, field.name)}
          value={value}
          label={field.label}
          options={genericInputFieldConfig.options as InputOption[] | string[]}
          config={genericInputFieldConfig as InputField}
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
