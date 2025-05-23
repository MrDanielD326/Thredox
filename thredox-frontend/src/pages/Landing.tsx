import { hoverOff, hoverOn } from "@/components/Icons/iconLinks";
import { IntroIcon, StartIcon } from "@/components/Icons/icons";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@heroui/button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const iconRef = useRef<HTMLElement>(null);
    const [showIntroIcon, setShowIntroIcon] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        setShowIntroIcon(true);
        setTimeout(() => {
            setShowIntroIcon(false);
            navigate('/home');
        }, 1650);
    };

    const icon = () => (<div className="flex items-center justify-center"> <IntroIcon /> </div>);

    const landingPageData = () => (
        <>
            <div className="flex items-center justify-center flex-col">
                <p className="text-center text-lg mb-6">
                    Seamlessly capture and store incoming G-Suite emails with secure OAuth integration—no passwords needed. Automatically archive email content, metadata, and maintain conversation threading in PostgreSQL. Attachments are preserved and organized in Google Drive, ensuring compliance, data integrity, and smooth workflow integration.
                </p>
                <Button
                    color="secondary"
                    radius="full"
                    variant="flat"
                    endContent={<StartIcon id="start-icon" ref={iconRef} />}
                    onPress={handleNavigate}
                    onMouseEnter={() => hoverOn("start-icon")}
                    onMouseLeave={() => hoverOff("start-icon")}
                    className="shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                    Get Started
                </Button>
            </div>
        </>
    );

    return <AppLayout> {showIntroIcon ? icon() : landingPageData()} </AppLayout>;
};
