
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Module, User } from '../types';
import { UseFormReturn } from 'react-hook-form';

type UserFormData = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  position: string;
  department: string;
  role: string;
  isActive: boolean;
  isAdmin: boolean;
  permissions: string[];
  created: string;
  updated: string;
  // Optional fields that exist in UserFormData but not in the form
};
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
            <div className="grid grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.name')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.firstName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.lastName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.email')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.userName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.password')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.role')}</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.position')}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('permission.selectPosition')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Warehouse Staff">Warehouse Staff</SelectItem>
                        <SelectItem value="Picker">Picker</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.department')}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('permission.selectDepartment')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Warehouse">Warehouse</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="created"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.created')}</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('permission.updated')}</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{t('permission.active')}</FormLabel>
                      <FormDescription>
                        {t('permission.activeDesc')}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{t('permission.admin')}</FormLabel>
                      <FormDescription>
                        {t('permission.adminDesc')}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div> */}
            
            {/* <div>
              <h3 className="mb-2 text-sm font-medium">{t('permission.permissions')}</h3>
              <div className="max-h-60 space-y-3 overflow-y-auto rounded-md border p-4">
                {modules.map((module) => (
                  <div key={module.id} className="rounded-md border p-3">
                    <h4 className="mb-2 font-medium">{module.name}</h4>
                    <div className="space-y-2">
                      {module.permissions.map((permission) => (
                        <FormField
                          key={permission.id}
                          control={form.control}
                          name="permissions"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(permission.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, permission.id]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter((value) => value !== permission.id)
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  {permission.name}
                                </FormLabel>
                                <FormDescription className="text-xs">
                                  {permission.description}
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" className="bg-primary">
                {t('common.save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
