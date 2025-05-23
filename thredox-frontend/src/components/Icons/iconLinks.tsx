import { iIconHover } from "@/types";
import { Fragment, useRef } from "react";
import { BrandIcon } from "./icons";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

const hoverIcon = (target: iIconHover, isHovering: boolean) => (
    (typeof target === "string" ? document.getElementById(target) : target)
        ?.dispatchEvent(new MouseEvent(isHovering ? "mouseenter" : "mouseleave"))
);

export const hoverOn = (target: iIconHover) => hoverIcon(target, true);
export const hoverOff = (target: iIconHover) => hoverIcon(target, false);

export const BrandName = () => {
    const iconRef = useRef(null);
    return (
        <Fragment>
            <BrandIcon id="brand-icon" ref={iconRef} />
            <p className="font-bold text-inherit"> {siteConfig.brandName.toUpperCase()} </p>
        </Fragment>
    )
};

export const BrandLink = ({ navs }: { navs: boolean }) => {
    const common = {
        className: "flex justify-start items-center gap-1",
        onMouseEnter: () => hoverOn("brand-icon"),
        onMouseLeave: () => hoverOff("brand-icon")
    };
    return navs ? <div {...common}> <BrandName /> </div> : <Link color="foreground" to="/home" {...common}> <BrandName /> </Link>;
};
