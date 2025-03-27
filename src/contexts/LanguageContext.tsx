
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type LanguageType = 'en' | 'th';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

// Translation dictionary
const translations: Record<string, Record<LanguageType, string>> = {
  // Common
  'app.name': {
    en: 'Nutrix WMS',
    th: 'นูทริกซ์ WMS',
  },
  // Navigation
  'nav.dashboard': {
    en: 'Dashboard',
    th: 'แดชบอร์ด',
  },
  'nav.stock': {
    en: 'Stock Update',
    th: 'อัปเดตสต็อก',
  },
  'nav.receiving': {
    en: 'Receiving',
    th: 'การรับสินค้า',
  },
  'nav.requestForPicking': {
    en: 'Request for Picking',
    th: 'คำขอหยิบสินค้า',
  },
  'nav.packingPTW': {
    en: 'Packing/PTW',
    th: 'การบรรจุ/PTW',
  },
  'nav.settings': {
    en: 'Settings',
    th: 'ตั้งค่า',
  },
  // Settings submenu
  'settings.product': {
    en: 'Product',
    th: 'สินค้า',
  },
  'settings.location': {
    en: 'Location',
    th: 'ตำแหน่ง',
  },
  'settings.department': {
    en: 'Department & Staffs',
    th: 'แผนกและพนักงาน',
  },
  'settings.customer': {
    en: 'Customer',
    th: 'ลูกค้า',
  },
  'settings.vendor': {
    en: 'Vendor',
    th: 'ผู้ขาย',
  },
  'settings.transactionModel': {
    en: 'Transaction Running Model',
    th: 'รูปแบบการทำธุรกรรม',
  },
  'settings.lotModel': {
    en: 'LOT Running Model',
    th: 'รูปแบบการจัดการล็อต',
  },
  // Warehouse selector
  'warehouse.current': {
    en: 'Current Warehouse',
    th: 'คลังสินค้าปัจจุบัน',
  },
  'warehouse.select': {
    en: 'Select Warehouse',
    th: 'เลือกคลังสินค้า',
  },
  // Actions
  'action.signOut': {
    en: 'Sign Out',
    th: 'ออกจากระบบ',
  },
  'action.changeLanguage': {
    en: 'Change Language',
    th: 'เปลี่ยนภาษา',
  },
  // User Profile
  'profile.title': {
    en: 'User Profile',
    th: 'โปรไฟล์ผู้ใช้',
  },
  'profile.editProfile': {
    en: 'Edit Profile',
    th: 'แก้ไขโปรไฟล์',
  },
  'profile.preferences': {
    en: 'Preferences',
    th: 'การตั้งค่า',
  },
  'profile.notifications': {
    en: 'Notifications',
    th: 'การแจ้งเตือน',
  },
  // Receiving page
  'receiving.pendingReceipts': {
    en: 'Pending Receipts',
    th: 'การรับที่รอดำเนินการ',
  },
  'receiving.inProgress': {
    en: 'In Progress',
    th: 'กำลังดำเนินการ',
  },
  'receiving.recentReceipts': {
    en: 'Recent Receipts',
    th: 'การรับล่าสุด',
  },
  'receiving.receiptManagement': {
    en: 'Receipts Management',
    th: 'การจัดการใบรับสินค้า',
  },
  'receiving.filter': {
    en: 'Filter',
    th: 'ตัวกรอง',
  },
  'receiving.approveSelected': {
    en: 'Approve Selected',
    th: 'อนุมัติที่เลือก',
  },
  'receiving.viewDetails': {
    en: 'View Details',
    th: 'ดูรายละเอียด',
  },
  'receiving.completed': {
    en: 'Completed',
    th: 'เสร็จสิ้นแล้ว',
  },
  'receiving.waitingForApproval': {
    en: 'Waiting for Approval',
    th: 'รอการอนุมัติ',
  },
  // Request for Picking page
  'picking.allRequests': {
    en: 'All Requests',
    th: 'คำขอทั้งหมด',
  },
  'picking.pending': {
    en: 'Pending',
    th: 'รอดำเนินการ',
  },
  'picking.processing': {
    en: 'Processing',
    th: 'กำลังดำเนินการ',
  },
  'picking.completed': {
    en: 'Completed',
    th: 'เสร็จสิ้นแล้ว',
  },
  'picking.highPriority': {
    en: 'High',
    th: 'ความสำคัญสูง',
  },
  'picking.mediumPriority': {
    en: 'Medium',
    th: 'ความสำคัญปานกลาง',
  },
  'picking.lowPriority': {
    en: 'Low',
    th: 'ความสำคัญต่ำ',
  },
  // Packing/PTW page
  'packing.title': {
    en: 'Packing',
    th: 'การบรรจุ',
  },
  'packing.readyToPack': {
    en: 'Ready to Pack',
    th: 'พร้อมบรรจุ',
  },
  'packing.completedToday': {
    en: 'Completed Today',
    th: 'เสร็จสิ้นวันนี้',
  },
  'ptw.title': {
    en: 'Put-to-Wall (PTW)',
    th: 'การใส่ผนัง (PTW)',
  },
  'ptw.pendingPTW': {
    en: 'Pending PTW',
    th: 'PTW ที่รอดำเนินการ',
  },
  'ptw.activePTW': {
    en: 'Active PTW',
    th: 'PTW ที่ใช้งานอยู่',
  },
  'ptw.completedPTW': {
    en: 'Completed PTW',
    th: 'PTW ที่เสร็จสิ้น',
  },
  // Product Settings
  'product.addProduct': {
    en: 'Add Product',
    th: 'เพิ่มสินค้า',
  },
  'product.totalProducts': {
    en: 'Total Products',
    th: 'สินค้าทั้งหมด',
  },
  'product.categories': {
    en: 'Categories',
    th: 'หมวดหมู่',
  },
  'product.totalStock': {
    en: 'Total Stock',
    th: 'สต็อกทั้งหมด',
  },
  'product.productCatalog': {
    en: 'Product Catalog',
    th: 'แคตตาล็อกสินค้า',
  },
  'product.searchProducts': {
    en: 'Search products...',
    th: 'ค้นหาสินค้า...',
  },
  // Common UI elements
  'ui.search': {
    en: 'Search',
    th: 'ค้นหา',
  },
  'ui.add': {
    en: 'Add',
    th: 'เพิ่ม',
  },
  'ui.edit': {
    en: 'Edit',
    th: 'แก้ไข',
  },
  'ui.delete': {
    en: 'Delete',
    th: 'ลบ',
  },
  'ui.cancel': {
    en: 'Cancel',
    th: 'ยกเลิก',
  },
  'ui.save': {
    en: 'Save',
    th: 'บันทึก',
  },
  'ui.close': {
    en: 'Close',
    th: 'ปิด',
  },
  'ui.update': {
    en: 'Update',
    th: 'อัปเดต',
  },
  'ui.filter': {
    en: 'Filter',
    th: 'ตัวกรอง',
  },
  'ui.actions': {
    en: 'Actions',
    th: 'การดำเนินการ',
  },
  'ui.departments': {
    en: 'Departments',
    th: 'แผนก',
  },
  'ui.department': {
    en: 'Department',
    th: 'แผนก',
  },
  'ui.departmentID': {
    en: 'Department ID',
    th: 'รหัสแผนก',
  },
  'ui.staffID': {
    en: 'Staff ID',
    th: 'รหัสพนักงาน',
  },
  'ui.departmentName': {
    en: 'Department Name',
    th: 'ชื่อแผนก',
  },
  'ui.managerName': {
    en: 'Manager Name',
    th: 'ชื่อผู้จัดการ',
  },
  'ui.status': {
    en: 'Status',
    th: 'สถานะ',
  },
  'ui.totalStaff': {
    en: 'Total Staff',
    th: 'พนักงานทั้งหมด',
  },
  'ui.activeStaff': {
    en: 'Active Staff',
    th: 'พนักงานที่ใช้งานอยู่',
  },
  'ui.staffList': {
    en: 'Staff List',
    th: 'รายชื่อพนักงาน',
  },
  'ui.name': {
    en: 'Name',
    th: 'ชื่อ',
  },
  'ui.manager': {
    en: 'Manager',
    th: 'ผู้จัดการ',
  },
  'ui.staffCount': {
    en: 'Staff Count',
    th: 'จำนวนพนักงาน',
  },
  'ui.position': {
    en: 'Position',
    th: 'ตำแหน่ง',
  },
  'ui.staffName': {
    en: 'Staff Name',
    th: 'ชื่อพนักงาน',
  },
  'ui.addDepartment': {
    en: 'Add Department',
    th: 'เพิ่มแผนก',
  },
  'ui.editDepartment': {
    en: 'Edit Department',
    th: 'แก้ไขแผนก',
  },
  'ui.addStaff': {
    en: 'Add Staff',
    th: 'เพิ่มพนักงาน',
  },
  'ui.editStaff': {
    en: 'Edit Staff',
    th: 'แก้ไขพนักงาน',
  },
  'ui.fillDepartmentDetails': {
    en: 'Fill in the department details',
    th: 'กรอกรายละเอียดแผนก',
  },
  'ui.updateDepartmentDetails': {
    en: 'Update the department details',
    th: 'อัปเดตรายละเอียดแผนก',
  },
  'ui.fillStaffDetails': {
    en: 'Fill in the staff details',
    th: 'กรอกรายละเอียดพนักงาน',
  },
  'ui.updateStaffDetails': {
    en: 'Update the staff details',
    th: 'อัปเดตรายละเอียดพนักงาน',
  },
  'ui.enterDepartmentName': {
    en: 'Enter department name',
    th: 'ป้อนชื่อแผนก',
  },
  'ui.enterManagerName': {
    en: 'Enter manager name',
    th: 'ป้อนชื่อผู้จัดการ',
  },
  'ui.enterStatus': {
    en: 'Enter status',
    th: 'ป้อนสถานะ',
  },
  'ui.enterStaffName': {
    en: 'Enter staff name',
    th: 'ป้อนชื่อพนักงาน',
  },
  'ui.enterDepartment': {
    en: 'Enter department',
    th: 'ป้อนแผนก',
  },
  'ui.enterPosition': {
    en: 'Enter position',
    th: 'ป้อนตำแหน่ง',
  },
  'ui.departmentDetails': {
    en: 'Department Details',
    th: 'รายละเอียดแผนก',
  },
  'ui.staffDetails': {
    en: 'Staff Details',
    th: 'รายละเอียดพนักงาน',
  },
  'ui.departmentStaff': {
    en: 'Department Staff',
    th: 'พนักงานในแผนก',
  },
  'ui.departmentInfo': {
    en: 'Department Information',
    th: 'ข้อมูลแผนก',
  },
  'ui.noStaffInDepartment': {
    en: 'No staff in this department',
    th: 'ไม่มีพนักงานในแผนกนี้',
  },
  'ui.departmentNotFound': {
    en: 'Department not found',
    th: 'ไม่พบแผนก',
  },
  'ui.confirmDelete': {
    en: 'Confirm Delete',
    th: 'ยืนยันการลบ',
  },
  'ui.confirmDeleteDepartment': {
    en: 'Are you sure you want to delete this department? This action cannot be undone.',
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบแผนกนี้? การกระทำนี้ไม่สามารถยกเลิกได้',
  },
  'ui.confirmDeleteStaff': {
    en: 'Are you sure you want to delete this staff member? This action cannot be undone.',
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบพนักงานคนนี้? การกระทำนี้ไม่สามารถยกเลิกได้',
  },
  'ui.error': {
    en: 'Error',
    th: 'ข้อผิดพลาด',
  },
  'ui.success': {
    en: 'Success',
    th: 'สำเร็จ',
  },
  'ui.fillRequiredFields': {
    en: 'Please fill in all required fields',
    th: 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
  },
  'ui.departmentAdded': {
    en: 'Department has been added successfully',
    th: 'เพิ่มแผนกสำเร็จแล้ว',
  },
  'ui.departmentUpdated': {
    en: 'Department has been updated successfully',
    th: 'อัปเดตแผนกสำเร็จแล้ว',
  },
  'ui.departmentDeleted': {
    en: 'Department has been deleted successfully',
    th: 'ลบแผนกสำเร็จแล้ว',
  },
  'ui.staffAdded': {
    en: 'Staff has been added successfully',
    th: 'เพิ่มพนักงานสำเร็จแล้ว',
  },
  'ui.staffUpdated': {
    en: 'Staff has been updated successfully',
    th: 'อัปเดตพนักงานสำเร็จแล้ว',
  },
  'ui.staffDeleted': {
    en: 'Staff has been deleted successfully',
    th: 'ลบพนักงานสำเร็จแล้ว',
  },
  'ui.cannotDeleteDeptWithStaff': {
    en: 'Cannot delete department with staff. Please reassign or delete staff first.',
    th: 'ไม่สามารถลบแผนกที่มีพนักงานได้ โปรดย้ายหรือลบพนักงานก่อน',
  },
  'ui.manageDepartments': {
    en: 'Manage your departments and staff members',
    th: 'จัดการแผนกและพนักงานของคุณ',
  },
  'ui.manageStaff': {
    en: 'Manage your warehouse staff',
    th: 'จัดการพนักงานคลังสินค้าของคุณ',
  },
  'ui.searchDepartments': {
    en: 'Search departments...',
    th: 'ค้นหาแผนก...',
  },
  'ui.searchStaff': {
    en: 'Search staff...',
    th: 'ค้นหาพนักงาน...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<LanguageType>('en');
  
  // Load language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageType;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update language and save to localStorage
  const handleSetLanguage = (newLanguage: LanguageType) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = newLanguage;
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
