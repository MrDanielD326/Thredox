import moment, { Moment } from "moment";
import { iFormat } from "@/interfaces/interfaces";

export const getGreetingAndDate = (): iFormat => {
    const current: Moment = moment();
    const hour: number = current.hour();
    const greeting: string = `Good ${hour < 6
        ? "night"
        : hour < 12
            ? "morning"
            : hour < 17
                ? "afternoon"
                : hour < 22
                    ? "evening"
                    : "night"
        }!`;
    const currentDate: string = current.format("Do MMMM YYYY, dddd");
    return { greeting, currentDate };
};
