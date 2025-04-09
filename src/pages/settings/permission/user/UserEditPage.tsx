
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Check } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User } from '../types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  position: string;
  department: string;
  role: string;
  isActive?: boolean;
  isAdmin?: boolean;
  permissions?: string[];
  created?: string;
  updated?: string;
};

interface UserEditPageProps {
  user?: User;
  onSave: (data: UserFormData) => void;
  isNew?: boolean;
}

const UserEditPage: React.FC<UserEditPageProps> = ({ user, onSave, isNew = false }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  const form = useForm<UserFormData>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      userName: user?.userName || '',
      password: user?.password || '',
      position: user?.position || '',
      department: user?.department || '',
      role: user?.role || '',
      created: user?.created || new Date().toISOString(),
      updated: user?.updated || new Date().toISOString(),
    }
  });

  const handleChangePhoto = () => {
    // In a real implementation, this would open a file picker
    // For now, just show a placeholder avatar
    setAvatarUrl('/lovable-uploads/f3e076ea-7b13-4bcb-9c03-7cc401abcc74.png');
  };

  const handleSubmit = (data: UserFormData) => {
    onSave(data);
  };

  const handleBack = () => {
    navigate('/settings/permission/users');
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={handleBack} className="p-0 h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{isNew ? t('permission.addUser') : t('permission.editUser')}</h1>
            <p className="text-sm text-muted-foreground">
              {isNew ? t('permission.addUserDesc') : t('permission.editUserDesc')}
            </p>
          </div>
        </div>
        <Button 
          onClick={form.handleSubmit(handleSubmit)} 
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Check className="mr-1 h-4 w-4" /> {t('common.save')} Changes
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-32 w-32 border-4 border-gray-100 bg-blue-100 mb-2">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt="User avatar" />
                ) : (
                  <AvatarFallback className="text-5xl">
                    {form.watch('firstName')?.charAt(0) || ''}
                    {form.watch('lastName')?.charAt(0) || ''}
                  </AvatarFallback>
                )}
              </Avatar>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleChangePhoto} 
                className="text-xs"
              >
                Change Photo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
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
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {user && (
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
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserEditPage;
