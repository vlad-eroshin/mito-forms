/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useRef, useState } from 'react';
import type { EditorMetadata, FieldsLayout, ParamsMap } from '../types';
import { EditorActiveApi, FormEditor, FormEditorProps } from '../FormEditor';
import { IntlProvider } from 'react-intl';

export type FormEditorStoryProps = Omit<FormEditorProps, 'onChange'> & {
  editorMetadataMap?: { [key: string]: EditorMetadata };
  metadataName?: string;
  inputDataMap?: { [key: string]: object };
  activeData?: string;
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
}) => {
  const [editorResult, setEditorResult] = useState<object>(initialData);
  const [fieldsLayout, setFieldsLayout] = useState<FieldsLayout>('compact');

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
  // const handleLayoutChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFieldsLayout(event.target.value as FieldsLayout);
  // }, []);
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
              dataSourceStates={dataSourceStates}
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
