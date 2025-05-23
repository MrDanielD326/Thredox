import { iThemes } from "@/interfaces/interfaces";
import { Tooltip, VisuallyHidden } from "@heroui/react";
import { useSwitch } from "@heroui/switch";
import { useTheme } from "@heroui/use-theme";
import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";
import { MoonFilledIcon, SunFilledIcon } from "../Icons/icons";

export const ThemeSwitch: FC<iThemes> = ({ className, classNames }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        localStorage.getItem("theme") ?? localStorage.setItem("theme", "dark");
    }, []);

    const toggleTheme = useCallback(() => {
        const appTheme = theme === "light" ? "dark" : "light";
        setTheme(appTheme);
        localStorage.setItem("theme", appTheme);
    }, [theme, setTheme]);

    const { Component, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
        isSelected: theme === "light",
        onChange: toggleTheme
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key.toLowerCase() === "~" && toggleTheme();
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleTheme]);

    const infoTool = `Switch to ${isSelected ? "dark" : "light"} mode`

    const appTheme = () => (
        <Tooltip showArrow color="secondary" placement="left" content={infoTool}>
            <Component
                aria-label={infoTool}
                {...getBaseProps({
                    className: clsx(
                        className,
                        classNames?.base,
                        "px-px transition-opacity hover:opacity-80 cursor-pointer"
                    )
                })}
            >
                <VisuallyHidden> <input {...getInputProps()} /> </VisuallyHidden>
                <div
                    {...getWrapperProps({
                        className: clsx(
                            classNames?.wrapper,
                            "w-auto h-auto bg-transparent rounded-lg flex items-center justify-center group-data-[selected=true]:bg-transparent !text-default-500 pt-px px-0 mx-0"
                        )
                    })}
                >
                    {isSelected ? <MoonFilledIcon /> : <SunFilledIcon />}
                </div>
            </Component>
        </Tooltip>
    );

    return isMounted ? appTheme() : <div className="w-6 h-6" />;
};
