import React, { useCallback, useContext, useEffect, useState } from 'react';
import type {
  DataSourceBinding,
  EditorContextProps,
  EditorState,
  FieldSetMetadata,
  FormDividerConfig,
  InputField,
  InputOption,
  ParamsMap,
  ParamValue
} from '../types';
import { DataStatus } from '../types';
import EditorContext from './EditorContext';
import './FieldSetUI.scss';
import { FormDivider } from './FormDivider';
import { FormInputField } from './FormInputField';
import { EditableRow } from './ListEditor/EditableTableRow';
import { accessAndTransformData, evaluateLogicInContext } from './data';
import { retrieveInputOptions } from './utils';
import { getValidatorFunction } from './validators';
import { Button, Stack } from '@mui/material';
import { ExpandMore, UnfoldLess } from '@mui/icons-material';

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
};

export function FieldSetUI<T>({
                                config,
                                inputData,
                                onChange,
                                rowIndex = -1,
                                onRowDelete
                              }: FieldSetUIProps) {
  const arrangeFields = config.arrangeFields || 'column';

  const editorContextData = useContext<EditorContextProps>(EditorContext) as EditorContextProps<T>;
  const dataSourceStates = editorContextData.dataSources;
  const allEditorState = editorContextData.editorState;
  const fieldSetValues = inputData;
  const [visibleFormFields, setVisibleFormFields] = useState<(InputField | FormDividerConfig)[]>(
    []
  );
  const [collapsed, setCollapsed] = useState<boolean>(!!config.collapsible && !!config.collapsed);
  const getVisibleFormFields = useCallback(
    (editorState: EditorState<T>) => {
      return config.fields.filter((field) => {
        if (field.type === 'divider') {
          return true;
        }
        if (field.showIf) {
          return evaluateLogicInContext(field.showIf, {
            ...inputData,
            ...editorState.formStates,
            contextParams: editorContextData.contextParams
          } as object);
        }
        return true;
      });
    },
    [config.fields, editorContextData.contextParams, inputData]
  );

  const isFieldSetValid = useCallback(
    (fieldsData: ParamsMap): boolean => {
      for (let i = 0; i < visibleFormFields.length; i++) {
        const field = visibleFormFields[i];
        if (field.type === 'divider') {
          continue;
        }
        const value = fieldsData[field.name];
        if (field.required && !value) {
          return false;
        }
        if (field.validator) {
          const validatorFn = getValidatorFunction(field.validator, field);
          const validationRes = validatorFn(value as string);
          if (validationRes !== true) {
            return false;
          }
        }
      }
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
        ...params
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
        return <FormDivider key={`field-${fieldIndex}`} config={field as FormDividerConfig} />;
      }

      const options = retrieveInputOptions(field, inputData as object);

      const genericInputFieldConfig: ParamsMap = {
        ...field
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
      return (
        <FormInputField<T>
          key={`field-${field.name}-${rowIndex}-${fieldIndex}`}
          value={value}
          options={genericInputFieldConfig.options as InputOption[] | string[]}
          config={genericInputFieldConfig as InputField}
          onChange={handleFieldChange}
          status={componentDataStatus}
        />
      );
    });
  };
  const renderTitle = (fieldSetConfig: FieldSetMetadata) => {
    const titleMarkup = fieldSetConfig.showTitle ? (
      <h3 className={collapsed ? 'collapsed' : ''}>{fieldSetConfig.title}</h3>
    ) : (
      <></>
    );
    if (fieldSetConfig.collapsible && fieldSetConfig.showTitle) {
      return (
        <div className="title">
          <Button className="collapse-trigger" variant="text" onClick={handleCollapsExpand}>
            {collapsed ? <ExpandMore /> : <UnfoldLess />}
            {/*<Icon icon={collapsed ? 'chevrons-expand' : 'chevrons-collapse'} />*/}
            {titleMarkup}
          </Button>
        </div>
      );
    }
    return titleMarkup;
  };
  return arrangeFields !== 'tableRow' ? (
    <div data-testid={`fieldset-${config.name}`} className="fieldset">
      {renderTitle(config)}
      {!collapsed && (
        arrangeFields === 'column' ? <Stack>
          {renderFields(visibleFormFields)}
        </Stack> : <Stack alignItems={'row'}>{renderFields(visibleFormFields)}</Stack>
        // <FormLayout className="fieldset-content" layout={config.fieldLayout || 'compact'}>
        //   {arrangeFields === 'column' ? (
        //     renderFields(visibleFormFields)
        //   ) : (
        //     <Stack className="fields-row">{renderFields(visibleFormFields)}</Stack>
        //   )}
        // </FormLayout>
      )}
    </div>
  ) : (
    <EditableRow
      rowIndex={rowIndex}
      fields={visibleFormFields.filter((f) => f.type !== 'divider') as InputField[]}
      values={fieldSetValues as ParamsMap}
      onChange={handleFieldChange}
      onDelete={onRowDelete}
    />
  );
}

FieldSetUI.displayName = 'FieldSetUI';
