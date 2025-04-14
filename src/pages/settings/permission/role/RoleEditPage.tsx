
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import RoleEditHeader from './components/RoleEditHeader';
import { Role } from './types';

// Mock role data - in a real app, you would fetch this from an API
const getRoleById = (id: string): Role => {
  return {
    id,
    name: id === '1' ? 'Admin' : id === '2' ? 'Manager' : 'User',
    description: id === '1' 
      ? 'System administrator with all permissions' 
      : id === '2' 
      ? 'Can manage users but has limited system access' 
      : 'Regular user with basic permissions',
    usedInPermissions: id === '1' ? 8 : id === '2' ? 5 : 1
  };
};

interface RoleEditPageProps {
  isNew?: boolean;
}

const RoleEditPage: React.FC<RoleEditPageProps> = ({ isNew = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Get role data if we're editing, or use empty defaults if creating a new role
  const defaultRole: Role = isNew ? { 
    id: '', 
    name: '', 
    description: '', 
    usedInPermissions: 0,
    isNew: true
  } : getRoleById(id || '');
  
  const [roleName, setRoleName] = useState(defaultRole.name);
  const [roleDescription, setRoleDescription] = useState(defaultRole.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // เมื่อเปิดหน้าแก้ไข จะดึงข้อมูลบทบาทจาก API
    if (!isNew && id) {
      // ในกรณีจริง ควรดึงข้อมูลจาก API ที่นี่
      console.log("Fetching role data for id:", id);
    }
  }, [isNew, id]);
  
  const handleCancel = () => {
    if (isNew) {
      navigate('/settings/permission/roles');
    } else {
      navigate(`/settings/permission/roles/details/${id}`);
    }
  };
  
  const handleSave = async () => {
    if (!roleName.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "ต้องระบุชื่อบทบาท",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // จำลองการส่งข้อมูลไปยัง API
      console.log('Saving role:', {
        id: isNew ? 'new-id' : id,
        name: roleName,
        description: roleDescription,
      });
      
      // จำลองความล่าช้าของ API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "สำเร็จ",
        description: isNew 
          ? "สร้างบทบาทใหม่เรียบร้อยแล้ว" 
          : "อัปเดตบทบาทเรียบร้อยแล้ว"
      });
      
      navigate('/settings/permission/roles');
    } catch (error) {
      console.error("Error saving role:", error);
      toast({
        title: "ข้อผิดพลาด",
        description: "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองอีกครั้ง",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto">
      <RoleEditHeader isNew={isNew} />
      
      <div className="bg-white rounded-md shadow p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              {t('permission.roleName')} <span className="text-red-500">*</span>
            </label>
            <Input 
              id="name" 
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="ระบุชื่อบทบาท"
              className="w-full"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              {t('permission.roleDescription')}
            </label>
            <Textarea 
              id="description"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="อธิบายวัตถุประสงค์ของบทบาท"
              className="min-h-[100px] resize-none"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'กำลังบันทึก...' : t('common.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleEditPage;
