import { GithubIcon, LinkedInIcon, TopIcon } from "@/components/Icons/icons";
import { NavigationBar } from "@/components/Navbar/NavigationBar";
import { siteConfig } from "@/config/site";
import { Link } from "@heroui/link";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/react";

export default function AppLayout({ children }: { children: ReactNode }) {
    const location = useLocation();
    const isPath = location.pathname === '/' || location.pathname === '/about';
    const { notice, links: { github, linkedin } } = siteConfig;
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => { setShowScrollTop(window.scrollY > 100) };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) };

    return (
        <div className="relative flex flex-col h-screen">
            <NavigationBar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-4"> {children} </main>
            <footer className="w-full flex items-center justify-center py-3">
                {isPath ? <p className="text-center text-md text-[#078586] font-bold"> {notice} </p> : (
                    <div className="flex gap-2">
                        <Link isExternal href={github}> <GithubIcon /> </Link>
                        <Link isExternal href={linkedin}> <LinkedInIcon /> </Link>
                    </div>
                )}
            </footer>
            {showScrollTop && (
                <Tooltip showArrow color="secondary" placement="top-end" content="Go to top">
                    <Button className="fixed bottom-6 right-6 z-50 opacity-100 transition-opacity duration-300"
                        color="secondary" radius="full" variant="flat" isIconOnly onPress={scrollToTop}
                    >
                        <TopIcon />
                    </Button>
                </Tooltip>
            )}
        </div>
    );
}
