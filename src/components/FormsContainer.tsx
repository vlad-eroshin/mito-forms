import React, { useCallback, useState } from 'react';
import type { FormDataState, FormMetadata } from '../types';
import { InputForm } from './InputForm';
import { TabbedSection } from './EditorInput/TabbedSection';
import { generateReactKey } from './utils';

/**
 * Component controls how Forms are rendered either as tabs on one page
 */
export type FormListProps = {
  forms: FormMetadata[];
  onFormChange: (
    formData: FormDataState,
    formId: string,
    fieldSetName: string,
    isValid: boolean
  ) => void;
  displayAs?: 'tabSet' | 'onePage' | undefined;
  activeForm: string;
};


export function FormsContainer<T>({
                                    forms,
                                    onFormChange,
                                    displayAs = 'tabSet',
                                    activeForm
                                  }: FormListProps) {
  const [activeTab, setActiveTab] = useState<string>(activeForm);
  const handleSwitchTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);
  if (displayAs === 'tabSet') {
    const tabs = forms.map((formConfig, i) => {
      return {
        id: formConfig.id,
        label: formConfig.title,
        content: (
          <InputForm<T> key={generateReactKey('configForm', formConfig.id)} config={formConfig}
                        onChange={onFormChange} />
        )
      };
    });

    return (
      <TabbedSection selected={activeTab} onTab={handleSwitchTab} tabs={tabs} />
    );
  } else {
    return (
      <>
        {forms.map((formConfig, i) => {
          return (
            <InputForm<T>
              key={generateReactKey('configForm', formConfig.id)}
              showTitle={formConfig.showTitle}
              config={formConfig}
              onChange={onFormChange}
            />
          );
        })}
      </>
    );
  }
}

FormsContainer.displayName = 'FormsContainer';
