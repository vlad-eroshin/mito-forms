import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import type { UtilityButtonProps } from '@mito-forms/core';

export const DeleteRowButton: React.FunctionComponent<UtilityButtonProps> = ({
  text = 'Delete',
  showIcon = true,
  onClick,
}) => {
  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      {showIcon && <Trash2 className="h-4 w-4" />}
      {text}
    </Button>
  );
};

DeleteRowButton.displayName = 'DeleteRowButton';
