/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useState } from 'react';
import type { EditorMetadata } from '../../types';
import type { FormEditorProps } from '../FormEditor';
import { FormEditor } from '../FormEditor';
import './FormEditorStory.scss';
import { Box, Typography } from '@mui/material';

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
    <div className="config-editor-story">
      <div className="story-container">
        <Box className="editor-preview" width={showStatePreview ? '60%' : '100%'}>
          <FormEditor
            editorMetadata={editorMetadata}
            initialData={initialData}
            onChange={changeHandler}
            throttleChange={throttleChange}
            changeInterval={changeInterval}
            dataSourceStates={dataSourceStates}
            inputFieldRegistry={inputFieldRegistry}
          />
        </Box>
        {showStatePreview ? (
          <Box className="editor-state-preview">
            <Typography>Editor Result</Typography>
            <textarea
              id="editorResult"
              aria-label="Editor Result"
              readOnly={true}
              rows={40}
              value={JSON.stringify(editorResult, null, 2)}
            />
          </Box>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
