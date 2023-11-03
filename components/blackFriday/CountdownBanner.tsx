import { useSignal } from "@preact/signals";

interface Props {
    initialDate: string;
    timer: boolean;
}

function CountdownBanner({ initialDate, timer }: Props) {
    const days = useSignal(0);
    const hours = useSignal(0);
    const minutes = useSignal(0);
    const seconds = useSignal(0);
    const timerOn = useSignal(timer);
    const end = useSignal(false);

    if (timerOn && initialDate) {
        const distance = useSignal(0);
        const countDownDate = new Date(initialDate).getTime();
        const x = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            distance.value = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            days.value = Math.floor(distance.value / (1000 * 60 * 60 * 24));
            hours.value = Math.floor(
                (distance.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            minutes.value = Math.floor(
                (distance.value % (1000 * 60 * 60)) / (1000 * 60)
            );
            seconds.value = Math.floor((distance.value % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            timerOn.value = !timerOn.value;
            // If the count down is over, write some text
            if (distance.value <= 0) {
                end.value = true;
                clearInterval(x);
            }
        }, 1000);
    }

    if (end.value === true) {
        return <></>;
    }
    return (
        <>
            <div className="grid grid-flow-col gap-5 text-center text-white auto-cols-max ">
                <div className="flex flex-col ">
                    <span className=" font-mono max-sm:text-2xl text-5xl text-orange-500">
                        {`${days.value.toString().padStart(2, "0")}`}
                    </span>
                    days
                </div>
                <div className="flex flex-col">
                    <span className=" font-mono max-sm:text-2xl text-5xl text-orange-500">
                        {`${hours.value.toString().padStart(2, "0")}`}
                    </span>
                    hours
                </div>
                <div className="flex flex-col">
                    <span className=" font-mono max-sm:text-2xl text-5xl text-orange-500">
                        {`${minutes.value.toString().padStart(2, "0")}`}
                    </span>
                    min
                </div>
                <div className="flex flex-col">
                    <span className=" font-mono max-sm:text-2xl text-5xl text-orange-500">
                        {`${seconds.value.toString().padStart(2, "0")}`}
                    </span>
                    sec
                </div>
            </div>
        </>
    );
}

export default CountdownBanner;
