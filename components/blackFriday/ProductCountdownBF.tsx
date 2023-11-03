import { useCountdown } from "./useCountdown.ts";

export interface Props {
    countdown: string;
}

function ProductCountdownBF(props: Props) {
    const { countdown } = props;

    const [days, hours, minutes, seconds] = useCountdown(countdown);

    return (
        <div
            id="CountdownBF"
            class="flex gap-3 lg:gap-4 text-xs md:text-sm lg:text-base"
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
