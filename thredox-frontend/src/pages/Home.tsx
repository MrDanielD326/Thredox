import { getGreetingAndDate } from "@/utils/utils";
import AppLayout from "@/layouts/AppLayout";
import { subtitle, title } from "@/components/primitives";
import { Divider } from "@heroui/react";

export default function Home() {
    const { greeting, currentDate } = getGreetingAndDate();
    return (
        <AppLayout>
            <div className="inline-block max-w-lg text-center justify-center">
                <span className={title({ color: "primary", size: "sm" })}> {greeting} </span>
            </div>
            <span className={subtitle()}> {currentDate} </span>
            <br /> <Divider /> <br />
        </AppLayout>
    );
};
