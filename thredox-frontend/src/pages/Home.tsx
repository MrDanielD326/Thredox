import { getGreetingAndDate } from "@/utils/utils";
import AppLayout from "@/layouts/AppLayout";
import { subtitle, title } from "@/components/primitives";

export default function Home() {
    const { greeting, currentDate } = getGreetingAndDate();
    return (
        <AppLayout>
            <div className="inline-block max-w-lg text-center justify-center">
                <span className={title()}> {greeting} </span>
                <span className={title({ color: "primary" })}> Danny </span>
            </div>
            <span className={subtitle()}> {currentDate} </span>
        </AppLayout>
    );
}
