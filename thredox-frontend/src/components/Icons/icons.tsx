import { iSVG } from "@/types";
import { FC, forwardRef } from "react";

const ThemeIcon = ({ size = 25, width, height, children, ...props }: iSVG & { children: React.ReactNode }) => (
    <svg
        className="transition-transform duration-100 ease-in-out hover:scale-110"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        height={height ?? size}
        width={width ?? size}
        {...props}
    >
        <g fill="#078586"> {children} </g>
    </svg>
);

export const MoonFilledIcon = ({ size = 25, ...props }: iSVG) => (
    <ThemeIcon size={size} {...props}>
        <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z" />
    </ThemeIcon>
);

export const SunFilledIcon = ({ size = 25, ...props }: iSVG) => (
    <ThemeIcon size={size} {...props}>
        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </ThemeIcon>
);

// LORD ICONS (ANIMATED ICONS)
export const StartIcon = forwardRef<HTMLElement, { id: string }>((props, ref) => (
    <lord-icon
        id={props.id}
        ref={ref}
        role="img"
        aria-label="Start Icon"
        src="https://cdn.lordicon.com/ekuoyiqn.json"
        trigger="loop-on-hover"
        colors="primary:#078586,secondary:#078586,tertiary:#ebe6ef,quaternary:#078586"
    />
));

export const BrandIcon = forwardRef<HTMLElement, { id: string }>((props, ref) => (
    <lord-icon
        id={props.id}
        ref={ref}
        role="img"
        aria-label="Brand Icon"
        src="https://cdn.lordicon.com/drdlomqk.json"
        trigger="loop-on-hover"
        state="loop-spin"
        colors="primary:#078586,secondary:#023030,tertiary:#ffffff"
    />
));

export const LinkedInIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="LinkedIn Icon"
        src="https://cdn.lordicon.com/fgctxlnd.json"
        trigger="loop-on-hover"
        colors="primary:#078586,secondary:#ebe6ef"
    />
);

export const GithubIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="Github Icon"
        src="https://cdn.lordicon.com/ioihllwu.json"
        trigger="loop-on-hover"
        colors="primary:#ffffff,secondary:#078586"
    />
);

export const UserIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="User Icon"
        src="https://cdn.lordicon.com/hroklero.json"
        trigger="loop-on-hover"
        colors="primary:#078586,secondary:#078586"
    />
);

export const ShowIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="Show Icon"
        src="https://cdn.lordicon.com/japgxnmg.json"
        trigger="loop-on-hover"
        stroke="light"
        colors="primary:#000000,secondary:#ffdc73,tertiary:#000000,quaternary:#000000"
    />
);

export const LoadingIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="Loading Icon"
        src="https://cdn.lordicon.com/ayvhsttz.json"
        trigger="loop"
        stroke="bold"
        state="loop-cycle"
        colors="primary:#078586,secondary:#023030"
    />
);

export const MailIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="Mail Icon"
        src="https://cdn.lordicon.com/dpggoewm.json"
        trigger="hover"
        colors="primary:#023030,secondary:#078586,tertiary:#023030"
    />
);

export const TopIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="Top Icon"
        src="https://cdn.lordicon.com/boyimjcr.json"
        trigger="loop-on-hover"
        colors="primary:#078586"
    />
);

export const OpenIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="Open Icon"
        src="https://cdn.lordicon.com/efmfrlbq.json"
        trigger="loop-on-hover"
        colors="primary:#078586,secondary:#918d10,tertiary:#ffffff"
    />
);

export const IntroIcon: FC = () => (
    <lord-icon
        role="img"
        aria-label="Intro Icon"
        src="https://cdn.lordicon.com/mhnfcfpf.json"
        trigger="in"
        state="in-reveal"
        colors="primary:#fad1e6,secondary:#078586,tertiary:#c7c116,quaternary:#3080e8"
        style={{ width: "350px", height: "350px" }}
    />
);
