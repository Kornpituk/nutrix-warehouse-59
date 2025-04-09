import React from "react";
import { useCompany } from '@/contexts/CompanyContext';

import catLoading from "@/assets/5b84d93a88cb0-unscreen.gif";
import srpLoaing from "@/assets/loading/output-onlinegiftools.gif"

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loading = ({
  text = "Loading ...",
  size = "md",
  className = "",
}: LoadingProps) => {
  // กำหนดขนาดตาม props
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  const renderText = () => {
    if (!text || text.trim() === "") return null;
    return (
      <p className={`mt-3 font-medium text-gray-600 ${textSizes[size]}`}>
        {text}
      </p>
    );
  };

  const { companyData, isAltTheme, isLoading: isCompanyLoading } = useCompany();

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <div className="text-center">
        {/* <svg
          className={`mx-auto animate-spin text-primary ${sizeClasses[size]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg> */}
        <img
          src={!isAltTheme ? catLoading: srpLoaing}
          alt="ตัวอย่าง GIF"
          className="w-full max-w-md mx-auto"
        />
        {renderText()}
      </div>
    </div>
  );
};

// คอมโพเนนต์สำหรับแสดง Loading เต็มหน้าจอ
export const FullPageLoading = ({
  text = "Loading...",
  size = "md",
}: LoadingProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-75">
      <Loading text={text} size={size} className="h-screen" />
    </div>
  );
};
