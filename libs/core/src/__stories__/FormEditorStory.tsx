/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataStatus, EditorMetadata, FieldsLayout, ParamsMap } from '../types';
import { EditorActiveApi, FormEditor, FormEditorProps } from '../FormEditor';
import { IntlProvider } from 'react-intl';
import './FormEditorStory.scss';

export type FormEditorStoryProps = Omit<FormEditorProps, 'onChange'> & {
  editorMetadataMap?: { [key: string]: EditorMetadata };
  metadataName?: string;
  inputDataMap?: { [key: string]: object };
  activeData?: string;
  delayDataSource?: { [key: string]: number };
};

type PreviewResult = {
  fieldsLayout: string;
  resultPreview: string;
};
const STORY_FORM: EditorMetadata<PreviewResult> = {
  reducersMap: {
    preview: {
      mainFieldset: (editorData, newData: ParamsMap) => {
        return {
          ...editorData,
          fieldsLayout: newData['fieldsLayout'],
          resultPreview: newData['result'],
        };
      },
    },
  },
  forms: [
    {
      id: 'preview',
      title: 'Result Preview',
      showTitle: true,
      fieldSets: [
        {
          name: 'mainFieldset',
          fields: [
            {
              type: 'select',
              name: 'fieldsLayout',
              default: 'compact',
              value: '!{fieldsLayout}',
              label: 'Fields Layout',
              options: [
                { label: 'Compact', value: 'compact' },
                { label: 'Two Columns', value: 'twoColumn' },
              ],
            },
            {
              type: 'textbox',
              name: 'resultPreview',
              label: 'Editor result',
              value: '!{resultPreview}',
              customProps: {
                rows: 15,
              },
            },
          ],
        },
      ],
    },
  ],
};

export const FormEditorStory: React.FunctionComponent<FormEditorStoryProps> = ({
  initialData,
  editorMetadata,
  dataSourceStates,
  componentRegistry,
  throttleChange,
  changeInterval,
  delayDataSource = {},
}) => {
  const [editorResult, setEditorResult] = useState<object>(initialData);
  const [fieldsLayout, setFieldsLayout] = useState<FieldsLayout>('compact');
  const dsStates = useRef(dataSourceStates);

  const [dataSources, setDataSources] = useState(dsStates.current);

  const editorRef: React.Ref<EditorActiveApi> = useRef<EditorActiveApi>(null);

  const changeHandler = useCallback(
    (result: object, _isValid?: boolean) => {
      setEditorResult(result);
      editorRef.current.setData({
        fieldsLayout,
        resultPreview: JSON.stringify(result, null, 2),
      });
    },
    [fieldsLayout]
  );

  useEffect(() => {
    Object.keys(delayDataSource).forEach(k => {
      if (dsStates.current[k].status == DataStatus.Loaded) {
        return;
      }
      const dsDelay = delayDataSource[k];
      setTimeout(() => {
        const dsState = dsStates.current[k];
        dsState.status = DataStatus.Loaded;
        setDataSources({ ...dsStates.current });
      }, dsDelay);
    });
  }, [delayDataSource]);

  const handleStoryFormChange = useCallback((result: PreviewResult) => {
    setFieldsLayout(result.fieldsLayout as FieldsLayout);
  }, []);

  return (
    <IntlProvider locale="en" messages={{}}>
      <div className="config-editor-story">
        <div className="story-container">
          <div className="editor-preview box" style={{ width: '60%' }}>
            <FormEditor
              key={`formEditor-${fieldsLayout}`}
              editorMetadata={{ ...editorMetadata, fieldsLayout }}
              initialData={initialData}
              onChange={changeHandler}
              throttleChange={throttleChange}
              changeInterval={changeInterval}
              dataSourceStates={dataSources}
              componentRegistry={componentRegistry}
            />
          </div>

          <div className="editor-state-preview box has-background-white-ter">
            <FormEditor<PreviewResult>
              editorRef={editorRef}
              editorMetadata={STORY_FORM}
              initialData={{
                fieldsLayout,
                resultPreview: JSON.stringify(editorResult, null, 2),
              }}
              onChange={handleStoryFormChange}
              componentRegistry={componentRegistry}
            />
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};
