
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserFormData } from '../../types';
import UserAvatarSection from './UserAvatarSection';

interface UserEditFormProps {
  user?: UserFormData;
  isNew?: boolean;
  onSubmit: (data: UserFormData) => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ 
  user, 
  isNew = false, 
  onSubmit 
}) => {
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  
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
      isActive: user?.isActive ?? true,
      isAdmin: user?.isAdmin ?? false,
      permissions: user?.permissions || [],
      created: user?.created || new Date().toISOString(),
      updated: user?.updated || new Date().toISOString(),
    }
  });

  const handleChangePhoto = () => {
    setAvatarUrl('/lovable-uploads/f3e076ea-7b13-4bcb-9c03-7cc401abcc74.png');
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <div className="bg-white rounded-lg border p-8">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <UserAvatarSection 
            avatarUrl={avatarUrl}
            firstName={form.watch('firstName')}
            lastName={form.watch('lastName')}
            onChangePhoto={handleChangePhoto}
          />
          
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
  );
};

export default UserEditForm;
