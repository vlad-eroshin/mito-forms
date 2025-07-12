import React, { useCallback } from 'react';
import type {
  FieldSetMetadata,
  FormDataState,
  FormMetadata,
  ListEditorMetadata,
  ParamsMap,
} from './types';
import { FormFieldset } from './FormFieldset';
import { ListEditor } from './ListEditor';
import { generateReactKey } from './utils';
import { useFormState } from './hooks/useFormState';
import { useEditorMetadata } from './hooks/useEditorMetadata';

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

export function InputForm<T>({
  config,
  onChange,
  showTitle = true,
}: InputFormProps): React.ReactElement {
  const { getFieldsetState, formState, getVisibleFieldSets } = useFormState(config);
  const editorMetadata = useEditorMetadata();
  const visibleFieldSets = getVisibleFieldSets();

  const handleFieldsetChange = useCallback(
    (freshData: ParamsMap | ParamsMap[], name: string, isFieldsetValid: boolean) => {
      const fieldsetValuesEntry = getFieldsetState(name);
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
    [getFieldsetState, formState, onChange, config.id]
  );

  const isShowTitle = editorMetadata.displayAs === 'tabSet' ? false : showTitle && config.title;

  return (
    <>
      {isShowTitle ? <h2>{config.title}</h2> : <></>}
      {visibleFieldSets.map((fieldSetEntry, i) => {
        const fieldSetData = formState ? formState[fieldSetEntry.name] : { data: {} };
        if (fieldSetEntry.type === 'fieldSetList') {
          const listEditorConfig = fieldSetEntry as ListEditorMetadata;
          const id = generateReactKey(config.id, listEditorConfig.name);
          return (
            <fieldset key={id} className={'mf-fieldset'}>
              {listEditorConfig.label && <legend>{listEditorConfig.label}</legend>}
              <ListEditor
                name={fieldSetEntry.name}
                rowFieldset={listEditorConfig.rowFieldset}
                data={(fieldSetData.data as ParamsMap) || []}
                canDeleteRows={listEditorConfig.canDeleteRows}
                onChange={(newData, isValid) =>
                  handleFieldsetChange(newData, fieldSetEntry.name, isValid)
                }
                showHeader={listEditorConfig.showHeader}
                showBorders={listEditorConfig.showBorders}
                canAddRows={listEditorConfig.canAddRows}
              />
            </fieldset>
          );
        } else
          return (
            <FormFieldset<T>
              key={generateReactKey(config.id, fieldSetEntry.name, fieldSetEntry.type as string)}
              config={fieldSetEntry as FieldSetMetadata}
              inputData={(fieldSetData.data as ParamsMap) || {}}
              onChange={(newFieldSetData, isValid) =>
                handleFieldsetChange(newFieldSetData, fieldSetEntry.name, isValid)
              }
            />
          );
      })}
    </>
  );
}

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
