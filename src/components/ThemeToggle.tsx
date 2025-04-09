import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Repeat } from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { isAltTheme, toggleTheme: toggleCompanyTheme } = useCompany();
  const { mode, setMode } = useTheme();

  const toggleCompanyThemeAndColor = () => {
    toggleCompanyTheme();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCompanyThemeAndColor}
        title={`Switch to ${isAltTheme ? "Alternative" : "Nutrix"} theme`}
        className="relative mr-2"
      >
        <Repeat
          size={18}
          // className={isAltTheme ? "text-[#129748]" : "text-primary"}
          className="text-primary"
        />
        <span
          className={`absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary`}
        ></span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      >
        {mode === "dark" ? (
          <Sun size={18} className="text-yellow-300" />
        ) : (
          <Moon size={18} className="text-slate-700" />
        )}
      </Button>
    </>
  );
};
export default ThemeToggle;
