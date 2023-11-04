import { BlackFridayCountdownProd } from "./SearchResultBF.tsx";
import { useEffect } from "preact/hooks";
import { Layout as CardLayout } from "./ProductCardBF.tsx";
import type { Product } from "apps/commerce/types.ts";
import { useCountdown } from "./useCountdown.ts";
import { useSignal } from "@preact/signals";
import ProductCardBF from "$store/islands/ProductCardBF.tsx";
import type { Platform } from "$store/apps/site.ts";

export interface Props {
    countdownProd?: BlackFridayCountdownProd[];
    products?: Product[] | null;
    countdownModalThreshold?: number;
    classNames: string;
    countdown?: string;
    layout?: {
        card?: CardLayout;
        flagTextColor?: string;
        flagColor?: string;
    };
    platform?: Platform;
    offset: number;
}
const CountdownModalBF = (props: Props) => {
    const {
        countdownProd,
        products,
        countdownModalThreshold,
        classNames,
        countdown,
        layout,
        platform,
        offset,
    } = props;

    const prods = useSignal<any>([]);

    console.log("countdownProd: ", countdownProd);
    console.log("product: ", products);
    console.log("countdownModalThreshold: ", countdownModalThreshold);

    if (products && countdownProd && countdownModalThreshold) {
        prods.value = products.filter((el: Product) => {
            if (
                countdownProd.some(
                    (cd) => cd.prodID === el.productID && cd.countdown
                )
            ) {
                return el;
            }
        });
        console.log("test: ", prods.value);
    }

    useEffect(() => {
        setTimeout(() => {
            // condition to shor modal
            if (prods.value.length) {
                document.getElementById("my_modal_7").checked = true;
            }
        }, 2000);
    }, []);

    return (
        <>
            <input
                type="checkbox"
                name="modalBF"
                id="my_modal_7"
                class="modal-toggle !min-h-0"
            />
            <div class="modal">
                <div class="modal-box max-w-[700px]">
                    <h3 class="text-2xl font-bold text-center mb-5">
                        Produtos proximos a expirar!
                    </h3>
                    <div class={classNames}>
                        {prods?.value?.map(
                            (product: any, index: number) =>
                                index < 4 && (
                                    <ProductCardBF
                                        // Changes
                                        flagColor={layout?.flagColor} // Flag background color
                                        flagTextColor={layout?.flagTextColor} // Flag text color
                                        countdown={countdown} //countdown string
                                        countdownProd={countdownProd}
                                        // End of changes
                                        product={product}
                                        preload={index === 0}
                                        index={offset + index}
                                        layout={layout?.card}
                                        platform={platform}
                                    />
                                )
                        )}
                    </div>
                </div>
                <label class="modal-backdrop" for="my_modal_7">
                    Close
                </label>
            </div>
        </>
    );
};

export default CountdownModalBF;
