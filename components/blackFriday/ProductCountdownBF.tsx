import { useCountdown } from "./useCountdown.ts";

export interface Props {
    countdown: string;
    countdownDefaultColor?: string;
    countdownLessDay?: string;
    countdownLessHour?: string;
}

function ProductCountdownBF({
    countdown,
    countdownDefaultColor,
    countdownLessDay,
    countdownLessHour,
}: Props) {
    const [days, hours, minutes, seconds] = useCountdown(countdown);

    const colorSelector = (days: number, hours: number) => {
        if (hours <= 0) {
            return countdownLessHour ?? "#FF0000";
        } else if (days <= 0) {
            return countdownLessDay ?? "#FB923C";
        } else {
            return countdownDefaultColor ?? "#000000";
        }
    };

    return (
        <div
            id="CountdownBF"
            class={`flex gap-3 lg:gap-4 text-xs md:text-sm lg:text-base`}
            style={{ color: colorSelector(days, hours) }}
        >
            <div class={`flex flex-col ${hours <= 0 ? "hidden" : ""}`}>
                <span class="countdown font-mono text-xl md:text-2xl lg:text-3xl">
                    <span style={`--value:${days};`}></span>
                </span>
                days
            </div>
            <div class="flex flex-col">
                <span class="countdown font-mono text-xl md:text-2xl lg:text-3xl">
                    <span style={`--value:${hours};`}></span>
                </span>
                hours
            </div>
            <div class="flex flex-col">
                <span class="countdown font-mono text-xl md:text-2xl lg:text-3xl">
                    <span style={`--value:${minutes};`}></span>
                </span>
                min
            </div>
            <div class="flex flex-col">
                <span class="countdown font-mono text-xl md:text-2xl lg:text-3xl">
                    <span style={`--value:${seconds};`}></span>
                </span>
                sec
            </div>
        </div>
    );
}

export default ProductCountdownBF;
