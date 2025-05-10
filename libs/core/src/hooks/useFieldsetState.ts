import {
  type DataSourceBinding,
  DataStatus,
  EditorContextProps,
  FieldSetMetadata,
  FieldsLayout,
  FormDividerConfig,
  InputField,
  type ParamsMap,
  type ParamValue,
} from '../types';
import { useCallback, useContext, useMemo } from 'react';
import { accessAndTransformData, evaluateLogicInContext } from '../data';
import { EditorContext } from '../EditorContext';
import { buildExpressionContext, retrieveInputOptions } from '../utils';

export function useFieldsetState(config: FieldSetMetadata): {
  getVisibleFields: (fieldsData: ParamsMap) => (InputField | FormDividerConfig)[];
  fieldsLayout: FieldsLayout;
  populateFieldData: (
    fieldConfig: InputField,
    inputData: ParamsMap
  ) => {
    fieldConfig: InputField;
    componentDataStatus: DataStatus;
    value: ParamValue;
  };
} {
  const editorContextData = useContext<EditorContextProps>(EditorContext);
  const editorState = useMemo(() => editorContextData.editorState, [editorContextData.editorState]);

  const fieldsLayout = useMemo(
    () => config.fieldsLayout || editorContextData.fieldsLayout,
    [config, editorContextData.fieldsLayout]
  );

  const dataSourceStates = useMemo(
    () => editorContextData.dataSources,
    [editorContextData.dataSources]
  );

  /**
   * Populates field data by evaluating data binding and retrieving data from them
   */
  const populateFieldData = useCallback(
    (
      field: InputField,
      inputData: ParamsMap
    ): {
      fieldConfig: InputField;
      componentDataStatus: DataStatus;
      value: ParamValue;
    } => {
      const options = retrieveInputOptions(field, inputData as object);

      const genericInputFieldConfig: ParamsMap = {
        ...field,
      };

      genericInputFieldConfig['options'] = options as ParamValue;
      if (typeof field.disabled === 'string') {
        genericInputFieldConfig['disabled'] = evaluateLogicInContext(
          field.disabled,
          buildExpressionContext(
            editorState.formStates,
            editorContextData.contextParams as ParamsMap,
            inputData
          )
        );
      }
      let value = inputData ? inputData[field.name] : null;
      let componentDataStatus: DataStatus = DataStatus.Loaded;
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
      return { fieldConfig: genericInputFieldConfig as InputField, componentDataStatus, value };
    },
    [dataSourceStates, editorContextData.contextParams, editorState.formStates]
  );

  const getVisibleFields = useCallback(
    fieldSetData => {
      return config.fields.filter(field => {
        return field.render
          ? evaluateLogicInContext(
              field.render,
              buildExpressionContext(
                editorState.formStates,
                editorContextData.contextParams as ParamsMap,
                fieldSetData
              )
            )
          : true;
      });
    },
    [config.fields, editorContextData.contextParams, editorState]
  );

  return {
    getVisibleFields,
    fieldsLayout,
    populateFieldData,
  };
}
