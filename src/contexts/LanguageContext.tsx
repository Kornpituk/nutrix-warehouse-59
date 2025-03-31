import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'th';

interface Translations {
  [key: string]: {
    en: string;
    th: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  'app.name': {
    en: 'PetFeed WMS',
    th: 'PetFeed WMS'
  },
  'nav.dashboard': {
    en: 'Dashboard',
    th: 'แดชบอร์ด'
  },
  'nav.stock': {
    en: 'Stock Update',
    th: 'อัพเดทสต๊อก'
  },
  'nav.receiving': {
    en: 'Receiving',
    th: 'รับสินค้า'
  },
  'nav.requestForPicking': {
    en: 'Request for Picking',
    th: 'ขอการหยิบสินค้า'
  },
  'nav.packingPTW': {
    en: 'Packing/PTW',
    th: 'บรรจุภัณฑ์/PTW'
  },
  'nav.settings': {
    en: 'Settings',
    th: 'ตั้งค่า'
  },
  'warehouse.current': {
    en: 'Current Warehouse',
    th: 'คลังสินค้าปัจจุบัน'
  },
  'warehouse.select': {
    en: 'Select a warehouse',
    th: 'เลือกคลังสินค้า'
  },
  'action.signOut': {
    en: 'Sign Out',
    th: 'ออกจากระบบ'
  },
  'settings.product': {
    en: 'Product',
    th: 'สินค้า'
  },
  'settings.location': {
    en: 'Location',
    th: 'ตำแหน่ง'
  },
  'settings.department': {
    en: 'Department & Staffs',
    th: 'แผนกและพนักงาน'
  },
  'settings.customer': {
    en: 'Customer',
    th: 'ลูกค้า'
  },
  'settings.vendor': {
    en: 'Vendor',
    th: 'ผู้ขาย'
  },
  'settings.transactionModel': {
    en: 'Transaction Model',
    th: 'โมเดลการทำธุรกรรม'
  },
  'settings.lotModel': {
    en: 'Lot Model',
    th: 'โมเดลล็อต'
  },
  'settings.permission': {
    en: 'Permission',
    th: 'การอนุญาต'
  },
  'common.loading': {
    en: 'Loading...',
    th: 'กำลังโหลด...'
  },
  'common.search': {
    en: 'Search...',
    th: 'ค้นหา...'
  },
  'common.filters': {
    en: 'Filters',
    th: 'ตัวกรอง'
  },
  'common.all': {
    en: 'All',
    th: 'ทั้งหมด'
  },
  'common.reset': {
    en: 'Reset',
    th: 'รีเซ็ต'
  },
  'common.apply': {
    en: 'Apply',
    th: 'นำไปใช้'
  },
  'common.noResults': {
    en: 'No results found.',
    th: 'ไม่พบผลลัพธ์'
  },
  'common.actions': {
    en: 'Actions',
    th: 'การดำเนินการ'
  },
  'common.viewDetails': {
    en: 'View Details',
    th: 'ดูรายละเอียด'
  },
  'common.edit': {
    en: 'Edit',
    th: 'แก้ไข'
  },
  'common.delete': {
    en: 'Delete',
    th: 'ลบ'
  },
  'common.addNew': {
    en: 'Add New',
    th: 'เพิ่มใหม่'
  },
  'common.close': {
    en: 'Close',
    th: 'ปิด'
  },
  'common.save': {
    en: 'Save',
    th: 'บันทึก'
  },
  'common.cancel': {
    en: 'Cancel',
    th: 'ยกเลิก'
  },
  'permission.userPermissions': {
    en: 'User Permissions',
    th: 'สิทธิ์ผู้ใช้'
  },
  'permission.userPermissionsDesc': {
    en: 'Manage user access permissions to different modules',
    th: 'จัดการสิทธิ์การเข้าถึงโมดูลต่างๆ ของผู้ใช้'
  },
  'permission.managePermissions': {
    en: 'Manage user permissions and access control for the system',
    th: 'จัดการสิทธิ์ผู้ใช้และการควบคุมการเข้าถึงระบบ'
  },
  'permission.name': {
    en: 'Name',
    th: 'ชื่อ'
  },
  'permission.email': {
    en: 'Email',
    th: 'อีเมล'
  },
  'permission.position': {
    en: 'Position',
    th: 'ตำแหน่ง'
  },
  'permission.department': {
    en: 'Department',
    th: 'แผนก'
  },
  'permission.permissions': {
    en: 'Permissions',
    th: 'สิทธิ์'
  },
  'permission.status': {
    en: 'Status',
    th: 'สถานะ'
  },
  'permission.active': {
    en: 'Active',
    th: 'ใช้งาน'
  },
  'permission.inactive': {
    en: 'Inactive',
    th: 'ไม่ใช้งาน'
  },
  'permission.activeDesc': {
    en: 'User will be able to log in and access the system',
    th: 'ผู้ใช้จะสามารถเข้าสู่ระบบและเข้าถึงระบบได้'
  },
  'permission.addUser': {
    en: 'Add User',
    th: 'เพิ่มผู้ใช้'
  },
  'permission.addUserDesc': {
    en: 'Add a new user and set their permissions',
    th: 'เพิ่มผู้ใช้ใหม่และกำหนดสิทธิ์ของพวกเขา'
  },
  'permission.editUser': {
    en: 'Edit User',
    th: 'แก้ไขผู้ใช้'
  },
  'permission.editUserDesc': {
    en: 'Edit user information and permissions',
    th: 'แก้ไขข้อมูลผู้ใช้และสิทธิ์'
  },
  'permission.confirmDelete': {
    en: 'Confirm Deletion',
    th: 'ยืนยันการลบ'
  },
  'permission.deleteWarning': {
    en: 'Are you sure you want to delete this user',
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้'
  },
  'permission.userDeleted': {
    en: 'User Deleted',
    th: 'ลบผู้ใช้แล้ว'
  },
  'permission.userDeletedDesc': {
    en: 'The user has been successfully deleted',
    th: 'ผู้ใช้ถูกลบเรียบร้อยแล้ว'
  },
  'permission.userAdded': {
    en: 'User Added',
    th: 'เพิ่มผู้ใช้แล้ว'
  },
  'permission.userAddedDesc': {
    en: 'The user has been successfully added',
    th: 'เพิ่มผู้ใช้เรียบร้อยแล้ว'
  },
  'permission.userUpdated': {
    en: 'User Updated',
    th: 'อัปเดตผู้ใช้แล้ว'
  },
  'permission.userUpdatedDesc': {
    en: 'The user has been successfully updated',
    th: 'อัปเดตผู้ใช้เรียบร้อยแล้ว'
  },
  'permission.selectPosition': {
    en: 'Select a position',
    th: 'เลือกตำแหน่ง'
  },
  'permission.selectDepartment': {
    en: 'Select a department',
    th: 'เลือกแผนก'
  },
  'permission.assignedPermissions': {
    en: 'Assigned Permissions',
    th: 'สิทธิ์ที่ได้รับมอบหมาย'
  },
  'permission.noPermissions': {
    en: 'No permissions assigned yet',
    th: 'ยังไม่ได้กำหนดสิทธิ์'
  },
  'permission.accessDenied': {
    en: 'Access Denied',
    th: 'การเข้าถึงถูกปฏิเสธ'
  },
  'permission.adminOnly': {
    en: 'This section is only accessible to administrators',
    th: 'ส่วนนี้สามารถเข้าถึงได้เฉพาะผู้ดูแลระบบเท่านั้น'
  },
  'permission.contactAdmin': {
    en: 'Please contact your administrator for access',
    th: 'โปรดติดต่อผู้ดูแลระบบของคุณเพื่อขอสิทธิ์การเข้าถึง'
  },
  'validation.nameRequired': {
    en: 'Name is required',
    th: 'จำเป็นต้องระบุชื่อ'
  },
  'validation.emailValid': {
    en: 'Please enter a valid email',
    th: 'กรุณาใส่อีเมลที่ถูกต้อง'
  },
  'validation.positionRequired': {
    en: 'Position is required',
    th: 'จำเป็นต้องระบุตำแหน่ง'
  },
  'validation.departmentRequired': {
    en: 'Department is required',
    th: 'จำเป็นต้องระบุแผนก'
  },
  'validation.required': {
    en: 'This field is required',
    th: 'จำเป็นต้องกรอกข้อมูลนี้'
  },
  'validation.email': {
    en: 'Please enter a valid email address',
    th: 'กรุณาใส่อีเมลที่ถูกต้อง'
  },
  'validation.minLength': {
    en: 'Must be at least 6 characters',
    th: 'ต้องมีอย่างน้อย 6 ตัวอักษร'
  },
  'permission.isAdmin': {
    en: 'Admin Status',
    th: 'สถานะผู้ดูแลระบบ'
  },
  'permission.yes': {
    en: 'Yes',
    th: 'ใช่'
  },
  'permission.no': {
    en: 'No',
    th: 'ไม่'
  },
  'permission.title': {
    en: 'User Permissions',
    th: 'สิทธิ์การใช้งานของผู้ใช้'
  },
  'permission.description': {
    en: 'Manage user access and permissions',
    th: 'จัดการการเข้าถึงและสิทธิ์ของผู้ใช้'
  },
  'permission.userDetails': {
    en: 'User Details',
    th: 'รายละเอียดผู้ใช้'
  },
  'permission.userDetailsDesc': {
    en: 'View detailed information about this user',
    th: 'ดูข้อมูลโดยละเอียดเกี่ยวกับผู้ใช้นี้'
  },
  'permission.deleteUser': {
    en: 'Delete User',
    th: 'ลบผู้ใช้'
  },
  'permission.deleteUserConfirmation': {
    en: 'Are you sure you want to delete this user? This action cannot be undone.',
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้? การกระทำนี้ไม่สามารถยกเลิกได้'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
