
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from '../../types';

interface UserFormMetadataProps {
  form: UseFormReturn<UserFormData>;
}

const UserFormMetadata: React.FC<UserFormMetadataProps> = ({ form }) => {
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
            <FormMessage />
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
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default UserFormMetadata;
