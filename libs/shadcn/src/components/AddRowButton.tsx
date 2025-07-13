import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import type { UtilityButtonProps } from '@mito-forms/core';

export const AddRowButton: React.FunctionComponent<UtilityButtonProps> = ({
  text = 'Add Row',
  showIcon = true,
  onClick,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      {showIcon && <Plus className="h-4 w-4" />}
      {text}
    </Button>
  );
};

AddRowButton.displayName = 'AddRowButton';
