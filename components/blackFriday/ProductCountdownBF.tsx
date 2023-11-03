import { useCountdown } from "./useCountdown.ts";

export interface Props {
    countdown: string;
}

function ProductCountdownBF(props: Props) {
    const { countdown } = props;

    const [days, hours, minutes, seconds] = useCountdown(countdown);

    return (
        <div id="CountdownBF" class="flex gap-5">
            <div>
                <span class="countdown font-mono text-4xl">
                    <span style={`--value:${days};`}></span>
                </span>
                days
            </div>
            <div>
                <span class="countdown font-mono text-4xl">
                    <span style={`--value:${hours};`}></span>
                </span>
                hours
            </div>
            <div>
                <span class="countdown font-mono text-4xl">
                    <span style={`--value:${minutes};`}></span>
                </span>
                min
            </div>
            <div>
                <span class="countdown font-mono text-4xl">
                    <span style={`--value:${seconds};`}></span>
                </span>
                sec
            </div>
        </div>
    );
}

export default ProductCountdownBF;
