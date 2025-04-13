
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from '../../../types';

interface UserMetadataSectionProps {
  form: UseFormReturn<UserFormData>;
  user?: UserFormData;
}

const UserMetadataSection: React.FC<UserMetadataSectionProps> = ({ form, user }) => {
  if (!user) return null;
  
  return (
    <>
      <FormField
        control={form.control}
        name="created"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Created</FormLabel>
            <FormControl>
              <Input {...field} readOnly />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="updated"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Update</FormLabel>
            <FormControl>
              <Input {...field} readOnly />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default UserMetadataSection;
