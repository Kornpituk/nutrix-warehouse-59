
import React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserFormFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const UserFormFooter: React.FC<UserFormFooterProps> = ({
  onCancel,
  onSubmit
}) => {
  const { t } = useLanguage();
  
  return (
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
        onClick={onSubmit}
      >
        <Check className="mr-1 h-4 w-4" /> {t('common.save')}
      </Button>
    </DialogFooter>
  );
};

export default UserFormFooter;
