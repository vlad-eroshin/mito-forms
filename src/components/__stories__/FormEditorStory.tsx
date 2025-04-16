/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useState } from 'react';
import type { EditorMetadata, FieldsLayout } from '../../types';
import type { FormEditorProps } from '../FormEditor';
import { FormEditor } from '../FormEditor';
import './FormEditorStory.scss';
import { IntlProvider } from 'react-intl';

export type FormEditorStoryProps = Omit<FormEditorProps, 'onChange'> & {
  editorMetadataMap?: { [key: string]: EditorMetadata };
  metadataName?: string;
  inputDataMap?: { [key: string]: object };
  activeData?: string;
};

export const FormEditorStory: React.FunctionComponent<FormEditorStoryProps> = ({
                                                                                 initialData,
                                                                                 editorMetadata,
                                                                                 dataSourceStates,
                                                                                 inputFieldRegistry,
                                                                                 throttleChange,
                                                                                 changeInterval
                                                                               }) => {
  const [editorResult, setEditorResult] = useState<object>(initialData);
  const [fieldsLayout, setFieldsLayout] = useState<FieldsLayout>('compact');

  const showStatePreview = true;
  const changeHandler = useCallback((result: object, _isValid?: boolean) => {
    setEditorResult(result);
  }, []);
  const handleLayoutChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldsLayout(event.target.value as FieldsLayout);
  }, []);
  return (
    <IntlProvider locale="en" messages={{}}>
      <div className="config-editor-story">
        <div className="story-container">
          <div className="editor-preview" style={{ width: showStatePreview ? '60%' : '100%' }}>
            <FormEditor key={`formEditor-${fieldsLayout}`}
                        editorMetadata={{ ...editorMetadata, fieldsLayout }}
                        initialData={initialData}
                        onChange={changeHandler}
                        throttleChange={throttleChange}
                        changeInterval={changeInterval}
                        dataSourceStates={dataSourceStates}
                        inputFieldRegistry={inputFieldRegistry}
            />
          </div>
          {showStatePreview ? (
            <div className="editor-state-preview">
              <p>Fields Layout</p>
              <div>
                <select value={fieldsLayout || 'compact'} onChange={handleLayoutChange}>
                  <option value={'compact'}>Compact</option>
                  <option value={'twoColumn'}>Two Column</option>
                </select>
              </div>
              <p>Editor Result</p>
              <textarea
                id="editorResult"
                aria-label="Editor Result"
                readOnly={true}
                rows={40}
                value={JSON.stringify(editorResult, null, 2)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </IntlProvider>
  );
};
