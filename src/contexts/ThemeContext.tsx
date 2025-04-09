import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type ThemeMode = "light" | "dark" | "system";
type ThemeSkin = "default" | "bordered";
type ThemeLayout = "vertical" | "collapsed" | "horizontal";
type ThemeContent = "compact" | "wide";
type ThemeDirection = "ltr" | "rtl";

interface ThemeContextType {
    primaryColor: string;
    mode: ThemeMode;
    skin: ThemeSkin;
    semiDarkMenu: boolean;
    layout: ThemeLayout;
    content: ThemeContent;
    direction: ThemeDirection;
    setPrimaryColor: (color: string) => void;
    setMode: (mode: ThemeMode) => void;
    setSkin: (skin: ThemeSkin) => void;
    setSemiDarkMenu: (enabled: boolean) => void;
    setLayout: (layout: ThemeLayout) => void;
    setContent: (content: ThemeContent) => void;
    setDirection: (direction: ThemeDirection) => void;
}

const defaultTheme: Omit<ThemeContextType,
    "setPrimaryColor" | "setMode" | "setSkin" | "setSemiDarkMenu" | "setLayout" | "setContent" | "setDirection"> = {
    primaryColor: "#6366f1", // Indigo
    mode: "light",
    skin: "default",
    semiDarkMenu: false,
    layout: "vertical",
    content: "compact",
    direction: "ltr",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [primaryColor, setPrimaryColor] = useState(() => {
        const saved = localStorage.getItem('primaryColor');
        return saved || defaultTheme.primaryColor;
    });

    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('themeMode');
        if (saved) {
            return saved as ThemeMode;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }

        return defaultTheme.mode;
    });

    const [skin, setSkin] = useState<ThemeSkin>(() => {
        const saved = localStorage.getItem('themeSkin');
        return saved as ThemeSkin || defaultTheme.skin;
    });

    const [semiDarkMenu, setSemiDarkMenu] = useState(() => {
        const saved = localStorage.getItem('semiDarkMenu');
        return saved ? JSON.parse(saved) : defaultTheme.semiDarkMenu;
    });

    const [layout, setLayout] = useState<ThemeLayout>(() => {
        const saved = localStorage.getItem('themeLayout');
        return saved as ThemeLayout || defaultTheme.layout;
    });

    const [content, setContent] = useState<ThemeContent>(() => {
        const saved = localStorage.getItem('themeContent');
        return saved as ThemeContent || defaultTheme.content;
    });

    const [direction, setDirection] = useState<ThemeDirection>(() => {
        const saved = localStorage.getItem('themeDirection');
        return saved as ThemeDirection || defaultTheme.direction;
    });

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('primaryColor', primaryColor);
        localStorage.setItem('themeMode', mode);
        localStorage.setItem('themeSkin', skin);
        localStorage.setItem('semiDarkMenu', JSON.stringify(semiDarkMenu));
        localStorage.setItem('themeLayout', layout);
        localStorage.setItem('themeContent', content);
        localStorage.setItem('themeDirection', direction);
    }, [primaryColor, mode, skin, semiDarkMenu, layout, content, direction]);

    // Apply theme changes
    useEffect(() => {
        // Apply mode (light/dark)
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else if (mode === "light") {
            document.documentElement.classList.remove("dark");
        } else if (mode === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }

        // Apply primary color by updating CSS variables
        const root = document.documentElement;

        // Convert hex to hsl for CSS variables
        const hexToHSL = (hex: string): { h: number, s: number, l: number } => {
            // Remove the # if present
            hex = hex.replace(/^#/, '');

            // Parse the hex values
            const r = parseInt(hex.substring(0, 2), 16) / 255;
            const g = parseInt(hex.substring(2, 4), 16) / 255;
            const b = parseInt(hex.substring(4, 6), 16) / 255;

            // Find min and max
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            // eslint-disable-next-line prefer-const
            let h = 0, s = 0, l = (max + min) / 2;

            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }

                h *= 60;
            }

            // Convert to degrees, percentage
            return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
        };

        // Apply the primary color
        const hsl = hexToHSL(primaryColor);
        root.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);

        // Apply direction (LTR/RTL)
        document.documentElement.dir = direction === "rtl" ? "rtl" : "ltr";

        // Apply skin (bordered/default)
        if (skin === "bordered") {
            document.body.classList.add("bordered-skin");
        } else {
            document.body.classList.remove("bordered-skin");
        }

        // Apply layout classes
        document.body.classList.remove("layout-vertical", "layout-collapsed", "layout-horizontal");
        document.body.classList.add(`layout-${layout}`);

        // Apply content width
        document.body.classList.remove("content-compact", "content-wide");
        document.body.classList.add(`content-${content}`);

        // Apply semi dark menu if enabled
        if (semiDarkMenu) {
            document.body.classList.add("semi-dark-menu");
            if (mode === "light") {
                document.body.classList.add("semi-dark-enabled");
            } else {
                document.body.classList.remove("semi-dark-enabled");
            }
        } else {
            document.body.classList.remove("semi-dark-menu", "semi-dark-enabled");
        }

        // Show toast on subsequent changes (not on initial load)
        const isInitialRender = document.body.getAttribute('data-theme-initialized') !== 'true';
        if (!isInitialRender) {
            toast.success("Theme updated", {
                description: `Theme settings have been applied.`,
                position: "bottom-right",
            });
        }
        document.body.setAttribute('data-theme-initialized', 'true');
    }, [primaryColor, mode, skin, semiDarkMenu, layout, content, direction]);

    const value = {
        primaryColor,
        mode,
        skin,
        semiDarkMenu,
        layout,
        content,
        direction,
        setPrimaryColor,
        setMode,
        setSkin,
        setSemiDarkMenu,
        setLayout,
        setContent,
        setDirection,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
