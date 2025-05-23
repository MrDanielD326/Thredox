import { AdminCard } from "@/components/Card/AdminCard";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import AppLayout from "@/layouts/AppLayout";

export default function About() {
    const { brandName, creator, description } = siteConfig;

    return (
        <AppLayout>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 px-4 md:px-8">
                <section className="flex flex-col items-center justify-center text-center max-w-lg w-full">
                    <div>
                        <span className={title()}> {brandName} - </span>
                        <span className={title({ color: "primary" })}> {creator} </span>
                        <div className={subtitle({ class: "mt-4" })}> {description} </div>
                    </div>
                </section>
                <div className="w-full md:w-auto flex justify-center"> <AdminCard /> </div>
            </div>
        </AppLayout>
    );
}
