import { SVGProps } from "react";

export type iSVG = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type iIconHover = string | HTMLElement | null;

export type iHover = "default" | "email" | "github" | "linkedin" | null;
