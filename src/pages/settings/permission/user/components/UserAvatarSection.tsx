
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarSectionProps {
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  onChangePhoto: () => void;
}

const UserAvatarSection: React.FC<UserAvatarSectionProps> = ({
  avatarUrl,
  firstName,
  lastName,
  onChangePhoto
}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <Avatar className="h-32 w-32 border-4 border-gray-100 bg-blue-100 mb-2">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="User avatar" />
        ) : (
          <AvatarFallback className="text-5xl">
            {firstName?.charAt(0) || ''}
            {lastName?.charAt(0) || ''}
          </AvatarFallback>
        )}
      </Avatar>
      <Button 
        type="button" 
        variant="ghost" 
        onClick={onChangePhoto} 
        className="text-xs"
      >
        Change Photo
      </Button>
    </div>
  );
};

export default UserAvatarSection;
