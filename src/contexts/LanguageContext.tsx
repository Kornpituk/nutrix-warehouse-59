
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
  'nav.shipment': {
    en: 'Shipment Plan',
    th: 'แผนการจัดส่ง',
  },
  'nav.pickOrders': {
    en: 'Pick Orders',
    th: 'รายการหยิบสินค้า',
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
