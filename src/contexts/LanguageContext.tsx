
import React, { createContext, useState, useContext, ReactNode } from 'react';

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
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const savedLanguage = localStorage.getItem('language') as LanguageType;
  const [language, setLanguage] = useState<LanguageType>(savedLanguage || 'en');

  // Update language and save to localStorage
  const handleSetLanguage = (newLanguage: LanguageType) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
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
