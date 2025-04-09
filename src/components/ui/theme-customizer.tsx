import React from "react";
import { X, Check, Palette } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Switch } from "./switch";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ColorButtonProps {
    color: string;
    selected: boolean;
    onClick: () => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({ color, selected, onClick }) => {
    return (
        <button
            className={cn(
                "w-10 h-10 rounded-md flex items-center justify-center transition-all",
                selected ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
            )}
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            {selected && <Check className="h-4 w-4 text-white stroke-[3]" />}
        </button>
    );
};

interface ThemeOptionProps {
    title: string;
    active: boolean;
    children: React.ReactNode;
    onClick: () => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
    title,
    active,
    children,
    onClick,
}) => {
    return (
        <div className="flex flex-col items-center gap-1">
            <button
                onClick={onClick}
                className={cn(
                    "border rounded-md p-3 w-16 h-16 relative flex items-center justify-center",
                    active ? "border-primary border-2" : "border-border"
                )}
            >
                {children}
            </button>
            <span className="text-xs text-muted-foreground">{title}</span>
        </div>
    );
};

export function ThemeCustomizer() {

    React.useEffect(() => {
        const savedColor = localStorage.getItem("primaryColor");
        if (savedColor) {
            setPrimaryColor(savedColor);
        }
    }, []);

    const [open, setOpen] = React.useState(false);
    const {
        primaryColor, setPrimaryColor,
        mode, setMode,
        skin, setSkin,
        semiDarkMenu, setSemiDarkMenu,
        layout, setLayout,
        content, setContent,
        direction, setDirection
    } = useTheme();

    

    const colorOptions = [
        { value: "#129748", label: "Green" },
        { value: "#6366f1", label: "Indigo" },
        { value: "#0ea5e9", label: "Cyan" },
        { value: "#f59e0b", label: "Amber" },
        { value: "#ef4444", label: "Red" },
        { value: "#06b6d4", label: "Sky" },
        { value: "#9b87f5", label: "Purple" },
    ];

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity z-50"
            >
                <Palette className="h-5 w-5" />
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">Theme Customizer</h3>
                                <p className="text-sm text-muted-foreground">Customize & Preview in Real Time</p>
                            </div>
                            <button onClick={() => setOpen(false)} className="h-8 w-8 rounded-full flex items-center justify-center">
                                <X className="h-4 w-4" />
                            </button>
                        </DialogTitle>
                        <DialogDescription>
                            Adjust the theme settings to match your preferences.
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="theming">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="theming">Theming</TabsTrigger>
                            <TabsTrigger value="layout">Layout</TabsTrigger>
                        </TabsList>
                        <TabsContent value="theming" className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Primary Color</h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {colorOptions.map((color) => (
                                        <ColorButton
                                            key={color.value}
                                            color={color.value}
                                            selected={primaryColor === color.value}
                                            onClick={() => setPrimaryColor(color.value)}
                                        />
                                    ))}
                                    <button
                                        className="w-10 h-10 rounded-md border border-dashed border-gray-400 flex items-center justify-center"
                                        onClick={() => {
                                            const newColor = prompt("Enter HEX color code:", primaryColor);
                                            if (newColor && /^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
                                                setPrimaryColor(newColor);
                                            }
                                        }}
                                    >
                                        <Palette className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Mode</h3>
                                <div className="flex gap-2">
                                    <ThemeOption
                                        title="Light"
                                        active={mode === "light"}
                                        onClick={() => setMode("light")}
                                    >
                                        <div className="h-8 w-8 bg-[#f8fafc] rounded-full border border-slate-200 flex items-center justify-center">
                                            <div className="h-4 w-4 bg-yellow-400 rounded-full" />
                                        </div>
                                    </ThemeOption>

                                    <ThemeOption
                                        title="Dark"
                                        active={mode === "dark"}
                                        onClick={() => setMode("dark")}
                                    >
                                        <div className="h-8 w-8 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center">
                                            <div className="h-4 w-4 bg-slate-400 rounded-full rotate-[220deg]" />
                                        </div>
                                    </ThemeOption>

                                    <ThemeOption
                                        title="System"
                                        active={mode === "system"}
                                        onClick={() => setMode("system")}
                                    >
                                        <div className="h-8 w-8 bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                            <div className="h-4 w-6 rounded-sm bg-slate-100 dark:bg-slate-800" />
                                        </div>
                                    </ThemeOption>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Skin</h3>
                                <div className="flex gap-2">
                                    <ThemeOption
                                        title="Default"
                                        active={skin === "default"}
                                        onClick={() => setSkin("default")}
                                    >
                                        <div className="w-full h-full flex flex-col">
                                            <div className="border-b h-2 bg-slate-100 dark:bg-slate-800"></div>
                                            <div className="flex flex-1">
                                                <div className="w-1/3 bg-slate-200 dark:bg-slate-700"></div>
                                                <div className="w-2/3"></div>
                                            </div>
                                        </div>
                                    </ThemeOption>

                                    <ThemeOption
                                        title="Bordered"
                                        active={skin === "bordered"}
                                        onClick={() => setSkin("bordered")}
                                    >
                                        <div className="w-full h-full flex flex-col border-2 border-slate-200 dark:border-slate-700 rounded-sm">
                                            <div className="border-b border-slate-200 dark:border-slate-700 h-2 bg-slate-100 dark:bg-slate-800"></div>
                                            <div className="flex flex-1">
                                                <div className="w-1/3 border-r border-slate-200 dark:border-slate-700"></div>
                                                <div className="w-2/3"></div>
                                            </div>
                                        </div>
                                    </ThemeOption>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-medium">Semi Dark Menu</h3>
                                    <p className="text-xs text-muted-foreground">Show darker sidebar in light mode</p>
                                </div>
                                <Switch
                                    checked={semiDarkMenu}
                                    onCheckedChange={setSemiDarkMenu}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="layout" className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Layout</h3>
                                <div className="flex gap-2">
                                    <ThemeOption
                                        title="Vertical"
                                        active={layout === "vertical"}
                                        onClick={() => setLayout("vertical")}
                                    >
                                        <div className="w-full h-full flex">
                                            <div className="w-1/3 bg-slate-200 dark:bg-slate-700"></div>
                                            <div className="w-2/3 p-1">
                                                <div className="w-full h-1 mb-1 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                                <div className="w-full h-1 mb-1 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                            </div>
                                        </div>
                                    </ThemeOption>

                                    <ThemeOption
                                        title="Collapsed"
                                        active={layout === "collapsed"}
                                        onClick={() => setLayout("collapsed")}
                                    >
                                        <div className="w-full h-full flex">
                                            <div className="w-1/6 bg-slate-200 dark:bg-slate-700"></div>
                                            <div className="w-5/6 p-1">
                                                <div className="w-full h-1 mb-1 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                                <div className="w-full h-1 mb-1 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                            </div>
                                        </div>
                                    </ThemeOption>

                                    <ThemeOption
                                        title="Horizontal"
                                        active={layout === "horizontal"}
                                        onClick={() => setLayout("horizontal")}
                                    >
                                        <div className="w-full h-full flex flex-col">
                                            <div className="h-1/4 w-full bg-slate-200 dark:bg-slate-700 mb-1"></div>
                                            <div className="flex-1 p-1">
                                                <div className="w-full h-1 mb-1 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                                <div className="w-full h-1 mb-1 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                            </div>
                                        </div>
                                    </ThemeOption>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Content</h3>
                                <div className="flex gap-2">
                                    <ThemeOption
                                        title="Compact"
                                        active={content === "compact"}
                                        onClick={() => setContent("compact")}
                                    >
                                        <div className="w-full h-full p-0.5">
                                            <div className="w-full h-full border border-slate-200 dark:border-slate-700 rounded-sm"></div>
                                        </div>
                                    </ThemeOption>

                                    <ThemeOption
                                        title="Wide"
                                        active={content === "wide"}
                                        onClick={() => setContent("wide")}
                                    >
                                        <div className="w-full h-full p-1">
                                            <div className="w-full h-full border border-slate-200 dark:border-slate-700 rounded-sm"></div>
                                        </div>
                                    </ThemeOption>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Direction</h3>
                                <div className="flex gap-2">
                                    <ThemeOption
                                        title="Left to right"
                                        active={direction === "ltr"}
                                        onClick={() => setDirection("ltr")}
                                    >
                                        <div className="w-full h-full p-1 flex flex-col items-start">
                                            <div className="h-1 w-5/6 rounded-sm bg-slate-200 dark:bg-slate-700 mb-1"></div>
                                            <div className="h-1 w-4/6 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                        </div>
                                    </ThemeOption>

                                    <ThemeOption
                                        title="Right to left"
                                        active={direction === "rtl"}
                                        onClick={() => setDirection("rtl")}
                                    >
                                        <div className="w-full h-full p-1 flex flex-col items-end">
                                            <div className="h-1 w-5/6 rounded-sm bg-slate-200 dark:bg-slate-700 mb-1"></div>
                                            <div className="h-1 w-4/6 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                                        </div>
                                    </ThemeOption>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
}
