import { hoverOff, hoverOn } from "@/components/Icons/iconLinks";
import { IntroIcon, StartIcon } from "@/components/Icons/icons";
import { subtitle, title } from "@/components/primitives";
import { landingInfo } from "@/config/info";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/react";
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

    const FeatureCard = ({ title, description }: { title: string; description: string }) => (
        <Card shadow="sm" radius="lg" fullWidth={true}>
            <CardHeader className="text-lg font-semibold text-secondary"> {title} </CardHeader>
            <CardBody > {description} </CardBody>
        </Card>
    );

    const landingPageData = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <span className={title({ color: "primary" })}> Secure Email Archives for G-Suite </span>
                <div className={subtitle({ class: "mt-4 mb-4" })}>
                    Seamlessly capture and store incoming G-Suite emails with secure OAuth integration — no passwords needed.
                    <br/> Your email archive, organized and compliant.
                </div>
                <Button
                    color="secondary"
                    radius="full"
                    variant="flat"
                    endContent={<StartIcon id="start-icon" ref={iconRef} />}
                    onPress={handleNavigate}
                    onMouseEnter={() => hoverOn("start-icon")}
                    onMouseLeave={() => hoverOff("start-icon")}
                >
                    Get Started
                </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                {landingInfo.map(({ title, description }, index) => <FeatureCard key={index} title={title} description={description} />)}
            </div>
        </div>
    );

    return <AppLayout> {showIntroIcon ? icon() : landingPageData()} </AppLayout>;
};
