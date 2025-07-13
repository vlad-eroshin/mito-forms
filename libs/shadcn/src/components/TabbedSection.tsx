import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import type { TabbedSectionProps } from '@mito-forms/core';

export const TabbedSection: React.FunctionComponent<TabbedSectionProps> = ({
  selected,
  onTab,
  tabs,
}) => {
  return (
    <Tabs
      value={selected.toString()}
      onValueChange={(value) => onTab(value)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            disabled={tab.disabled}
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

TabbedSection.displayName = 'TabbedSection';
