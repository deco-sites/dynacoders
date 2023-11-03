import ProductCardBF from "$store/islands/ProductCardBF.tsx";
import { Layout as CardLayout } from "./ProductCardBF.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";
import { BlackFridayCountdownProd } from "./SearchResultBF.tsx";
export interface Columns {
    mobile?: 1 | 2;
    tablet?: 2 | 3 | 4;
    desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
    products: Product[] | null;
    offset: number;
    layout?: {
        card?: CardLayout;
        columns?: Columns;
        // Changes;
        flagTextColor?: string;
        flagColor?: string;
        // end of changes
    };
    countdown?: string;
    countdownProd?: BlackFridayCountdownProd[];
}

const MOBILE_COLUMNS = {
    1: "grid-cols-1",
    2: "grid-cols-2",
};

const TABLET_COLUMNS = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
};

const DESKTOP_COLUMNS = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
};

function ProductGalleryBF({
    products,
    layout,
    offset,
    countdown,
    countdownProd,
}: Props) {
    const platform = usePlatform();
    const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
    const tablet = TABLET_COLUMNS[layout?.columns?.tablet ?? 3];
    const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

    return (
        <div
            class={`grid ${mobile} ${tablet} gap-2 sm:gap-x-6 sm:gap-y-10 items-center ${desktop} `}
        >
            {products?.map((product, index) => (
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
            ))}
        </div>
    );
}

export default ProductGalleryBF;
