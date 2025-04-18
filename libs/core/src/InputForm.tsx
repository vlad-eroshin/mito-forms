import React, { useCallback, useContext, useMemo } from 'react';
import type {
  EditorContextProps,
  FieldSetMetadata,
  FormDataState,
  FormMetadata,
  ListEditorMetadata,
  ParamsMap,
} from './types';
import EditorContext from './EditorContext';
import { FormFieldset } from './FormFieldset';
import { ListEditor } from './ListEditor/ListEditor';
import { evaluateLogicInContext } from './data';
import { generateReactKey } from './utils';

/**
 *  Input form  (think about it one input form)
 */
export type InputFormProps = {
  config: FormMetadata;
  showTitle?: boolean | undefined;
  onChange: (
    formDataState: FormDataState,
    formId: string,
    fieldSetName: string,
    isValid: boolean
  ) => void;
};

export function InputForm<T>({ config, onChange, showTitle }: InputFormProps) {
  const editorContextData = useContext<EditorContextProps>(EditorContext);
  const editorState = editorContextData.editorState;
  const formState: FormDataState = editorState.formStates[config.id];

  const getVisibleSets = useCallback(
    (editorFieldsState: object) => {
      //Filter out only visible fieldsets
      return config.fieldSets.filter(fieldSetEntry => {
        if (fieldSetEntry?.showIf) {
          return evaluateLogicInContext(fieldSetEntry.showIf, {
            ...editorFieldsState,
            $data: formState,
          });
        }
        return true;
      });
    },
    [config.fieldSets, formState]
  );

  const visibleFieldSets = useMemo(
    () => getVisibleSets(editorState.formStates),
    [editorState.formStates, getVisibleSets]
  );

  const handleFieldsetChange = useCallback(
    (freshData: ParamsMap | ParamsMap[], name: string, isFieldsetValid: boolean) => {
      const fieldsetValuesEntry = formState[name];
      const newData: FormDataState = { ...formState };
      newData[name] = {
        data: (fieldsetValuesEntry
          ? Array.isArray(fieldsetValuesEntry.data)
            ? [...(freshData as [])]
            : { ...(fieldsetValuesEntry.data as object), ...freshData }
          : freshData) as ParamsMap,
        isValid: isFieldsetValid,
      };
      onChange(newData, config.id, name, isFormValid(newData, isFieldsetValid));
    },
    [formState, onChange, config.id]
  );

  return (
    <>
      {showTitle ? <h2>{config.title}</h2> : <></>}
      {visibleFieldSets.map((fieldSetEntry, i) => {
        const fieldSetData = formState[fieldSetEntry.name];
        if (fieldSetEntry.type === 'fieldSetList') {
          const listEditorConfig = fieldSetEntry as ListEditorMetadata;
          return (
            <ListEditor
              key={generateReactKey(config.id, fieldSetEntry.name, fieldSetEntry.type as string)}
              rowFieldset={listEditorConfig.rowFieldset}
              data={(fieldSetData.data as ParamsMap) || []}
              canDeleteRows={listEditorConfig.canDeleteOrAddRows}
              onChange={(newData, isValid) =>
                handleFieldsetChange(newData, fieldSetEntry.name, isValid)
              }
            />
          );
        } else
          return (
            <FormFieldset<T>
              key={generateReactKey(config.id, fieldSetEntry.name, fieldSetEntry.type as string)}
              config={fieldSetEntry as FieldSetMetadata}
              inputData={(fieldSetData.data as ParamsMap) || {}}
              onChange={(newfieldSetData, isValid) =>
                handleFieldsetChange(newfieldSetData, fieldSetEntry.name, isValid)
              }
            />
          );
      })}
    </>
  );
}

InputForm.displayName = 'InputForm';

const isFormValid = (newData: FormDataState, valid?: boolean): boolean => {
  let k: keyof typeof newData;
  for (k in newData) {
    valid = typeof newData[k].isValid !== 'undefined' ? (newData[k].isValid as boolean) : valid;
    if (!valid) {
      return false;
    }
  }

  return true;
};
