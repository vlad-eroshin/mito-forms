/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useState } from 'react';
import type { EditorMetadata } from '../../types';
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
  const showStatePreview = true;
  const changeHandler = useCallback((result: object, _isValid?: boolean) => {
    setEditorResult(result);
  }, []);
  return (
    <IntlProvider locale="en" messages={{}}>
      <div className="config-editor-story">
        <div className="story-container">
          <div className="editor-preview" style={{ width: showStatePreview ? '60%' : '100%' }}>
            <FormEditor
              editorMetadata={editorMetadata}
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
