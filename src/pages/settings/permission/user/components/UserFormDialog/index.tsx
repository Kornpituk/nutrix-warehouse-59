
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { UseFormReturn } from 'react-hook-form';
import { Module, UserFormData } from '../../../types';
import UserFormHeader from './UserFormHeader';
import UserFormContent from './UserFormContent';
import UserFormFooter from './UserFormFooter';

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  form: UseFormReturn<UserFormData>;
  modules: Module[];
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  form,
  modules, // We'll keep this prop for future use even if not currently used in child components
  onSubmit,
  onCancel
}) => {
  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[700px] bg-white">
        <UserFormHeader title={title} description={description} />
        <UserFormContent form={form} onSubmit={handleFormSubmit} />
        <UserFormFooter onCancel={onCancel} onSubmit={form.handleSubmit(handleFormSubmit)} />
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
