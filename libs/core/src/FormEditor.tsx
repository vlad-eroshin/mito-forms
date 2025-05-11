import React, {
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import type {
  ComponentRegistry,
  DataSourceState,
  EditorContextProps,
  EditorMetadata,
  EditorState,
  EditorStateReplacePayload,
  FormChangePayload,
  FormDataState,
  ParamsMap,
} from './types';
import { editorStateReducer } from './FormEditorReducer';
import { FormsContainer } from './FormsContainer';
import { EditorContext } from './EditorContext';
import { buildFormStatesFromData } from './utils';

export interface EditorActiveApi<T = object> {
  setData: (newData: T) => void;
}

/**
 * Generic UI component for form editor UI that allows modification of any object that requires modification of JSON Objects
 * The editor renders UI form based on the editor metadata of type EditorMetadata.
 *
 * Editor metadata describes how to render out the form UI and how to Capture user input and other Editor UI behavior:
 *  - Input forms
 *  - Input fieldsets
 *  - Input fields
 *
 */
export type FormEditorProps<T = object> = {
  /**
   * Editor Metadata - information about Layout, Fieldsets and Fields in the UI
   */
  editorMetadata: EditorMetadata<T>;
  /**
   * Initial Data that is being edited
   */
  initialData: T;
  /**
   * Change hande. Triggered when the user changes some field in the editor.
   *
   * @param result updated data after change
   * @param isValid signifies if all the fields are valid or not without validation errors (may not need this)
   * @returns
   */
  onChange: (result: T, isValid?: boolean, validatorMessage?: string) => void;
  /**
   * Map of data for data sources. These are used when external data is needed for the input fields for example data from the API
   */
  dataSourceStates?: { [key: string]: DataSourceState } | undefined;
  /**
   * If this set to true editor updates will not be immediate but will be triggered after changInterval (default is 1 second) after user inactivity
   * This most useful to not trigger updates on every key stroke of the user for example.
   */
  throttleChange?: boolean | undefined;
  /**
   * Change interval when throttleChange is enabled
   */
  changeInterval?: number | undefined;
  /**
   * Registry of the input field components. By default Core UI components are used but in theory can be swapped with anything else.
   */
  componentRegistry: ComponentRegistry;

  /**
   * Additional Context Params
   */
  contextParams?: ParamsMap;

  editorRef?: Ref<EditorActiveApi<T>>;
};

export function FormEditor<T>({
  editorMetadata,
  initialData,
  onChange,
  dataSourceStates,
  throttleChange,
  changeInterval = 1000,
  componentRegistry,
  contextParams,
  editorRef,
}: FormEditorProps<T>) {
  const { isValid, message: validatorMessage = undefined } = editorMetadata.resultValidator
    ? editorMetadata.resultValidator(initialData)
    : { isValid: true };
  const [editorState, dispatchStateAction] = useReducer(
    editorStateReducer,
    {
      //build initial state from the provided input
      editorResult: initialData as T,
      formStates: {},
      isValid,
      validatorMessage,
    },
    (initialState: EditorState<T>) => ({
      ...initialState,
      formStates: buildFormStatesFromData<T>(editorMetadata, initialData),
    })
  );
  // Change time out is used for throtling changes - to minimize frequency of how often onChange handler is invoked
  //const [changeTimeout, setChangeTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
  const changeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useImperativeHandle(editorRef, () => {
    return {
      setData: (newData: T) => {
        const payload: EditorStateReplacePayload<T> = {
          data: {
            formStates: buildFormStatesFromData<T>(editorMetadata, newData),
            editorResult: newData,
          },
        };
        dispatchStateAction({
          payload: payload,
          type: 'replace',
        });
      },
    };
  });
  // Editor context Data stores data source state and editor state
  const editorContextData: EditorContextProps<T> = useMemo(
    () => ({
      dataSources: dataSourceStates || {},
      componentRegistry,
      editorState,
      editorMetadata,
      contextParams,
      fieldsLayout: editorMetadata.fieldsLayout || 'compact',
    }),
    [dataSourceStates, componentRegistry, editorState, editorMetadata, contextParams]
  );
  const LoadingComponent = componentRegistry.utilityComponents.loading;
  //Handler for certain form change
  const handleFormChange = useCallback(
    (
      freshFormData: FormDataState,
      formName: string,
      fieldSetName: string,
      isFormValid?: boolean
    ) => {
      const hasReducers =
        editorMetadata.reducersMap && Object.keys(editorMetadata.reducersMap).length > 0;
      const changePayload: FormChangePayload<T> = {
        formId: formName,
        fieldSetName,
        data: freshFormData,
        isValid: isFormValid,
        editorMetadata,
        editorReducersMap: hasReducers ? editorMetadata.reducersMap : undefined,
        contextParams: editorContextData.contextParams,
      };
      dispatchStateAction({
        type: 'formChange',
        payload: changePayload,
      });
    },
    [editorMetadata, editorContextData]
  );

  const scheduleOnChange = useCallback(
    (editorResult: T) => {
      console.log('Editor will submit changes in: ', `${changeInterval}Ms`);
      const newTimeout = setTimeout(() => {
        console.log('Editor submitted Changes.');
        changeTimeoutRef.current = undefined;
        onChange(editorResult, true);
      }, changeInterval);

      return newTimeout;
    },
    [changeInterval, onChange]
  );

  useEffect(() => {
    // Captures editor state change and calls onChange handler.
    const isFormValid = !!editorState.isValid;
    const editorResult = editorState.editorResult;
    if (!isValid) {
      onChange(editorResult, isValid, editorState.validatorMessage);
      return;
    }
    if (editorResult === initialData /*|| equal(editorResult, initialData)*/) {
      return;
    }
    if (throttleChange) {
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
      changeTimeoutRef.current = scheduleOnChange(editorResult);
    } else {
      onChange(editorResult, isFormValid, editorState.validatorMessage);
    }
    /**
     * In order for the throttle change to work properly and avoid infinite loop this effect cannot depend on the timeout
     * Need the line below `eslint-disable-next-line react-hooks/exhaustive-deps`
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState, initialData, onChange, scheduleOnChange]);

  return (
    <div className="config-editor">
      <div className="editor-status">
        {changeTimeoutRef.current && (
          <div className="info">
            <LoadingComponent loadingText={'Applying changes...'} />
          </div>
        )}
      </div>
      <EditorContext.Provider value={editorContextData as EditorContextProps}>
        <FormsContainer
          displayAs={editorMetadata.displayAs || 'onePage'}
          activeForm={editorMetadata.activeForm || editorMetadata.forms[0]?.id}
          forms={editorMetadata.forms}
          onFormChange={handleFormChange}
        />
      </EditorContext.Provider>
    </div>
  );
}
