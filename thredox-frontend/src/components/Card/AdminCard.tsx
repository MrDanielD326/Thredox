import { siteConfig } from "@/config/site";
import { iHover } from "@/types";
import { getGreetingAndDate } from "@/utils/utils";
import { addToast, Card, CardBody, CardFooter, CardHeader, Image, Link as GoTo } from "@heroui/react";
import { useState } from "react";
import { GithubIcon, LinkedInIcon, MailIcon } from "../Icons/icons";
import Photo from "../../assets/Images/Admin.png";

export const AdminCard = () => {
    const { email, links: { github, linkedin } } = siteConfig;
    const [hovered, setHovered] = useState<iHover>(null);
    const { greeting } = getGreetingAndDate();

    const infoText: Record<Exclude<iHover, null>, string> = {
        default: greeting,
        email: "Contact me through Mail!",
        github: "Check out my GitHub!",
        linkedin: "Check out my LinkedIn!"
    };

    const handleHover = (key: iHover) => () => setHovered(key);

    const handleToast = () => {
        navigator.clipboard.writeText(email);
        setHovered("email");
        addToast({ title: "Email Copied Successfully!", color: "secondary" });
    };

    return (
        <Card isFooterBlurred isBlurred>
            <CardHeader className="flex gap-3"> {infoText[hovered ?? "default"]} </CardHeader>
            <CardBody> <Image src={Photo} alt="Image" height={350} radius="sm" /> </CardBody>
            <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-small bottom-3 w-[calc(100%_-_24px)] shadow-small ml-3 z-10">
                <button onClick={handleToast} onMouseEnter={handleHover("email")} onMouseLeave={handleHover(null)}>
                    <MailIcon />
                </button>
                <GoTo isExternal href={github} onMouseEnter={handleHover("github")} onMouseLeave={handleHover(null)}>
                    <GithubIcon />
                </GoTo>
                <GoTo isExternal href={linkedin} onMouseEnter={handleHover("linkedin")} onMouseLeave={handleHover(null)}>
                    <LinkedInIcon />
                </GoTo>
            </CardFooter>
        </Card>
    );
};
