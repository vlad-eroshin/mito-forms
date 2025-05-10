import type { TabbedSectionProps } from '@mito-forms/core';
import React from 'react';

export const MockTabsetComponent = ({ selected, onTab, tabs }: TabbedSectionProps) => (
  <div>
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTab(tab.id)}
        disabled={tab.disabled}
        className={selected === tab.id ? 'selected' : ''}
      >
        {tab.label}
      </button>
    ))}
    <div>
      {tabs.map(tab => (
        <div key={tab.id} style={{ display: selected === tab.id ? 'block' : 'none' }}>
          {tab.content}
        </div>
      ))}
    </div>
  </div>
);
