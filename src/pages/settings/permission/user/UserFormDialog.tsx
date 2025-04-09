
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Form } from '@/components/ui/form';
import { Module, UserFormData } from '../types';
import { UseFormReturn } from 'react-hook-form';
import { Check } from 'lucide-react';
import UserFormAvatar from './components/UserFormAvatar';
import UserFormBasicInfo from './components/UserFormBasicInfo';
import UserFormCredentials from './components/UserFormCredentials';
import UserFormJobInfo from './components/UserFormJobInfo';
import UserFormMetadata from './components/UserFormMetadata';

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
  modules,
  onSubmit,
  onCancel
}) => {
  const { t } = useLanguage();

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[700px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <UserFormAvatar form={form} />
            
            <div className="grid grid-cols-2 gap-4">
              <UserFormBasicInfo form={form} />
              <UserFormCredentials form={form} />
              <UserFormJobInfo form={form} />
              <UserFormMetadata form={form} />
            </div>
            
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                {t('common.cancel')}
              </Button>
              <Button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Check className="mr-1 h-4 w-4" /> {t('common.save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
