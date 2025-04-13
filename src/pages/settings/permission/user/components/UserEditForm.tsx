
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { UserFormData } from '../../types';
import UserAvatarSection from './UserAvatarSection';
import UserBasicInfoSection from './form/UserBasicInfoSection';
import UserCredentialsSection from './form/UserCredentialsSection';
import UserRoleSection from './form/UserRoleSection';
import UserDepartmentPositionSection from './form/UserDepartmentPositionSection';
import UserMetadataSection from './form/UserMetadataSection';

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
    setAvatarUrl('/lovable-uploads/53120cd9-fe57-4129-bc06-a3ab8b03325d.png');
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
            <UserBasicInfoSection form={form} />
            
            <UserCredentialsSection form={form} />

            <UserRoleSection form={form} />

            <UserDepartmentPositionSection form={form} />

            {user && (
              <UserMetadataSection form={form} user={user} />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserEditForm;
