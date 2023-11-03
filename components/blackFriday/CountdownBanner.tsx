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
            if (distance.value < 0) {
                clearInterval(x);
            }
        }, 1000);
    }

    return (
        <>
            <h2>
                <span class="text-xl font-medium text-base-100">
                    {`${days.value} d ${hours.value} h ${minutes.value} m ${seconds.value} s`}
                </span>
            </h2>
        </>
    );
}

export default CountdownBanner;
