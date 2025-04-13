
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface UserFormHeaderProps {
  title: string;
  description: string;
}

const UserFormHeader: React.FC<UserFormHeaderProps> = ({
  title,
  description
}) => {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {description}
      </DialogDescription>
    </DialogHeader>
  );
};

export default UserFormHeader;
