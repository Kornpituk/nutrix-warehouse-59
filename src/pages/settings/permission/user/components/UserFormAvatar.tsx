
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from '../../types';

interface UserFormAvatarProps {
  form: UseFormReturn<UserFormData>;
}

const UserFormAvatar: React.FC<UserFormAvatarProps> = ({ form }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleChangePhoto = () => {
    // In a real implementation, this would open a file picker
    // For now, just show a placeholder avatar
    setAvatarUrl('/lovable-uploads/f3e076ea-7b13-4bcb-9c03-7cc401abcc74.png');
  };

  return (
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
  );
};

export default UserFormAvatar;
